import { SearchIcon } from "lucide-react";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearchKey } from "../redux/filter/filter-slice";

export default function Search() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { searchKey } = useSelector((state) => state.filter);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  return (
    <div className={"relative w-full "}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="rounded-md shadow-sm w-full">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          aria-hidden="true"
        >
          <SearchIcon
            className="mr-3 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          defaultValue={searchKey}
          type="text"
          name="search"
          id="search"
          className="h-11 block rounded-md border border-gray-200 pl-9 focus:ring-[#ccc] focus:border-none sm:text-sm w-full pr-3"
          placeholder="Search by product title..."
          spellCheck={false}
          onChange={(e) => {
            startTransition(() => {
              if (pathname !== "") {
                navigate("/");
              }
              dispatch(setSearchKey(e.target.value));
            });
          }}
        />
      </div>

      {isPending && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
