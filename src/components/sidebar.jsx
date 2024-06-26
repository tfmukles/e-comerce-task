import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setBrands,
  setCatagories,
  setRating,
} from "../redux/filter/filter-slice";
import Filter from "./filter";
import RangeSlider from "./range-slider";

export default function Sidebar({ products }) {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const catagories = Array.from(
    new Set(products?.map((item) => item.category))
  );
  const brands = Array.from(new Set(products?.map((item) => item.brand)));
  const maxPrice = Math.max(...products.map((item) => item.price));
  const {
    catagories: seletedCatagories,
    brands: seletedBrands,
    range,
    rating,
  } = useSelector((state) => state.filter);

  return (
    <div className="sticky h-[calc(100vh_-_89px)] bg-white top-[89px] left-0 py-4 overflow-y-auto border-r">
      <RangeSlider range={range} maxPrice={maxPrice} minPrice={0} />
      <Filter
        items={catagories}
        seletedItems={seletedCatagories}
        clickHandler={(item) => dispatch(setCatagories(item))}
        label={"Catagories"}
      />

      <Filter
        items={brands}
        seletedItems={seletedBrands}
        clickHandler={(item) => dispatch(setBrands(item))}
        label={"All Brands"}
      />

      <p className="font-bold border-b pb-2">Ratings</p>
      <ul className="flex space-x-1 mb-3 mt-2">
        {[...Array(5)].map((_, i) => {
          const isActive = i + 1 <= rating;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => {
                  dispatch(setRating(i + 1));
                  navigator("/");
                }}
              >
                <Star
                  fill="currentColor"
                  className={isActive ? "text-yellow-500" : "text-gray-400"}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
