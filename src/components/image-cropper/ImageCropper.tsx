"use client";
import React, { useState } from "react";

import Cropper, { Area, Point } from "react-easy-crop";
import { getCroppedImg } from "../../features/master-card/CanvasUtils";
import UploadImageButton from "./components/UploadImageButton";
import {
  IMAGE_CROP_SETTINGS,
  IMAGE_CROP_VALUES,
} from "@/src/constants/cropConstants";
import RecropImagebutton from "./components/RecropImagebutton";

type cropInfoType = {
  imageSrc: string;
  crop: Point;
  zoom: number;
  allowZoomingOut: boolean;
};

const DEFAULT_CROP_INFO = {
  imageSrc: "",
  crop: { x: 0, y: 0 },
  zoom: 1,
  allowZoomingOut: false,
};

const ImageCropper = ({
  setCroppedImageForForm,
  cropSettings,
}: {
  setCroppedImageForForm: (value: string | null) => void;
  cropSettings: IMAGE_CROP_SETTINGS;
}) => {
  const [cropperVisible, setCropperVisible] = useState<boolean>(true);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const [oldCropInfo, setOldCropInfo] = useState<cropInfoType>(DEFAULT_CROP_INFO);
  const [cropInfo, setCropInfo] = useState<cropInfoType>(DEFAULT_CROP_INFO);

  const cropShape = getCropShape(cropSettings);
  const cropAspectRatio = getCropAspectRatio(cropSettings);

  function handleAllowZoomingOut(allow: boolean) {
    setCropInfo({ ...cropInfo, allowZoomingOut: allow });
    if (!allow) {
      setCropInfo({ ...cropInfo, zoom: 1 });
      if (cropInfo.zoom < 1) {
        setCropInfo({ ...cropInfo, crop: { x: 0, y: 0 } });
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
    const { width, height } = IMAGE_CROP_VALUES[cropSettings].dimensions;
    return width / height;
  }

  function handleNewImage(croppedImage: string | null) {
    setCroppedImage(croppedImage);
    setCroppedImageForForm(croppedImage);
  }

  const showCroppedImage = async () => {
    try {
      if (!cropInfo.imageSrc || !croppedAreaPixels) return;
      const croppedImage = await getCroppedImg(
        cropInfo.imageSrc,
        croppedAreaPixels,
      );
      handleNewImage(croppedImage);
      cancelCropper();
    } catch (e) {
      console.error(e);
    }
  };

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
    const imageDataUrl = await readFile(file);
    setCropperVisible(true);
    setCropInfo({ ...cropInfo, imageSrc: imageDataUrl as string });
  }

  function cancelCropper() {
    setCropperVisible(false);
    setOldCropInfo(cropInfo);
    setCropInfo(DEFAULT_CROP_INFO);
  }

  function recropImage() {
    setCropperVisible(true);
    setCropInfo(oldCropInfo);
  }

  return (
    <div className="ImageCropper">
      {cropInfo.imageSrc && cropperVisible ? (
        <div className="flex flex-col gap-2">
          <div className="relative h-[500px]">
            <div className="crop-container">
              <Cropper
                image={cropInfo.imageSrc}
                crop={cropInfo.crop}
                zoom={cropInfo.zoom}
                zoomWithScroll={false}
                cropShape={cropShape}
                aspect={cropAspectRatio}
                onCropChange={(cropAmnt) => setCropInfo({...cropInfo, crop: cropAmnt})}
                onCropComplete={onCropComplete}
                onZoomChange={(zoomAmnt) => setCropInfo({...cropInfo, zoom: zoomAmnt})}
                showGrid={true}
                restrictPosition={!cropInfo.allowZoomingOut}
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
                  min={cropInfo.allowZoomingOut ? 0.5 : 1}
                  max={3}
                  step={0.02}
                  value={cropInfo.zoom}
                  aria-labelledby="Zoom"
                  onChange={(e) => setCropInfo({...cropInfo, zoom: Number(e.target.value)})}
                />
                {Math.round((cropInfo.zoom - 1) * (100 - 0)) / (3 - 1)}%
                <button
                  onClick={() => setCropInfo({...cropInfo, zoom: 1})}
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
                  checked={cropInfo.allowZoomingOut}
                  onChange={(e) => handleAllowZoomingOut(e.target.checked)}
                />
                <label htmlFor="allow-zooming-out">
                  Allow zooming out & disable image fit
                </label>
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
        <div className="flex flex-col gap-2">
          <UploadImageButton
            setUploadedImage={handleUploadedImage}
            dimensions={IMAGE_CROP_VALUES[cropSettings].dimensions}
          />
          {croppedImage && (
            <RecropImagebutton
              croppedImage={croppedImage}
              recropImage={recropImage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
