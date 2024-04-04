import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeFromCart, updateMany } from "../../redux/cart/cart-slice";
import { productSelectors } from "../../redux/product/product-slice";

export default function Checkout() {
  const dispatch = useDispatch();
  const { items: carts } = useSelector((state) => state.cart);
  const [patchCart, setPatchCart] = useState(carts);
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

  const onUpdateHandler = () => {
    const newCarts = [];
    patchCart.forEach((cart) => {
      const product = productEntities[cart.productId];
      const stock = product.stock;
      const newStock = stock - cart.qty;
      if (newStock < 0) {
        toast.error(
          <div>
            <h3>Out of stock</h3>
            <p>{product.title}</p>
            <p>Available stock: {stock}</p>
            <p>Only this item we can't update. rest item will be updated.</p>
          </div>
        );
        return;
      }
      newCarts.push({ productId: cart.productId, qty: cart.qty });
    });

    if (newCarts.length > 0) {
      dispatch(updateMany(newCarts));
    }
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
          {carts.length > 0 ? (
            patchCart.map((cart) => {
              const { title, thumbnail, price } =
                productEntities[cart.productId];

              return (
                <tr key={cart.productId}>
                  <td>
                    <X
                      onClick={() => {
                        dispatch(removeFromCart(cart.productId));
                      }}
                      className="w-4 h-4 text-red-500 cursor-pointer"
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
                  <td>${price.toFixed(2)}</td>
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
          ) : (
            <tr>
              <td colSpan={6}>
                <p className="text-center text-red-500 font-bold">
                  Cart is empty
                </p>
              </td>
            </tr>
          )}

          {carts.length > 0 && (
            <tr>
              <td colSpan={6} className="text-right">
                <button
                  onClick={onUpdateHandler}
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
        <caption className="font-bold mb-4">Cart Totals</caption>
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
