import { Link } from "react-router-dom";
import { CgProfile } from 'react-icons/cg'

export default function RelatedPost({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-4 mb-4">
      <Link to={`/home/${_id}?reload=true`} className="flex-shrink-0">
        <img src={cover} alt="" className="w-[300px] object-cover h-48 rounded-t-lg" />
      </Link>
      <div className="flex flex-col justify-between h-full">
        <div className="mt-4">
          <Link to={`/home/${_id}?reload=true`} className="block">
            <h2 className="text-xl text-blue-700 font-bold">{title}</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}