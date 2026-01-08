import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#000000] text-white py-32 flex items-center justify-center">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 ">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-white">Not Found</h1>
          <p className="text-lg">Could not find requested resource</p>
          <Link
            href="/"
            className="text-white/60 hover:text-white flex items-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
