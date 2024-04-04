import { useNavigate } from "react-router-dom";

export default function Filter({ items, seletedItems, clickHandler, label }) {
  const navigate = useNavigate();
  return (
    <>
      <p className="font-bold underline">{label}</p>
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
                className={`border m-1 p-2 rounded ${
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
