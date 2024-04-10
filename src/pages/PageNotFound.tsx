import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  console.log("PageNotFound Page")
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">😞 404</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-sm text-gray-500">
          Return to{" "}
          <a
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:underline"
          >
            home
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
