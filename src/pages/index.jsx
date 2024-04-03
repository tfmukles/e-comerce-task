import ProductCard from "../components/product-card";

export default function Dashboard() {
  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-4">
        <aside className="border-r ">
          <h1>Aside</h1>
        </aside>
        <div className="grid grid-cols-3 col-span-3 gap-4">
          {[...Array(4)].map((item, index) => {
            return <ProductCard key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
