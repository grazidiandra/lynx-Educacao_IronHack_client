import React from "react";

const Input = ({ name, type, value, handleChange }) => (
  <div className="">
    <div className="">
      <input
        className=""
        type={type}
        placeholder={`enter ${name}`}
        name={name}
        value={value}
        onChange={e => handleChange(e)}
      />
    </div>
  </div>
);

export default Input;