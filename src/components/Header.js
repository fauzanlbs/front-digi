import React from "react";
import { useHistory } from "react-router-dom";
import Api from "../helper/Api";

export default function Header() {
  const history = useHistory();
  const onLogout = async () => {
    let api = new Api();
    await api.create();
    let client = api.getClient();
    let token = `?token=${localStorage.getItem("token")}`;
    client
      .get(`/logout${token}`)
      .then(res => {
        localStorage.removeItem("token");
        console.log("success logout");
        history.push("/login");
      })
      .catch(err => {
        console.log("error auth", err);
      });
  };
  return (
    <div className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span class="text-2xl tracking-tight font-black">Registered Users</span>
        <div className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"></div>
      </div>
      <div className="flex-end">
        <button
          onClick={onLogout}
          className="font-semibold inline-block text-sm px-4 py-2 leading-none border rounded  border-white hover:border-transparent text-teal-500 bg-white mt-4 lg:mt-0"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
