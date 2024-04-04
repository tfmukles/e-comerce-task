import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../../hook/useAddCart";
import { removeFromCart } from "../../redux/cart/cart-slice";
import { productSelectors } from "../../redux/product/product-slice";

export default function Checkout() {
  const dispatch = useDispatch();
  const { addToCartHandler } = useCart();
  const { items: carts } = useSelector((state) => state.cart);
  const [patchCart, setPatchCart] = useState(carts);

  useEffect(() => {
    setPatchCart(carts);
  }, [carts.length]);

  const productEntities = useSelector(productSelectors.selectEntities);
  const subTotal = carts
    .reduce(
      (total, item) => total + item.qty * productEntities[item.productId].price,
      0
    )
    .toFixed(2);

  const onChangeHanlder = ({ qty, productId }) => {
    const newCarts = patchCart.map((cart) => {
      if (cart.productId === productId) {
        return { ...cart, qty: +qty };
      } else {
        return cart;
      }
    });
    setPatchCart(newCarts);
  };

  return (
    <div className="container">
      <table className="py-12">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {patchCart.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center font-bold">
                No items in cart
              </td>
            </tr>
          ) : (
            patchCart.map((cart) => {
              const product = productEntities[cart.productId];
              const { title, thumbnail, price } = product || {};
              return (
                <tr key={cart.productId}>
                  <td>
                    <X
                      onClick={() => {
                        dispatch(removeFromCart(cart));
                      }}
                      className="w-6 h-6 text-red-500 cursor-pointer"
                    />
                  </td>
                  <td>
                    <img
                      className="w-12 h-12 object-cover"
                      src={thumbnail}
                      alt={title}
                    />
                  </td>

                  <td>{title}</td>
                  <td>${price?.toFixed(2)}</td>
                  <td>
                    <input
                      onChange={(e) =>
                        onChangeHanlder({
                          qty: e.target.value,
                          productId: cart.productId,
                        })
                      }
                      className="border rounded p-2"
                      value={cart.qty}
                      type="number"
                    />
                  </td>
                  <td>${(price * cart.qty).toFixed(2)}</td>
                </tr>
              );
            })
          )}

          {carts.length > 0 && (
            <tr>
              <td colSpan={6} className="text-right">
                <button
                  onClick={() => addToCartHandler(patchCart)}
                  className="rounded p-2.5 bg-orange-500 text-white py-2"
                >
                  Update
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <table className="max-w-xl ml-auto">
        <caption className="font-bold mb-4 text-4xl">Cart Totals</caption>
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>
              <p>Free Shipping</p>
              <p>Free Shipping options will be updated during checkout</p>
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td>${subTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
