import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";

export function PostCard({ post }) {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">Do you want to delete?</p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={() => {
                deletePost(id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div
      className="bg-[#393E46] text-[#EEEEEE] rounded-sm shadow-md shadow-black hover: hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3 className="text-[#EEEEEE]">{post.title}</h3>
          <button
            className="border border-[#00ADB5] bg-[#393E46] text-[#EEEEEE] hover:bg-red-500 text-sm px-2 py-1 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id);
            }}
          >
            Delete
          </button>
        </div>
        <p className="text-[#EEEEEE]">{post.description}</p>
      </div>
      {post.image && (
        <img
          src={post.image.url}
          className="object-cover h-50 tablet:h-96 desktop:h-96 w-full"
        />
      )}
    </div>
  );
}
