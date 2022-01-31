import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// custom tools
import APIHandler from "../../api/APIHandler";
import CustomInputFile from "./../icon/IconAvatarAdmin";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

const FormLabel = ({ mode = "create", _id }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [{ name, logo, logoTmp, city, country, street, streetNb }, setState] =
		useState({
			name: "",
			logo: "",
			logoTmp: "",
			city: "",
			country: "",
			street: "",
			streetNb: "",
		});

	useEffect(() => {
		const initFormData = async () => {
			const apiRes = await APIHandler.get(`/labels/${_id}`);
			delete apiRes.data._id;
			setState({ ...apiRes.data });
		};

		if (mode === "edit") initFormData();
	}, [mode, _id]);

	const handleChange = (e) => {
		e.persist();
		setState((prevValues) => ({
			...prevValues,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const fd = new FormData();
		fd.append("city", city);
		fd.append("country", country);
		fd.append("name", name);
		fd.append("street", street);
		fd.append("streetNb", streetNb);
		fd.append("logo", logo);

		try {
			if (mode === "create") await APIHandler.post("/labels", fd);
			else await APIHandler.patch(`/labels/${id}`, fd);

			navigate("/admin/labels");
		} catch (apiErr) {
			console.error(apiErr);
		}
	};

	const handleLogo = (file) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			// when the fileReader ends reading image  ...
			const base64String = reader.result;
			// add the actual file to the state + the tmp logo as a preview before upload
			setState((preValues) => ({
				...preValues,
				logo: file,
				logoTmp: base64String,
			}));
		};
		reader.readAsDataURL(file); // read the file from the local disk
	};

	return (
		<form className="form" onSubmit={handleSubmit} onChange={handleChange}>
			<label className="label" htmlFor="name">
				name
			</label>
			<input className="input" id="name" type="text" defaultValue={name} />

			<label className="label" htmlFor="logo">
				logo
			</label>
			<CustomInputFile
				avatar={logoTmp || logo}
				clbk={(e) => handleLogo(e.target.files[0])}
			/>

			<label className="label" htmlFor="country">
				country
			</label>
			<input
				className="input"
				id="country"
				type="text"
				defaultValue={country}
			/>

			<label className="label" htmlFor="city">
				city
			</label>
			<input className="input" id="city" type="text" defaultValue={city} />

			<label className="label" htmlFor="street">
				street
			</label>
			<input className="input" id="street" type="text" defaultValue={street} />

			<label className="label" htmlFor="streetNb">
				street nb
			</label>
			<input
				className="input"
				id="streetNb"
				type="number"
				defaultValue={streetNb}
			/>

			<button className="btn">ok</button>
		</form>
	);
};

export default FormLabel;
