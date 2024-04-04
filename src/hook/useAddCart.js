import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/cart/cart-slice";
import { productsUpdate } from "../redux/product/product-slice";

export function useCart() {
  const dispatch = useDispatch();
  const { items: carts } = useSelector((state) => state.cart);
  const addToCartHandler = (items, method = "replace") => {
    if (method === "replace") {
      const newCarts = [...carts];
      items.forEach((item) => {
        const { productId, qty } = item;
        const productIndex = carts.findIndex(
          (cartItem) => cartItem.productId === productId
        );

        if (productIndex === -1) {
          newCarts.push({ productId, qty });
          toast.success("Cart added");
        } else {
          const currentQty = carts[productIndex].qty;
          newCarts[productIndex] = {
            productId,
            qty,
            diffQty: qty - currentQty,
          };
          toast.success("Cart updated");
        }
      });
      dispatch(addToCart(newCarts));
      dispatch(productsUpdate(newCarts));
    } else {
      const item = items[0];
      const newCarts = [...carts];
      const { productId, qty } = item;
      const productIndex = carts.findIndex(
        (cartItem) => cartItem.productId === productId
      );

      if (productIndex === -1) {
        newCarts.push({ productId, qty });
        toast.success("Cart added");
      } else {
        newCarts[productIndex] = {
          productId,
          qty: qty + carts[productIndex].qty,
          diffQty: qty,
        };
        toast.success("Cart updated");
      }
      dispatch(addToCart(newCarts));
      dispatch(productsUpdate(newCarts));
    }
  };

  return { addToCartHandler };
}
