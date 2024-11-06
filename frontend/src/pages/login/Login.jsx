import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 max-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          login
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">username</span>
            </label>
            <input
              type="text"
              name=""
              className="w-full input input-bordered h-10"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id=""
            />
          </div>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">password</span>
            </label>
            <input
              type="password"
              name=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full input input-bordered"
              id=""
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Don't have a account
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
