import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  productSelectors,
} from "../redux/product/product-slice";

export function useFetchProduct() {
  const dispatch = useDispatch();
  const products = useSelector(productSelectors.selectAll);
  const { isLoading, isError, error } = useSelector((state) => state.product);
  useEffect(() => {
    if (products.length < 1) {
      dispatch(fetchProducts());
    }
  }, []);

  return { products, isLoading, isError, error };
}
