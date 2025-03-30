import React, { useState } from "react";

const ImageUploader = ({ onImageSelect, register, errors, setValue }) => {
  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setValue("profileImage", file);
      //
    }
  };


  return (
    <div className="image-uploader mb-3 text-center">
      {/* Image Input */}
      <label className="login-input">
        Upload Profile Image
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="d-none"
          {...register("profileImage", {
            required: "Profile image is required",
          })}
        />
      </label>

      {errors.profileImage && (
        <p className="link-primary">{errors.profileImage.message}</p>
      )}

      {/* Show Selected Image */}

      {selectedImage && (
        <div className="image-preview mt-3">
          <img src={selectedImage} alt="Selected" className="rounded-circle img-thumbnail" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
