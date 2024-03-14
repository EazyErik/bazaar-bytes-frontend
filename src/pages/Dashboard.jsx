import axios from "axios";
import { useContext, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/products.context";

export const Dashboard = () => {
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/my-products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-left font-bold text-2xl">Your products</h1>
        <Link to="/products/add">
          <button className="btn btn-primary">Add New Product</button>
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products === null ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};
