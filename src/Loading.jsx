import { FadeLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-[calc(100vh-10px)] w-full flex items-center justify-center">
      <FadeLoader color="#07f6c6" height={20} radius={50} width={5} />
    </div>
  );
}
