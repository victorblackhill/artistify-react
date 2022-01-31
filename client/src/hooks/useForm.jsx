import { useState } from "react";

const useForm = (initialValue) => {
	const [values, setValues] = useState(initialValue);

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	return [values, handleChange];
};

export default useForm;
