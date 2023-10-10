import { useState } from "react";

export default function DeletePostModal({ postId }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    // Implement your delete logic here
    console.log("Delete post with ID:", postId);

    // Close the modal after successful deletion
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-red-200 px-4 py-2 rounded-lg hover:bg-red-400 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* ... SVG path ... */}
        </svg>
        Delete
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <h1 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this post?
            </h1>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Yes, delete post
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                No, go back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
