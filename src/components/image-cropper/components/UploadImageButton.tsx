import React, { ChangeEventHandler, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { RiImageAddLine } from "react-icons/ri";

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 6,
  borderStyle: "dashed",
  borderColor: "var(--color-primary-light-blue)",
  backgroundColor: "var(--color-primary-dark-blue)",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "150px",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const UploadImageButton = ({ setUploadedImage }: any) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop(acceptedFiles) {
      const file = acceptedFiles[0];
      if (file) setUploadedImage(file);
    },
    multiple: false,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div className="container max-w-3xl">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="flex flex-col gap-1 items-center justify-center">
          <RiImageAddLine className="text-3xl" />
          <p>Drag & drop an image here, or click to browse</p>
          {isDragReject && (
            <p className="underline">Please upload one image.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImageButton;
