import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/cart/cart-slice";
import CartPannel from "./cart-pannel";

export default function ProductCard({ title, thumbnail, price, id, stock }) {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {isOpen && <CartPannel onClose={() => setOpen(false)} />}
      <div className="border p-4 rounded-lg space-y-2">
        <img className="aspect-square rounded" src={thumbnail} alt={title} />
        <h5 className="text-xl text-center text-orange-500">{title}</h5>
        <h4 className="text-3xl text-center">${price}</h4>
        <button
          type="button"
          onClick={() => {
            if (stock <= 0) {
              toast.error("Out of stock");
              return;
            }
            dispatch(addToCart({ productId: id }));
            setOpen(true);
          }}
          className="w-full rounded bg-orange-500 text-white py-2"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
