import { ProductCard } from "@/components";
import { products } from "@/data/index";

const page = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {products.map((product) => (
        <ProductCard
          id={product.id}
          key={product.id}
          image={product.image}
          name={product.name}
          rating={product.rating}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default page;
