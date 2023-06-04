import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./screens/Homepage";
import Error from "./components/Error";
import Loginpage from "./screens/Loginpage";
import Postpage from "./screens/Postpage";
import { Auth0Provider } from "@auth0/auth0-react";
import Myprofile from "./screens/Myprofile";
import Editprofile from "./screens/Editprofile";
import GenerateImage from "./components/GenerateImage";

function App() {
  return (
    <BrowserRouter>
      <Auth0Provider
        domain="dev-xt6ytmpt.jp.auth0.com"
        clientId="84tw951watZb7GUxHyy8JGdkNYnIP1WH"
        authorizationParams={{
          redirect_uri: `${window.location.origin}/myprofile`,
        }}
      >
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Loginpage />} />
            <Route path="myprofile" element={<Myprofile />} />
            <Route path="myprofile/edit" element={<Editprofile />} />
            <Route path="generateImage" element={<GenerateImage />} />
            <Route path="posts" element={<Postpage />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;
