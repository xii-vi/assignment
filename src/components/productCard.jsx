import "./productCard.css"
export const ProductCard = ({data}) => {
  return (
    <>
      <div className="product-container">
        <img src={data.thumbnail} alt={data.title}/>
        <p>{data.title}</p>
      </div>
    </>
  );
};
