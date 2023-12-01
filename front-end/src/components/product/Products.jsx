import Product from "./Product";

const Products = ({ products = [] }) => {
  const productList = products.map((product) => (
    <li key={product.id}>
      <Product {...product} />
    </li>
  ));
  return (
    <ul className=" max-h-[69vh] grid grid-cols-40 md:grid-cols-3 lg:grid-cols-4 mt-[1rem] pb-[1rem] md:pb-[4rem] gap-[2rem] overflow-auto scrollbar">
      {productList}
    </ul>
  );
};

export default Products;
