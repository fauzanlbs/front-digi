import React from "react";

export default function Userlist(props) {
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="container my-20">
        <div className="w-full rounded-lg overflow-hidden sm:shadow-lg lg:bg-gray-400">
          <p class="m-4 font-sans sm:text-xl lg:text-2xl text-white lg:text-gray-800 text-center font-extrabold tracking-widest">
            LIST REGISTERED USERS
          </p>
        </div>
        {props.data.map((data, idx) => {
          return (
            <ul className=" bg-teal-100 text-center shadow-xl rounded">
              <li
                className="shadow-xl rounded mt-1 py-3 px-12 border border-gray-400 bg-gray-700"
                key={idx}
              >
                <p class="ml-4 font-sans text-xl text-white text-center font-extrabold tracking-widest">
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
