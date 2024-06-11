import { Link } from "react-router-dom";

export default function Failure() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-red-100 text-red-700">
      <h1 className="text-4xl mb-4">Payment Failed</h1>
      <p className="text-xl mb-4">
        Unfortunately, your payment could not be processed. Please try again
        later.
      </p>
      <Link to="/" className="text-xl text-red-700 underline">
        Go to Home Page
      </Link>
    </div>
  );
}
