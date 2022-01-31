import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import APIHandler from "../../api/APIHandler";
import useAuth from "../../auth/useAuth";

export default function IconSignout(props) {
	const { removeUser } = useAuth();
	const navigate = useNavigate();

	const handleSignout = () =>
		APIHandler.post("/signout").finally(() => {
			removeUser(navigate("/signin"));
		});

	return (
		<FontAwesomeIcon
			onClick={handleSignout}
			className="link icon-signout is-clickable"
			icon={faSignOutAlt}
			size="xs"
			title="signout"
		/>
	);
}
