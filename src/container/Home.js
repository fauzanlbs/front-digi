import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Autocomplete from "../components/Autocomplete";
import Userlist from "../components/Userlist";
import Api from "../helper/Api";

export default function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let api = new Api();
    api.create();
    let client = api.getClient();
    let token = `?token=${localStorage.getItem("token")}`;
    client
      .get(`/userlist${token}`)
      .then(res => {
        setUsers(res.data.user);
      })
      .catch(err => {
        console.log("error auth", err);
      });
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="flex items-center  w-full bg-teal-lighter">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <Autocomplete options={users.map(dt => dt.name)} />
        </div>
      </div>
      <Userlist data={users} />
    </React.Fragment>
  );
}
