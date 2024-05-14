import { useNavigate, useRouteError } from "react-router-dom";
import { ImSad } from "react-icons/im";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="h-screen flex items-center justify-center bg-amber-100">
      <Helmet>
        <title>Error || Nourish4All</title>
      </Helmet>
      <div className="text-center flex items-center flex-col">
        <div className="text-stone-600">
          <ImSad size={80}></ImSad>
        </div>
        <div className="text-4xl font-bold text-red-600 mb-6 mt-2">Opp...</div>
        <h1 className=" mb-4 text-6xl text-gray-500 font-semibold">
          {error.status}
        </h1>
        <h2 className="text-4xl text-gray-500 ">
          {error.statusText || error.message}
        </h2>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 font-semibold underline hover:scale-105"
          >
            Go Back
          </button>
          or
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 font-semibold underline hover:scale-105"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
