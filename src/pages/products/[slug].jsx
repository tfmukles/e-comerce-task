import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/loading";
import ProductSlider from "../../components/product-slider";
import { useCart } from "../../hook/useAddCart";
import { useFetchProduct } from "../../hook/useFetchProduct";
import { productSelectors } from "../../redux/product/product-slice";

export default function ProductSingle() {
  const { slug } = useParams();
  const { addToCartHandler } = useCart();
  const { items: carts } = useSelector((state) => state.cart);
  const qty = carts.find((item) => item.productId === +slug)?.qty || 1;
  const [cartInput, setCartInput] = useState(qty || 1);
  const { isLoading, isError, error } = useFetchProduct();
  const productEntities = useSelector(productSelectors.selectEntities);
  const product = useSelector((state) =>
    productSelectors.selectById(state, slug)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError && !isLoading) {
    return <Error error={error} />;
  }
  const { stock, title, description, price, images } = product || {};

  return (
    <div className="container">
      <div className="grid grid-cols-12 py-8 gap-10">
        <div className="col-span-6">
          <ProductSlider images={images} />
        </div>
        <div className="col-span-6 space-y-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-2xl font-bold text-orange-500">
            ${price?.toFixed(2)}
          </p>
          <p className="text-lg">{description}</p>
          <div className="flex space-x-2">
            <h4 className="text-3xl text-center">${stock}</h4>
            <input
              onChange={(e) => {
                const product = productEntities[+slug];
                const stock = product.stock - +e.target.value;
                if (stock < 0) {
                  toast.error("the stock is not enough");
                  return;
                }
                setCartInput(+e.target.value);
              }}
              className="border rounded p-2 w-20"
              type="number"
              value={cartInput}
            />
            <button
              onClick={() => {
                addToCartHandler([{ productId: +slug, qty: cartInput }]);
              }}
              className="bg-black rounded text-white p-2"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <p className="text-lg">{description}</p>
    </div>
  );
}
