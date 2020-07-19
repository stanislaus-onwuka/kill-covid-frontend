import React, { useRef } from "react";
import "./profile-pic-uploader.css";

const ProfilePicUploader=(props)=> {
  const { currentUser: { imageUrl }, setImageUrl } = props;

  // const [imageUrl, setImageUrl] = useState("");
  const inputFile = useRef(null);

  const uploadImage = event => {
    event.preventDefault();
    const image = inputFile.current.files[0];
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "b28h3vsg");

    const options = {
      method: "POST",
      body: formData
    };

    const url = "https://api.cloudinary.com/v1_1/coveed/image/upload";
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setImageUrl(data.secure_url);
        console.log(formData)
        console.log(data.secure_url);
      })
      .catch(console.error);
  };

  return (
    <div className={`profile-pic-uploader ${props.openUploader ? "visible-uploader":"invisible-uploader" }`}>
        <div className="profile-pic-uploader-main">
            <h2>Upload Profile Picture</h2>
            <div className={`image-div ${!imageUrl ? "invisible-picture" : "visible-picture" }`}>
                <img src={imageUrl} alt="Profile"/>
            </div>
            <form onSubmit={uploadImage}>
                <input ref={inputFile} type="file" accept="image/*" multiple={false}/>
                <input type="submit" value="UPLOAD" className="upload-btn" onClick={props.showUploader}/>
            </form>
        </div>
        <div className="mask" onClick={props.showUploader}></div>
    </div>
  );
}

export default ProfilePicUploader;
