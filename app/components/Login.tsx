import Link from "next/link";

const Login = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="w-full p-4 border-[0.3px] border-[#111111]/40 focus:outline-none"
        />
      </div>
      <button className="w-full bg-[#111111] py-4 text-white">Login</button>
      <div className="flex justify-center gap-1 text-xs">
        <p>By signing in you agree to our </p>
        <Link href={"#"} className="underline">
          terms & conditions
        </Link>{" "}
        and{" "}
        <Link href={"#"} className="underline">
          {" "}
          privacy policy
        </Link>
      </div>
    </div>
  );
};

export default Login;
