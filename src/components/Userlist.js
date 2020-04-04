import React from "react";

export default function Userlist(props) {
  return (
    <div className="mb-10 mt-10 flex items-center justify-center">
      <div className="container">
        <div className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <p class="ml-4 font-sans text-2xl text-gray-800 text-center font-extrabold">
            List Registered Users
          </p>
        </div>
        {props.data.map((data, idx) => {
          return (
            <ul className=" bg-teal-100 text-center shadow-xl rounded">
              <li
                className="shadow-xl rounded mt-1 py-3 px-12 border border-gray-400 bg-gray-700"
                key={idx}
              >
                <p class="ml-4 font-sans text-xl text-white text-center font-extrabold">
                  {data.name}
                </p>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
