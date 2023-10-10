
import { Link } from "react-router-dom";
import { CgProfile } from 'react-icons/cg'

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {

  const formatDate = (date) => {
    // Check if it's already a Date object
    if (date instanceof Date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }

    // If it's a string, attempt to parse it as a Date
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return parsedDate.toLocaleDateString('en-US', options);
    }

    // Return a default value if parsing fails
    return 'Invalid Date';
  };

  return <>
    <div className="flex flex-col bg-white rounded-lg shadow-md p-4 mb-4">
      <Link to={`/home/${_id}`} className="flex-shrink-0">
        <img src={cover} alt="" className="w-[400px] object-cover h-48 rounded-t-lg" />
      </Link>
      <div className="flex flex-col justify-between h-full">
        <div className="my-4">
          <p className="info mt-1 flex gap-6">
            <a className="text-primary font-medium flex items-center">
              <CgProfile className="text-red-400" />&nbsp;{author.username}
            </a>
            <time className="text-accent">{formatDate(createdAt)}</time> {/* Format the date */}
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </span>
          </p>
          <Link to={`/home/${_id}`} className="block">
            <h2 className="text-xl font-medium text-text">{title}</h2>
          </Link>

          {/* <p className="max-w-lg my-4 leading-7">
              {summary.split(" ").slice(0, 6).join(" ")}{" "}
              {summary.split(" ").length > 6 && "....."} 
             </p> */}

        </div>
      </div>
    </div>




  </>;
}