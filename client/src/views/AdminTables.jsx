import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// custom tools
import apiHandler from "../api/APIHandler";
import { getTableRowsTemplate } from "./../components/admin/AdminTableRows";
import Head from "./../components/admin/AdminTableHead";
import IconPlusAdmin from "./../components/icon/IconPlusAdmin";
// styles
import "./../styles/table.css";
import "./../styles/icon-color.css";
// IMPORTANT NOTE :
// The AdminTables component below uses genericity
// for your project : Be aware that it's really easier to create separate tables components for your different collection
// ...

const headColumns = {
	artists: ["name", "style", "rates"],
	albums: ["name", "release", "rates", "label"],
	labels: ["name", "country", "city"],
	styles: ["name", "color"],
};

let RowTds;
let _endpoint;

const AdminTables = (props) => {
	const [state, setState] = useState({ resources: [], headColumnsState: [] });
	const params = useParams();
	console.log(params);
	const updateState = async () => {
		try {
			const res = await apiHandler.get(`/${_endpoint}`);
			RowTds = getTableRowsTemplate(_endpoint);
			console.log(headColumns[_endpoint]);
			setState({
				resources: res.data[_endpoint],
				headColumnsState: headColumns[_endpoint],
			});
		} catch (err) {
			setState({
				...state,
				resources: [],
			});
		}
	};

	useEffect(() => {
		_endpoint = params.endpoint;
		updateState();
	}, [params.endpoint]);

	useEffect(() => {
		_endpoint = params.endpoint;
		updateState();
	}, []);

	const handleDeleteRow = async (e) => {
		try {
			await apiHandler.delete(
				_endpoint,
				e.target.getAttribute("data-ressource-id")
			);
			updateState();
		} catch (err) {
			console.error(err);
		}
	};

	const { headColumnsState, resources } = state;

	return (
		<React.Fragment>
			<h1 className="title">
				<span>Admin {_endpoint}</span>
				<IconPlusAdmin endpoint={_endpoint} />
			</h1>

			{!resources.length ? (
				<p>Sorry ! No resources yet :/</p>
			) : (
				<table className="table">
					<thead>
						<Head columns={headColumnsState} />
					</thead>

					<tbody>
						{resources.map((r, i) => (
							<tr key={i}>
								<RowTds key={i} data={r} />
								{/* TODO CODE ONE MODULE FOR ACTION TDS */}
								<th data-ressource-id={r._id} className="is-clickable">
									<Link
										className="link"
										to={`/admin/${_endpoint}/edit/${r._id}`}>
										<FontAwesomeIcon icon={faEdit} />
									</Link>
								</th>
								<th
									onClick={handleDeleteRow}
									data-ressource-id={r._id}
									className="is-clickable">
									<FontAwesomeIcon
										className="no-pointer-events"
										icon={faTimes}
									/>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</React.Fragment>
	);
};

export default AdminTables;
