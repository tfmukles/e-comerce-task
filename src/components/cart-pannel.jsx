import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../redux/cart/cart-slice";
import { productSelectors } from "../redux/product/product-slice";

export default function CartPannel({ onClose }) {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const productEntities = useSelector(productSelectors.selectEntities);
  const { items: carts } = useSelector((state) => state.cart);
  const subTotal = carts.reduce(
    (total, item) => total + item.qty * productEntities[item.productId].price,
    0
  );

  return createPortal(
    <div className="max-w-xs border-l  bg-white w-full fixed top-[89px] right-0 h-[calc(100vh_-_89px)] overflow-y-auto flex flex-col py-2.5 z-30">
      <div className="px-2.5 overflow-y-auto">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl">Cart</h3>
          <button
            type="button"
            onClick={onClose}
            className="border rounded p-2 py-1.5 aspect-square"
          >
            <X className="w-4 h-w-4 text-red-500" />
          </button>
        </div>
        <ul className="space-y-2.5">
          {carts.length > 0 ? (
            carts.map((cart) => {
              const product = productEntities[cart.productId];
              const { title, thumbnail, price } = product || {};

              return (
                <li key={cart.productId}>
                  <div className="flex space-x-2">
                    <div>
                      <X
                        onClick={() => {
                          dispatch(removeFromCart(cart));
                        }}
                        className="w-5 h-w-5 text-red-500 cursor-pointer"
                      />
                      <span className="text-xs">
                        {cart.qty} x ${price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between flex-1">
                      <p>{title}</p>
                      <img
                        className="w-12 object-cover aspect-square"
                        src={thumbnail}
                        alt={title}
                      />
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p>Your cart is empty</p>
          )}
        </ul>

        {carts.length > 0 && (
          <div className="border-t mt-6">
            <p className="py-2 font-semibold px-2">
              Subtotal: ${subTotal.toFixed(2)}
            </p>
          </div>
        )}
      </div>
      <div className="flex space-x-3 px-8">
        <button
          onClick={() => navigator("/checkout")}
          type="button"
          className="w-full rounded bg-black/80 text-white py-2"
        >
          View cart
        </button>
        <button
          onClick={() => navigator("/checkout")}
          type="button"
          className="w-full rounded bg-black/80 text-white relative z-20 py-2"
        >
          Checkout
        </button>
      </div>
    </div>,
    document.body
  );
}
