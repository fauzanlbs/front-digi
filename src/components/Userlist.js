import React from "react";

export default function Userlist(props) {
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="container my-20">
        <div className="w-full rounded-lg rounded-b-none overflow-hidden sm:shadow-lg lg:bg-gray-700">
          <p class="m-4 font-sans text-2xl text-white text-center font-extrabold tracking-widest">
            LIST REGISTERED USERS
          </p>
        </div>
        {props.data.map((data, idx) => {
          return (
            <ul className=" bg-teal-100 text-center shadow-xl rounded">
              <li
                className="shadow-xl rounded py-3 px-12 border border-gray-700  lg:bg-gray-400"
                key={idx}
              >
                <p class="ml-4 font-sans text-xl text-gray-700 text-center font-extrabold tracking-widest">
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
