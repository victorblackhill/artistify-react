// custom tools
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";

const FormArtist = () => {
	return (
		<>
			<h1 className="title diy">D.I.Y (FormArtist)</h1>
			<p>Code a form to Create/Update artists.</p>
			<LabPreview name="artistForm" isSmall />
			<hr />
		</>
	);
};

export default FormArtist;
