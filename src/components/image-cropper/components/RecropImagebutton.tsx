import React from "react";
import "../styles/image-cropper.css";

const RecropImagebutton = ({ croppedImage, recropImage }: { croppedImage: string; recropImage: () => void }) => {
  return (
    <div>
      <button className="recrop-button bg-blue-500 hover:bg-blue-400" onClick={recropImage}>
        Recrop Image
      <img
        src={croppedImage}
        alt="Cropped"
        className="w-8 object-cover rounded-md"
      />
      </button>
    </div>
  );
};

export default RecropImagebutton;
