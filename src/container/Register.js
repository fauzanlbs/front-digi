import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Api from "../helper/Api";
import { Link } from "react-router-dom";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { register, errors, handleSubmit, watch } = useForm({
    mode: "onBlur"
  });
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = async data => {
    setIsLoading(true);
    let api = new Api();
    await api.create();
    let client = api.getClient();
    let newdata = {
      name: data.name,
      email: data.email,
      password: data.password
    };
    client
      .post("/register", newdata)
      .then(res => {
        console.log("success register", res);
        setIsLoading(false);
        history.push("/login");
      })
      .catch(err => {
        console.log("error auth", err);
      });
  };
  console.log(errors);

  return (
    <div className=" mt-10 p-4 bg-white">
      <form
        className="border border-gray-500 rounded p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-4">
          <h1 className="font-sans text-2xl border-b border-gray-500 font-black text-gray-900">
            Register
          </h1>
          <div className="mt-4">
            <label className="font-sans font-semibold">Name</label>
            <input
              ref={register({
                required: "Required",
                pattern: { value: /^[a-zA-Z]+$/, message: "Only Alphabet" }
              })}
              type="text"
              name="name"
              placeholder="Your name"
              className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
            />
            {errors.name && (
              <p class="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="font-sans font-semibold">Email</label>
            <input
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address"
                }
              })}
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
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
                }
              })}
              type="password"
              name="password"
              placeholder="Secret Password"
              className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
            />
            {errors.password && (
              <p class="text-red-500 text-xs"> {errors.password.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="font-sans font-semibold">Confirm Password</label>
            <input
              ref={register({
                validate: value =>
                  value === password.current || "The passwords do not match"
              })}
              type="password"
              name="password_confirmation"
              placeholder="Confirm your password"
              className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
            />
            {errors.password_confirmation && (
              <p class="text-red-500 text-xs">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <div class="text-center">
            <div class="mt-12">
              <input
                className="mt-1 py-4 px-12 border border-gray-400 rounded cursor-pointer bg-teal-500 text-white text-center"
                value="Register"
                type="submit"
              />
            </div>
            <div
              class="mt-4 text-center inline-block align-baseline font-bold text-sm text-teal-500 hover:text-blue-800"
              href="#"
            >
              <Link to="/login">Back to Login</Link>
            </div>
          </div>

          {isLoading && (
            <p class="text-teal-500 text-xs text-center">Loading...</p>
          )}
        </div>
      </form>
    </div>
  );
}
