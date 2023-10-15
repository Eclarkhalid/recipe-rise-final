const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user');
const Post = require('./models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require('config')

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'recipe-rise',
  api_key: '887651317989421',
  api_secret: 'jDEuiOVC7eclQ5rmfA8LmEc4zwo'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'recipe-rise', // Optional: specify a folder to store uploads
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'], // Specify the allowed file formats in lowercase
  },
});

const uploadMiddleware = multer({ storage });

const fsPromises = require('fs').promises; // Import fs.promises

const salt = bcrypt.genSaltSync(10);
const secret = config.get('secretKEY');

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173',
};

app.options('*', cors(corsOptions));


app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    res.status(403).json({ message: 'CORS error' });
  } else {
    next(err);
  }
});

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

const dbURI = config.get('mongodbURI');


// Rest of your code...


app.post('/register', async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});


// GET user profile using provided token
app.get('/profile', async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const { token } = req.cookies;

  try {
    const info = jwt.verify(token, secret);
    // Continue processing with 'info'

    // Example: Fetch user data from the database
    const user = await User.findById(info.id);

    // Log successful profile retrieval
    console.log(`Profile accessed for user: ${user.username}`);

    res.json(info);
  } catch (err) {
    console.error('Error:', err);

    // Handle token verification errors and unauthorized access
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Handle other errors
    res.status(500).json({ message: 'An error occurred' });
  }
});


// GET user profile and posts
app.get('/user/profile', async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    try {
      const user = await User.findById(info.id);
      const userPosts = await Post.find({ author: info.id });
      res.json({ user, userPosts });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
});

// PUT user profile update
app.put('/user/profile', async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    try {
      const { actualName } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        info.id,
        { actualName },
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
});

app.put('/user/profile-info', uploadMiddleware.single('profilePicture'), async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    // Verify the token and retrieve user info
    const { token } = req.cookies;
    const info = jwt.verify(token, secret); // Verify without options

    const { description } = req.body;

    // Handle file upload for profile picture
    let newProfilePicturePath = null;
    if (req.file) {
      const { path, originalname } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newProfilePicturePath = path + '.' + ext;
      await fsPromises.rename(path, newProfilePicturePath); // Use fs.promises.rename
    }

    // Update user profile information
    const updatedUser = await User.findByIdAndUpdate(
      info.id,
      { profilePicture: newProfilePicturePath, description },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('An error occurred.');
  }
});


app.post('/logout', (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    // Verify the token and retrieve user info
    const { token } = req.cookies;
    const info = jwt.verify(token, secret); // Verify without options
    const { title, summary, content } = req.body;

    // Set the target file size to 2.5MB (adjust as needed)
    const targetFileSizeBytes = 2.5 * 1024 * 1024; // 2.5MB in bytes

    // Upload the image to Cloudinary with automatic compression and a file size target
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      quality: 'auto:best', // Automatic compression
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' }, // Adjust dimensions as needed
        { q: `auto:good`, f: 'auto', flags: 'progressive', } // Compress and optimize
      ],
    });

    // Check if the uploaded image exceeds the target file size
    if (cloudinaryResponse.bytes > targetFileSizeBytes) {
      // Handle the case where the image size is still too large
      // You can adjust transformation parameters to further reduce size
      // Or display an error message and prevent the upload
      console.log('Image size is still too large.');
      return res.status(400).json('Image size is too large.');
    }

    // Create the post with the Cloudinary image URL
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: cloudinaryResponse.secure_url,
      author: info.id,
    });

    res.json(postDoc);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('An error occurred.');
  }
});


app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    // Verify the token and retrieve user info
    const { token } = req.cookies;
    const info = jwt.verify(token, secret); // Verify without options
    const { id, title, summary, content } = req.body;

    // Find the post document and check if the user is the author
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(400).json('You are not the author.');
    }

    // Check if a new image is uploaded
    if (req.file) {
      // If a new image is uploaded, delete the old image from Cloudinary
      if (postDoc.cover) {
        // Extract the public_id from the Cloudinary URL
        const publicId = postDoc.cover.split('/').pop().split('.')[0];

        // Use the Cloudinary API to delete the old image by public_id
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);

      // Update the post with the new image URL
      postDoc.cover = cloudinaryResponse.secure_url;
    }

    // Update the post with new data (including the image URL if it's changed)
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        content,
        cover: postDoc.cover, // Use the updated or existing cover URL
      },
      { new: true } // To get the updated document after the update
    );

    res.json(updatedPost);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('An error occurred.');
  }
});


app.delete('/post/:id', async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post has a cover image
    if (deletedPost.cover) {
      // Extract the public_id from the Cloudinary URL
      const publicId = deletedPost.cover.split('/').pop().split('.')[0];

      // Use the Cloudinary API to delete the image by public_id
      await cloudinary.uploader.destroy(publicId);
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


app.get('/post/times/:id', async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});



app.get('/post', async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

