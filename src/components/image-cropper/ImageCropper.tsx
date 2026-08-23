"use client";
import React, { useEffect, useState } from "react";

import Cropper, { Area, Point } from "react-easy-crop";
import { getCroppedImg } from "../../features/master-card/CanvasUtils";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";
import UploadImageButton from "./components/UploadImageButton";

const ImageCropper = ({
  croppedImage,
  setCroppedImage,
  cropSettings,
}: {
  croppedImage: string | null;
  setCroppedImage: (value: string | null) => void;
  cropSettings: IMAGE_CROP_SETTINGS;
}) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [cropperVisible, setCropperVisible] = useState<boolean>(true);
  const [allowZoomingOut, setAllowZoomingOut] = useState<boolean>(false);

  function handleAllowZoomingOut(allow: boolean) {
    setAllowZoomingOut(allow);
    if (!allow) {
      setZoom(1);
      if (zoom < 1) {
        setCrop({ x: 0, y: 0 });
      }
    }
  }

  function getCropShape(cropSettings: IMAGE_CROP_SETTINGS): "rect" | "round" {
    if ([IMAGE_CROP_SETTINGS.TOKEN].includes(cropSettings)) {
      return "round";
    } else {
      return "rect";
    }
  }

  function getCropAspectRatio(cropSettings: IMAGE_CROP_SETTINGS): number {
    switch (cropSettings) {
      case IMAGE_CROP_SETTINGS.CARD:
      case IMAGE_CROP_SETTINGS.COMMAND_SEAL:
        return 7 / 8;

      case IMAGE_CROP_SETTINGS.STANDEE:
        return 876 / 1433;

      case IMAGE_CROP_SETTINGS.MASTER_BOX:
        return 1.3;

      case IMAGE_CROP_SETTINGS.SERVANT_SUMMON:
        return 700 / 830;

      default: // Token
        return 1;
    }
  }

  const cropShape = getCropShape(cropSettings);
  const cropAspectRatio = getCropAspectRatio(cropSettings);

  const showCroppedImage = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      cancelCropper();
    } catch (e) {
      console.error(e);
    }
  };

  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  function readFile(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  async function handleUploadedImage(file: File) {
    let imageDataUrl = await readFile(file);
    setCropperVisible(true);
    setImageSrc(imageDataUrl as string);
  }

  function cancelCropper() {
    setCropperVisible(false);
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAllowZoomingOut(false);
  }

  return (
    <div className="ImageCropper">
      {imageSrc && cropperVisible ? (
        <div className="flex flex-col gap-2">
          <div className="relative h-[500px]">
            <div className="crop-container">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                zoomWithScroll={false}
                cropShape={cropShape}
                aspect={cropAspectRatio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                showGrid={true}
                restrictPosition={!allowZoomingOut}
              />
            </div>
          </div>
          <div className="flex justify-between xl:flex-col 2xl:flex-row">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                Zoom
                <input
                  type="range"
                  id="cowbell"
                  name="cowbell"
                  min={allowZoomingOut ? 0.5 : 1}
                  max={3}
                  step={0.02}
                  value={zoom}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                />
                {Math.round((zoom - 1) * (100 - 0)) / (3 - 1)}%
                <button
                  onClick={() => setZoom(1)}
                  className="cropper-button bg-gray-500"
                  style={{ height: "2rem" }}
                >
                  Reset Zoom
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="allow-zooming-out"
                  name="allow-zooming-out"
                  checked={allowZoomingOut}
                  onChange={(e) => handleAllowZoomingOut(e.target.checked)}
                />
                <label htmlFor="allow-zooming-out">Allow zooming out & disable image fit</label>
              </div>
            </div>

            <div className="flex gap-2 self-end">
              <button
                onClick={() => cancelCropper()}
                className="cropper-button bg-gray-500"
              >
                Cancel
              </button>{" "}
              <button
                onClick={showCroppedImage}
                className="cropper-button bg-blue-500 hover:bg-blue-400"
              >
                Confirm
              </button>{" "}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <UploadImageButton setUploadedImage={handleUploadedImage} />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
