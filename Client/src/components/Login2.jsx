import { BsGoogle, BsGithub } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";

const Login2 = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <form className="flex flex-col justify-center w-96 h-96 bg-black p-8 rounded-md">
        <h1 className="text-white mx-auto font-semibold text-3xl">Sign In</h1>
        <button
          onClick={() => {
            loginWithRedirect();
          }}
          className="text-black bg-white p-2 flex items-center justify-center rounded-sm font-semibold text-md mt-8 hover:bg-slate-300"
        >
          <BsGoogle className="mt-1 mx-1" />
          Login With Google
        </button>

        <button className="text-black bg-white p-2 flex items-center justify-center rounded-sm font-semibold text-md mt-8 hover:bg-slate-300">
          <BsGithub className="mt-1 mx-1" />
          Login With Github
        </button>
      </form>
    </>
  );
};

export default Login2;
