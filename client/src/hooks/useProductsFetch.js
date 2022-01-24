import { useState } from "react";
import { publicRequest } from "..//utils/axiosInstanse";

export const useProductsFetch = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [product, setProduct] = useState([]);

  const fetchProducts = async (cat) => {
    try {
      setisLoading(true);
      const res = await publicRequest.get(
        cat
          ? `/products?offset=${offset}&limit=${20}&category=${cat}`
          : `/products?offset=${offset}&limit=${8}`
      );
      setisLoading(false);
      setProducts([...products, ...res.data.products]);
    } catch (err) {
      setError(true);
    }
  };

  const fetchProduct = async (id) => {
    try {
      setisLoading(true);
      const res = await publicRequest.get("/products/find/" + id);
      setisLoading(false);
      setProduct(res.data.product);
    } catch (err) {
      setError(true);
    }
    setisLoading(false);
  };

  return {
    isLoading,
    error,
    products,
    product,
    offset,
    fetchProducts,
    fetchProduct,
  };
};
