"use client";

import { loginUser } from "../../actions/Login.actions";

const TestButton = () => {
  const handleClick = async () => {
    const res = await loginUser("john@123.com", "pass1234");
    console.log(res);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-red-500 py-3 px-6 text-white cursor-pointer"
    >
      TestButton
    </div>
  );
};

export default TestButton;
