const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		allowed_formats: ['jpg', "jpeg", 'png', "gif"],
		folder: 'cohort-2911'
	}
	//  params below is only needed if uploading media types other than images (video, audio...)
	// params: {
	//     ressource_type: "raw"
	// }
});

//cloudinary.uploader.upload("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==", function(error, result) {console.log(result, "error >>",error); });


const fileUploader = multer({ storage });

module.exports = fileUploader;
