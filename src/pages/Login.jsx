import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { signin, loginWithGoogle, loginWithFacebook } =
    useContext(AuthContext);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const res = await signin(email, password);
    } catch (error) {
      console.log(error.customData);
      console.log(error.customData._tokenResponse.error.message);
    }

    // createUserWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  // login with facebook
  const handleWithFacebook = () => {
    loginWithFacebook();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  border-zinc-200">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-violet-600  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                style={{
                  backgroundColor: "#7150c2",
                }}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? &nbsp;
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
              {/* others login  */}
              <div>
                <div className="my-6 flex gap-4 items-center flex-nowrap">
                  <hr className="border-none h-[1px] w-full bg-zinc-200 " />
                  <span className="font-semibold w-full   text-center basis-[410px]">
                    Or continue with
                  </span>
                  <hr className="border-none h-[1px] w-full bg-zinc-200 " />
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex item-center justify-center gap-3 border rounded-md py-2 px-3 w-full"
                    onClick={handleGoogleLogin}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      x={0}
                      y={0}
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      className="w-6 h-6"
                    >
                      <g>
                        <path
                          d="m492.668 211.489-208.84-.01c-9.222 0-16.697 7.474-16.697 16.696v66.715c0 9.22 7.475 16.696 16.696 16.696h117.606c-12.878 33.421-36.914 61.41-67.58 79.194L384 477.589c80.442-46.523 128-128.152 128-219.53 0-13.011-.959-22.312-2.877-32.785-1.458-7.957-8.366-13.785-16.455-13.785z"
                          style={{}}
                          fill="#167ee6"
                          data-original="#167ee6"
                        />
                        <path
                          d="M256 411.826c-57.554 0-107.798-31.446-134.783-77.979l-86.806 50.034C78.586 460.443 161.34 512 256 512c46.437 0 90.254-12.503 128-34.292v-.119l-50.147-86.81c-22.938 13.304-49.482 21.047-77.853 21.047z"
                          style={{}}
                          fill="#12b347"
                          data-original="#12b347"
                        />
                        <path
                          d="M384 477.708v-.119l-50.147-86.81c-22.938 13.303-49.48 21.047-77.853 21.047V512c46.437 0 90.256-12.503 128-34.292z"
                          style={{}}
                          fill="#0f993e"
                          data-original="#0f993e"
                        />
                        <path
                          d="M100.174 256c0-28.369 7.742-54.91 21.043-77.847l-86.806-50.034C12.502 165.746 0 209.444 0 256s12.502 90.254 34.411 127.881l86.806-50.034c-13.301-22.937-21.043-49.478-21.043-77.847z"
                          style={{}}
                          fill="#ffd500"
                          data-original="#ffd500"
                        />
                        <path
                          d="M256 100.174c37.531 0 72.005 13.336 98.932 35.519 6.643 5.472 16.298 5.077 22.383-1.008l47.27-47.27c6.904-6.904 6.412-18.205-.963-24.603C378.507 23.673 319.807 0 256 0 161.34 0 78.586 51.557 34.411 128.119l86.806 50.034c26.985-46.533 77.229-77.979 134.783-77.979z"
                          style={{}}
                          fill="#ff4b26"
                          data-original="#ff4b26"
                          className=""
                        />
                        <path
                          d="M354.932 135.693c6.643 5.472 16.299 5.077 22.383-1.008l47.27-47.27c6.903-6.904 6.411-18.205-.963-24.603C378.507 23.672 319.807 0 256 0v100.174c37.53 0 72.005 13.336 98.932 35.519z"
                          style={{}}
                          fill="#d93f21"
                          data-original="#d93f21"
                        />
                      </g>
                    </svg>
                    <span className="font-bold">Google</span>
                  </button>
                  <button
                    className="flex item-center justify-center gap-3 border rounded-md py-2 px-3 w-full"
                    onClick={handleWithFacebook}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      x={0}
                      y={0}
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      className="w-6 h-6"
                    >
                      <g>
                        <path
                          fill="#1877f2"
                          d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z"
                          opacity={1}
                          data-original="#1877f2"
                          className=""
                        />
                        <path
                          fill="#ffffff"
                          d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z"
                          opacity={1}
                          data-original="#ffffff"
                          className=""
                        />
                      </g>
                    </svg>

                    <span className="font-bold">Facebook</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
