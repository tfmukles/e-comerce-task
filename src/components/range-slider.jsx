import MultiRangeSlider from "multi-range-slider-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRange } from "../redux/filter/filter-slice";
export default function RangeSlider({ maxPrice, range }) {
  const dispatch = useDispatch();
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(2000);
  const navigate = useNavigate();

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useEffect(() => {
    dispatch(setRange({ min: minValue, max: maxValue }));
    navigate("/");
  }, [minValue, maxValue]);

  return (
    <div className="px-2">
      <p className="flex justify-between">
        <span>min: ${range.min === -Infinity ? 0 : range.min}</span>
        <span>max: ${range.max}</span>
      </p>
      <MultiRangeSlider
        style={{ border: "none", boxShadow: "none" }}
        ruler="false"
        label="false"
        min={"0"}
        minValue={0}
        max={`${maxPrice}`}
        maxValue={range.max || maxPrice}
        onInput={handleInput}
        barInnerColor="#ddd"
      />
    </div>
  );
}
