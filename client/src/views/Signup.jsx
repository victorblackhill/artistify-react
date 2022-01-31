import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
// custom tools
import APIHandler from "../api/APIHandler";
import IconAvatarAdmin from "../components/icon/IconAvatarAdmin";

const Signup = () => {
	const [state, handleChange] = useForm({
		username: "admin",
		email: "admin@artistify.io",
		password: "12345",
	});
	const [avatar, setAvatar] = useState("");
	const [tmpAvatar, setTmpAvatar] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const fd = new FormData();
		// create a form data (programatic form, to send the file as binary)
		fd.append("email", state.email);
		fd.append("password", state.password);
		fd.append("username", state.username);
		fd.append("avatar", state.avatar);

		try {
			await APIHandler.post("/signup", fd);
			console.log("ok");

			navigate("/signin");
		} catch (err) {
			console.error(err);
		}
	};

	const handleImage = (e) => {
		// console.log("Signup@handle image", e.target.files[0]);
		setAvatar(e.target.files[0], () => {
			const reader = new FileReader();
			reader.onloadend = () => {
				// when the fileREader ends  ...
				const baseString = reader.result; // get the image as a base64 encoded string
				setTmpAvatar(baseString); // set the tmp avatar as an image source before upload
			};
			reader.readAsDataURL(state.avatar); // read the file from the local disk
		});
	};

	return (
		<React.Fragment>
			<form className="form" onSubmit={handleSubmit} onChange={handleChange}>
				<h1 className="title">Signup</h1>
				<label className="label" htmlFor="email">
					email
				</label>
				<input
					className="input"
					id="email"
					type="email"
					name="email"
					defaultValue={state.email}
				/>
				<label className="label" htmlFor="username">
					username
				</label>
				<input
					className="input"
					id="username"
					type="text"
					name="username"
					defaultValue={state.username}
				/>
				<label className="label" htmlFor="avatar">
					avatar
				</label>
				<IconAvatarAdmin avatar={tmpAvatar} clbk={handleImage} />
				<label className="label" htmlFor="password">
					password
				</label>
				<input
					className="input"
					id="password"
					type="password"
					name="password"
					defaultValue={state.password}
				/>
				<button className="btn">ok</button>
			</form>
			<p className="parag">
				Already a member ? please{" "}
				<Link to="/signin" className="link">
					signin
				</Link>
			</p>
		</React.Fragment>
	);
};

export default Signup;
