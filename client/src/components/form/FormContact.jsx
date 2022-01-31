import { useState } from "react";
import apiHandler from "../../api/APIHandler";
import useForm from "../../hooks/useForm";
// styles
import "../../styles/form.css";

const FormContact = () => {
	const [state, handleChange] = useForm({
		message: null,
		from: null,
		subject: null,
	});

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const apiRes = await apiHandler.post("/contact", state);
			console.log(apiRes);
		} catch (apiErr) {
			console.log(apiErr);
		}
	};

	return (
		<form onChange={handleChange} onSubmit={handleSubmit} className="form">
			<h1 className="title">What's up?!</h1>
			<label className="label" htmlFor="from">
				email
			</label>
			<input className="input" id="from" type="text" name="from" />
			<label className="label" htmlFor="subject">
				subject
			</label>
			<input className="input" id="subject" type="text" name="subject" />
			<label className="label" htmlFor="message">
				message
			</label>
			<textarea
				className="input"
				name="message"
				id="message"
				cols="30"
				rows="10"></textarea>
			<button className="btn">ok</button>
		</form>
	);
};

export default FormContact;
