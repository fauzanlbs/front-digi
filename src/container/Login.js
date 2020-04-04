import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Api from "../helper/Api";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });

  const onLogin = async data => {
    setIsLoading(true);
    let api = new Api();
    await api.create();
    let client = api.getClient();
    client
      .post("/login", data)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        console.log("success auth", res);
        setIsLoading(false);
        history.push("/");
      })
      .catch(err => {
        console.log("error auth", err);
      });
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/3" />
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form
            className="border rounded border-gray-500"
            onSubmit={handleSubmit(onLogin)}
          >
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500 font-black text-gray-900">
                Login
              </h1>

              <div className="mt-4">
                <label>Email</label>
                <input
                  ref={register({ required: "Required" })}
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                {errors.email && (
                  <p class="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div className="mt-4">
                <label>Password</label>
                <input
                  ref={register({ required: "Required" })}
                  type="password"
                  name="password"
                  placeholder="Secret Password"
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                {errors.password && (
                  <p class="text-red-500 text-xs">{errors.password.message}</p>
                )}
              </div>

              <div class="text-center">
                <div class="mt-12">
                  <input
                    className="mt-1 py-4 px-12 border border-gray-400 rounded cursor-pointer bg-teal-500 text-white text-center"
                    type="submit"
                  />
                </div>
                <div
                  class="mt-4 text-center inline-block align-baseline font-bold text-sm text-teal-500 hover:text-blue-800"
                  href="#"
                >
                  <Link to="/register">Register</Link>
                </div>
              </div>

              {isLoading && (
                <p class="text-teal-500 text-xs text-center">Loading...</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
