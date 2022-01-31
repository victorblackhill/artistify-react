import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// custom tools
import APIHandler from "./../../api/APIHandler";
// styles
import "./../../styles/form.css";

const FormStyle = ({ mode = "create", _id, history, match }) => {
	const navigate = useNavigate();
	const params = useParams();
	const [{ color, name, wikiURL }, setState] = useState({
		color: "#000",
		name: "",
		wikiURL: "",
	});

	useEffect(() => {
		const initFormData = async () => {
			const apiRes = await APIHandler.get(`/styles/${_id}`);
			delete apiRes.data._id;
			setState({ ...apiRes.data });
		};

		if (mode === "edit") initFormData();
	}, [mode, _id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const styleInfos = {
			color,
			name,
			wikiURL,
		};

		try {
			if (mode === "create") await APIHandler.post("/styles", styleInfos);
			else await APIHandler.patch(`/styles/${params.id}`, styleInfos);

			navigate("/admin/styles");
		} catch (apiErr) {
			console.error(apiErr);
		}
	};

	const handleChange = (e) => {
		e.persist();
		setState((prevValues) => ({
			...prevValues,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<form className="form" onSubmit={handleSubmit} onChange={handleChange}>
			<label className="label" htmlFor="name">
				name
			</label>
			<input className="input" id="name" type="text" defaultValue={name} />

			<label className="label" htmlFor="wikiURL">
				wiki URL
			</label>
			<input
				className="input"
				id="wikiURL"
				type="text"
				defaultValue={wikiURL}
			/>

			<label className="label" htmlFor="color">
				color
			</label>
			<input
				className="input color is-clickable"
				id="color"
				type="color"
				defaultValue={color}
			/>

			<button className="btn">ok</button>
		</form>
	);
};

export default FormStyle;
