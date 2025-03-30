import React, { useState } from "react";

const ImagePicker = ({setImage, image,setValue}) => {
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setValue("profilePicture", file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="d-flex align-items-center gap-3">
      {!image ? (
        <label className="border border-secondary rounded d-flex justify-content-center align-items-center p-3" style={{ width: "100px", height: "100px", cursor: "pointer" }}>
          <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} hidden 
          
          />
          <span className="fs-1 fw-bold">+ </span>
        </label>

      ) : (
        <div className="position-relative">

          <img src={image} alt="Selected" className="rounded border border-secondary" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
          <button className="btn  btn-sm position-absolute btn-transparent top-0 end-0 m-1 p-1" onClick={removeImage} style={{ borderRadius: "50%" }}>
            <i className="fas fa-times link-primary image-drop-icon"></i>
          </button>
        </div>
      )}

    </div>
  );
};


export default ImagePicker;

