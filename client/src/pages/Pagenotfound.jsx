import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Img404 from "../assets/images/undraw_page_not_found_re_e9o6 (1).svg";

function PageNotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    const userId = Cookies.get("userId");
    if (!userId) {
      navigate("/login");
    } else {
      window.history.back();
    }
  };

  return (
    <>
      <main className="grid min-h-full place-items-center px-6 ">
        <div className="text-center">
          <img src={Img404} alt="not found" className="h-[50vh]" />
          {/* <p className="text-base font-semibold text-indigo-600">404</p> */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {/* Use the goBack function when the button is clicked */}
            <button
              onClick={goBack}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default PageNotFound;
