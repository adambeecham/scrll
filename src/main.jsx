import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Post from "./components/Post";
import "./styles/base.scss";

const router = createBrowserRouter([
	{ path: "/", element: <App /> },
	{ path: "/post/:slug", element: <Post /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);