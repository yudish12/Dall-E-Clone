import { useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useGlobalContext } from "../context/context";
import Showposts from "../components/Showposts";

const Myprofile = () => {
  const { userState, userDispatch, postState, postDispatch } =
    useGlobalContext();
  const { user, isLoading } = useAuth0();

  const authUser = useCallback(async () => {
    try {
      const resp = await axios.post("http://localhost:5000/api/users/auth", {
        email: user.email,
        username: user.nickname,
        picture: user.picture,
      });
      userDispatch({ type: "AUTH_SUCCESS", payload: resp.data });
    } catch (error) {
      userDispatch({ type: "AUTH_ERROR", payload: error });
    }
  }, [user, userDispatch]);

  const getMyPosts = useCallback(async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/api/posts/${user.nickname}`
      );
      postDispatch({ type: "FETCH_POSTS_SUCCESS", payload: resp.data.posts });
    } catch (error) {
      postDispatch({ type: "FETCH_POSTS_ERROR", payload: error });
    }
  }, [user, postDispatch]);

  useEffect(() => {
    if (isLoading) {
      userDispatch({ type: "AUTH_REQ" });
    } else {
      authUser();
    }
  }, [userDispatch, authUser, isLoading]);

  useEffect(() => {
    if (user && postState.posts.length === 0) {
      postDispatch({ type: "FETCH_POSTS_REQ" });
      getMyPosts();
    }
  }, [user, postDispatch, getMyPosts, postState.posts.length]);

  console.log(postState);

  if (userState.loading) {
    return (
      <div className="flex justify-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
          classname="text-center mx-auto"
        />
      </div>
    );
  }

  if (Object.keys(userState.user).length === 0) {
    return <div>Not Logged In</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start p-4 ">
      <div className="myInfo flex justify-center gap-4">
        <div className="profile_pic p-2 mt-4">
          <img
            className="h-24 w-24  rounded-full border-black border-2"
            src={user.picture}
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-8 p-4">
          <div className="flex">
            <h1 className="capitalize p-2 font-medium text-xl">
              {user.nickname}
            </h1>
            <Link
              to={"/generateImage"}
              className="bg-black flex justify-center items-center px-2 rounded-md text-white font-bold text-md"
            >
              Try Dall-E
            </Link>
          </div>
          <div>
            <span className="p-2 font-medium text-xl">
              No of Posts: {postState.posts.length}
            </span>
          </div>
        </div>
      </div>
      {postState.posts.length !== 0 && (
        <Showposts arr={postState.posts.reverse()} />
      )}
    </div>
  );
};

export default Myprofile;
