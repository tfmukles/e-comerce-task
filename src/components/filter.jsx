import { useNavigate } from "react-router-dom";

export default function Filter({ items, seletedItems, clickHandler, label }) {
  const navigate = useNavigate();
  return (
    <>
      <p className="font-bold border-b pb-2 mb-2">{label}</p>
      <ul className="flex flex-wrap">
        {items?.map((item) => {
          const isActive = seletedItems.includes(item);
          return (
            <li key={item}>
              <button
                onClick={() => {
                  clickHandler(item);
                  navigate("/");
                }}
                className={`border m-1 px-2.5 capitalize  py-1.5 rounded-full ${
                  isActive ? "bg-yellow-500" : ""
                }`}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
