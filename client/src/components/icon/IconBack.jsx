import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

const IconGoBack = ({ size = "1x" }) => {
	const navigate = useNavigate();
	return (
		<FontAwesomeIcon
			title="browse back to previous page"
			className="link is-clickable"
			onClick={() => navigate(-1)}
			size={size}
			icon={faArrowAltCircleLeft}
		/>
	);
};

export default IconGoBack;
