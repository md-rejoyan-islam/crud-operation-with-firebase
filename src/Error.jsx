import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="flex items-center h-[calc(100vh-10px)] p-16 bg-gray-100 text-gray-900">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x={0}
            y={0}
            viewBox="0 0 50 50"
            xmlSpace="preserve"
            className="w-40 h-40 text-green-400"
          >
            <g>
              <path
                d="M44 1.8h-6.3c-1.1 0-2 .9-2 2C29.8 2.5 26.4 1 20.8 1H10.2C7.9 1 6 2.9 6 5.3c0 1 .3 1.9.9 2.6-1.6.6-2.7 2.2-2.7 4 0 1 .3 1.9.9 2.6-1.6.6-2.7 2.2-2.7 4 0 1 .4 2 1 2.8-1.5.9-2.4 2.4-2.4 4 0 2.4 1.9 4.3 4.2 4.3h11.3c-2.2 3-3.4 6.7-3.4 10.4v4.1c0 2.7 2.1 4.9 4.8 4.9 1.9 0 3.6-1.2 4.4-3l1.9-4.8c1.5-3.7 4.3-6.7 7.8-8.4l3.7-1.8v.2c0 1.1.9 2 2 2H44c2.8 0 5-2.2 5-5V6.8c0-2.7-2.2-5-5-5zM31.1 31.1c-4 1.9-7.1 5.3-8.8 9.4l-1.9 4.8c-.4 1-1.4 1.7-2.5 1.7-1.5 0-2.8-1.3-2.8-2.9V40c0-3.3 1.1-6.6 3-9.3l1.1-1.5a1 1 0 0 0-.8-1.6H5.2c-1.2 0-2.2-1-2.2-2.3S4 23 5.2 23h5.9c.6 0 1-.4 1-1s-.4-1-1-1H6.7c-1.2 0-2.2-1-2.2-2.3s1-2.3 2.2-2.3H13c.6 0 1-.4 1-1s-.4-1-1-1H8.5c-1.2 0-2.2-1-2.2-2.3s1-2.3 2.2-2.3h6.3c.6 0 1-.4 1-1s-.4-1-1-1h-4.5C9 7.7 8 6.6 8 5.3S9 3 10.2 3h10.6c5.3 0 8.2 1.4 14.9 2.9v22.9zM47 28.3c0 1.7-1.3 3-3 3h-6.3V3.8H44c1.7 0 3 1.3 3 3z"
                fill="#000000"
                opacity={1}
                data-original="#000000"
              />
            </g>
          </svg>
        </span>
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-500">
            <span className="sr-only">Error</span>
            <div className="flex justify-center items-center h-full">
              4
              <div className="w-24 h-24 border-8 border-dashed rounded-full animate-spin mt-3 border-green-400"></div>
              4
            </div>
          </h2>
          <p className="text-2xl font-semibold md:text-3xl mb-8">
            Sorry, we couldn{"'"}t find this page.
          </p>
          <Link
            to="/"
            className="px-8 py-3 font-semibold rounded border bg-green-400 text-white"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
