import { HomePage, PostForm, NotFoundPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PostProvaider } from "./context/postContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="bg-[#222831] min-h-screen flex items-center">
      <div className="px-10 container m-auto">
        <PostProvaider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new" element={<PostForm />} />
            <Route path="/posts/:id" element={<PostForm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </PostProvaider>
      </div>
    </div>
  );
};

export default App;
