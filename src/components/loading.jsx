import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-[calc(100vh_-_89px)] flex justify-center items-center flex-col space-y-2">
      <Loader className="animate-spin w-7 h-7" />
      <p className="text-lg font-bold">Loading...</p>
    </div>
  );
}
