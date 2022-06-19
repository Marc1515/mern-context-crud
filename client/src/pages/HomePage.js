import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";

export const HomePage = () => {
  const { posts } = usePosts();

  const renderMain = () => {
    if (posts.length === 0)
      return (
        <div className="text-[#EEEEEE] flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-48 h-48" />
          <h1 className="text-2xl">There are no posts</h1>
        </div>
      );

    return (
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 desktop:gap-2">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#222831]">
      <header className="flex justify-between py-4">
        <h1 className="text-white font-bold">Posts ({posts.length})</h1>
        <Link
          to="/new"
          className="px-3 py-2 rounded-md bg-[#00ADB5] hover:bg-indigo-600 text-white"
        >
          Create New Post
        </Link>
      </header>

      {renderMain()}
    </div>
  );
};
