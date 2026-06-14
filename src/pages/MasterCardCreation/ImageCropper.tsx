"use client";
import React, { useEffect, useState } from "react";

import Cropper, { Area, Point } from "react-easy-crop";
import { getCroppedImg } from "./CanvasUtils";

const ImageCropper = ({
  croppedImage,
  setCroppedImage,
}: {
  croppedImage: string | null;
  setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [cropperVisible, setCropperVisible] = useState<boolean>(true);

  const showCroppedImage = async () => {
    console.log("button clicked");
    console.log({ imageSrc });
    console.log({ croppedAreaPixels });
    try {
      if (!imageSrc || !croppedAreaPixels) return;
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      // setZoom(1);
      // setCropperVisible(false);
      cancelCropper();
    } catch (e) {
      console.error(e);
    }
    // TODO: Resize to the correct size here, currently it just crops the image but doesn't resize it to the correct size for the card
  };

  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
    console.log("crop Complete", croppedArea, croppedAreaPixels);
  };

  function readFile(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setCropperVisible(true);
      setImageSrc(imageDataUrl as string);
    }
  };

  function cancelCropper() {
    setCropperVisible(false);
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }

  return (
    <div className="ImageCropper w-full">
      {imageSrc && cropperVisible ? (
        <div className="flex flex-col gap-2">
          <div className="relative w-full h-[500px]">
            <div className="crop-container">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={7 / 8}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                showGrid={true}
              />
            </div>
          </div>
          <div className="flex justify-between">
              <div className="flex items-center gap-2">
                Zoom
                <input
                  type="range"
                  id="cowbell"
                  name="cowbell"
                  min={1}
                  max={3}
                  step={0.1}
                  defaultValue={1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className=""
                />
              {Math.round((zoom - 1) * (100 - 0)) / (3 - 1)}%
              </div>

              <div className="flex gap-2">
                <button onClick={() => cancelCropper()} className="px-6 py-2 bg-gray-500 text-white rounded cursor-pointer">
                  Cancel
                </button>{" "}
                <button onClick={showCroppedImage} className="px-6 py-2 bg-blue-500 text-white rounded cursor-pointer">
                  Confirm
                </button>{" "}
              </div>
            </div>
        </div>
      ) : (
        <div>
          <label
            htmlFor="image-upload"
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            <input
              type="file"
              id="image-upload"
              onChange={onFileChange}
              accept="image/*"
              className="hidden"
            />
            Upload Image
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
