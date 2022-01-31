import React from "react";
import { NavLink } from "react-router-dom";

export default function NavMain() {
	return (
		<nav id="nav_main" className="nav">
			<NavLink className="link" to="/">
				home
			</NavLink>
			<NavLink className="link" to="/artists">
				artists
			</NavLink>
			<NavLink className="link" to="/albums">
				albums
			</NavLink>
			<NavLink className="link" to="/contact-us">
				contact
			</NavLink>
		</nav>
	);
}
