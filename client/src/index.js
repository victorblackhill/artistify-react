import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./auth/UserProvider";
ReactDOM.render(
	<BrowserRouter>
		<UserProvider>
			<App />
		</UserProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
