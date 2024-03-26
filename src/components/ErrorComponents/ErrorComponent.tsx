import { Link } from "react-router-dom";
// import { ErrorComponentProps } from "../../utils/types/types";
interface ErrorData {
  path: string;
  Message: string;
}
interface ErrorComponentProps {
  data: ErrorData;
}

export const ErrorComponent = (props: ErrorComponentProps) => {
  const { path, Message } = props.data;
  return (
    <div className="flex pt-5 justify-center h-full w-[100%] fixed backdrop-blur bg-opacity-50 bg-black ">
      <div
        className="flex p-4 shadow-2xl h-32 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 mt-2 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">ERROR</span>
        <div>
          <span className="font-medium">Ooops...!</span>
          <br />
          <span className="font-medium">
            {" "}
            {Message}{" "}
            <br />
            <br />
            <Link to={path}>
              <span className="text-green-500 underline pl-5 mt-5 pt-5">Back to settings</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
