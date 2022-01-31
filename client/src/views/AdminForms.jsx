import React from "react";
// custom tools
import FormArtist from "./../components/form/FormArtist";
import FormAlbum from "./../components/form/FormAlbum";
import FormStyle from "./../components/form/FormStyle";
import FormLabel from "./../components/form/FormLabel";
import IconBack from "./../components/icon/IconBack";
import { useParams } from "react-router-dom";

// IMPORTANT NOTE :
// Each child components below uses one single form for both update and create actions
// Be aware that it's really easier to create separate forms to CREATE AND UPDATE
// ...

const forms = {
	artists: FormArtist,
	albums: FormAlbum,
	styles: FormStyle,
	labels: FormLabel,
};

export default function AdminForms() {
	const params = useParams();
	const { endpoint, id: resourceId, mode } = params;
	const ActiveForm = forms[endpoint];

	return !ActiveForm ? null : (
		<div>
			<h1 className="title">
				<IconBack size="xs" />
				{mode === "edit" ? "Edit" : "New"} {endpoint}
			</h1>
			<hr />
			<ActiveForm mode={mode} _id={resourceId} />
		</div>
	);
}
