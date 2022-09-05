import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { ProductCard } from "./components/productCard";
import { UseInfiniteScroll } from "./hooks/useInfiniteScroll";

function App() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [hasMore,setHasMore] = useState(false);
  const [noOfProducts, setNoOfProducts] = useState(10);
  const{lastProduct}=UseInfiniteScroll(loading,hasMore,setNoOfProducts)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=${noOfProducts}`
      );
      setLoading(false);
      setProducts(data.products);
      if(data.products.length===100)
      setHasMore(false)
      else
      setHasMore(true)
    };
    fetchData();
  }, [noOfProducts]);

  return (
    <div className="App">
      <div className="productsData">
        {products?.map((item, index) => {
          if (products.length === index + 1)
            return (
              <div ref={lastProduct} key={item.id}>
                <ProductCard data={item} />
              </div>
            );
          else
            return (
              <div key={item.id}>
                <ProductCard data={item} />
              </div>
            );
        })}
      </div>
      <div className="loading">{loading && `loading....`}</div>
    </div>
  );
}

export default App;
