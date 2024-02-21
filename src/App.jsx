import { RouterProvider } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import router from "./router/router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />

      {/* toastify  */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
