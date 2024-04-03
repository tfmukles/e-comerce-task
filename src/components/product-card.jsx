export default function ProductCard({ title, thumbnail, price }) {
  return (
    <div className="border p-4 rounded-lg space-y-2">
      <img className="aspect-square rounded" src={thumbnail} alt={title} />
      <h5 className="text-xl text-center text-orange-500">{title}</h5>
      <h4 className="text-3xl text-center">${price}</h4>
      <button className="w-full rounded bg-orange-500 text-white py-2">
        Add to cart
      </button>
    </div>
  );
}
