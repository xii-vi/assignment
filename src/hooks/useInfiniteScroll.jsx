import { useCallback, useRef } from "react";
export const UseInfiniteScroll =(loading,hasMore,setNoOfProducts)=>{
    const observer = useRef();
    const lastProduct = useCallback(
      (node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((productData) => {
          if (productData[0].isIntersecting && hasMore) {
            setNoOfProducts((noOfProducts) => noOfProducts + 5);
          }
        });
        if (node) observer.current.observe(node);
      },
      [loading,hasMore,setNoOfProducts]
    );
    return {lastProduct}
}