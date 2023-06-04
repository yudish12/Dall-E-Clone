import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
const Homepage = () => {
  const { user } = useAuth0();
  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className="hero bg-neutral-950">
      <pre style={{ fontSize: "2rem", color: "white", padding: "7rem" }}>
        <span style={{ fontSize: "8rem", fontWeight: "700" }}>
          DALL-E CLONE
        </span>
        <br />
        <span style={{ fontWeight: "700" }}>
          DALL·E 2 is an AI system that can create realistic images and art from
          a
        </span>
        <br />
        <span style={{ fontWeight: "700" }}>
          description in natural language.
        </span>
        <div className="login flex align-middle mt-4">
          <Link className="Btn">Follow Me</Link>
          <Link to="/generateImage" className="Btn ml-10">
            Try Dall-E
          </Link>
        </div>
      </pre>
    </div>
  );
};

export default Homepage;
