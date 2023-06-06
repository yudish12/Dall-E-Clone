import { useAuth0 } from "@auth0/auth0-react";
import { useGlobalContext } from "../context/context";
import { useState } from "react";
import { Link } from "react-router-dom";
const Dropdown = () => {
  const { userDispatch } = useGlobalContext();
  const { logout } = useAuth0();
  const { user } = useAuth0();
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div className="ml-10 flex flex-col relative  justify-evenly items-center ">
      <img
        className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
        src={user.picture}
        onClick={() => setShowDrop(!showDrop)}
      />
      {showDrop && (
        <div className="details absolute flex flex-col justify-center right-0 top-12 w-64  bg-black text-white transition-all duration-500">
          <Link to={"/myprofile"} className="my-2 mx-auto">
            My Profile
          </Link>
          <Link to="/generateImage" className="my-2 mx-auto">
            Create Post
          </Link>
          <Link
            onClick={() => {
              userDispatch({ type: "LOGOUT" });
              localStorage.clear();
              logout({
                logoutParams: {
                  returnTo: `${window.location.origin}`,
                },
              });
            }}
            className="my-2 mx-auto"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
