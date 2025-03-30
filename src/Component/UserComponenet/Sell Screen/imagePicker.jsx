import React from "react";

const ImagePicker2 = ({ setImage, image, setValue, isRequired }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Update the image preview
      setValue(file); // Update the form value (if using a form library)
    }
  };

  const removeImage = () => {
    setImage(null); // Clear the image
    setValue("profilePicture", null); // Clear the form value (if using a form library)
  };

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      {!image ? (
        <label
          className="border border-secondary rounded d-flex justify-content-center align-items-center p-3"
          style={{ width: "100%", maxWidth: "150px", height: "150px", cursor: "pointer" }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
          <span className="fs-1 fw-bold">+</span>
        </label>
      ) : (
        <div className="position-relative">
          <img
            src={image}
            alt="Selected"
            className="rounded border border-secondary"
            style={{ width: "100%", maxWidth: "150px", height: "150px", objectFit: "cover" }}
          />
          <button
            className="btn btn-sm position-absolute btn-transparent top-0 end-0 m-1 p-1"
            onClick={removeImage}
            style={{ borderRadius: "50%" }}
          >
            <i className="fas fa-times link-primary image-drop-icon"></i>
          </button>
        </div>
      )}
      {isRequired && !image && (
        <p className="text-danger text-center"></p>
      )}
    </div>
  );
};

export default ImagePicker2;