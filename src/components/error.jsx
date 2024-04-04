export default function Error({ error }) {
  return (
    <div className="h-[calc(100vh_-_89px)] flex justify-center items-center">
      <div className="text-red-500 py-20 inline-block border px-20 text-4xl shadow-sm rounded-lg">
        {error}
      </div>
    </div>
  );
}
