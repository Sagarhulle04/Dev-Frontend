import { useState } from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Register from "./components/Register";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Profile from "./components/Profile.jsx";
import Feed from "./components/Feed.jsx";
import EditProfile from "./components/EditProfile.jsx";
import Connection from "./components/Connection.jsx";
import Request from "./components/Request.jsx";
import Chat from "./components/Chat.jsx";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connection />} />
              <Route path="/requests" element={<Request />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
