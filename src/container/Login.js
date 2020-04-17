import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Api from "../helper/Api";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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
        setIsLoading(false);
        console.log("error auth", err);
        setIsError(true);
      });
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: "url(" + "https://i.redd.it/y1ostvqnr4711.jpg" + ")"
      }}
    >
      <form
        className="border rounded border-gray-500 mt-10 mb-20 bg-white"
        onSubmit={handleSubmit(onLogin)}
      >
        <div className="p-4">
          <h1 className="font-sans text-2xl border-b border-gray-500 font-black text-gray-900">
            Login Masuk
          </h1>

          <div className="mt-4">
            <label className="font-sans font-semibold">Email</label>
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
            <label className="font-sans font-semibold">Password</label>
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
              class="mt-4 mb-10 text-center inline-block align-baseline font-bold text-sm text-teal-500 hover:text-blue-800"
              href="#"
            >
              <Link to="/register">Pendaftaran Relawan</Link>
            </div>
          </div>

          {isLoading && (
            <p class="text-teal-500 text-xs text-center">Loading...</p>
          )}
          {isError && (
            <p class="text-red-500 text-xs text-center">
              You have entered an invalid username or password
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
