// custom tools
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import React,{useState, useRef, useEffect} from "react"
import APIHandler from "./../../api/APIHandler"
import {useParams} from "react-router-dom";

const FormArtist = () => {
	
	//upload with a picture
	//set the input reference (imageRef) to be able to access the DOM WITHOUT a setter

	//create the DOM Handler	
		//prevent reload
		//destructure the data to handle more easily
		//create formdata (and use uploader.single on server side to be able to decrypt) 
		//append pairs keys,values
		// ! append image : imageRef.current.file[0] < - - - - TRICKY PART ATTENTION!!!

	// create the API handler middleware)
		//configuer AXIOS (//returns a configured version of AXIOS)
		//update the full list if necessary... with an handler that is passed in as a prop


	//render the form in the view

	const params=useParams()
	console.log(params.mode)
	
	const[artist,setArtist] = useState({
										name:"name",
										description:"description",
										isBand:false,
										baseStyles:[""],
										picture:"picture"
										})

	
	const updateCallback =  async ()=>{
		const res = await APIHandler.get("/artists/"+ params.id)
		console.log(res.data._doc)
		setArtist(res.data._doc)

	}
	if(params.mode==="edit"){
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(updateCallback,[])
	}
																	
	
													
	const imageRef = useRef("");

	const theSender = async (formData)=>{

		try{
			
			if (params.mode==="create"){
				const res = await APIHandler.post("/artists",formData)
				console.log("done", res.data) 
			} else if (params.mode==="edit"){
				const res = await APIHandler.patch("/artists/" +params.id,formData)
				console.log("done", res.data) 
			}
			
			
		}catch(err){console.error(err)}

	}

	const domHandler = async (e) =>{
		
		e.preventDefault()

		const {name,description, isBand, baseStyles} = artist
		
		const formData = new FormData()
		formData.append("name",name);
		formData.append("description",description)
		formData.append("isBand",isBand)
		formData.append("baseStyles",baseStyles)
		formData.append("picture",imageRef.current.files[0])

		await theSender(formData)
	}
	
	return (
		<>
			<h1 className="title diy">D.I.Y (FormArtist)</h1>
			
			<div className = "form">
				<label className="label" htmlFor="name">Name</label>
				<input
				value={artist.name}
				id="name"
				className="input"
				type="text"
				placeholder="name"
				onChange={(e) => setArtist({ ...artist, name: e.target.value })}
				/>
				
				<label className="label" htmlFor="description" >Description</label>
				<textarea
				id="description"
				className="input"
				value={artist.description}
				type="text"
				placeholder="description"
				onChange={(e) => setArtist({ ...artist, description: e.target.value })}
				/>

				<label className="label" htmlFor="isBand">Band</label>
				<input
				id="isBand"
				checked={artist.isBand}
				type="checkbox"
				onChange={(e) => setArtist({ ...artist, isBand: e.target.checked })}
				/>

				<input className="label" ref={imageRef} name="picture" type="file" />
				<button className="btn" onClick={domHandler}>ok</button>
				
			</div>

			
			<hr />
		</>
	);
};

export default FormArtist;

//<LabPreview name="artistForm" isSmall />
