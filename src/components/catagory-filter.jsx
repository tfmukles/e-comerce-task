export default function CatagoryFilter({ prouducts }) {
  const catagories =
    Array.from(new Set(prouducts?.map((item) => item.category))) ?? [];
  return (
    <ul className="flex flex-wrap h-screen sticky top-0 left-0 py-4">
      {catagories.map((item) => (
        <li key={item}>
          <button className="border m-1 p-2 rounded">{item}</button>
        </li>
      ))}
    </ul>
  );
}
