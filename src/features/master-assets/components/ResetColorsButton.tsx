import React, { useState } from "react";

const ResetColorsButton = ({
  hasNoNewColors,
  resetColors,
}: {
  hasNoNewColors: boolean;
  resetColors: () => void;
}) => {
  const [confirmResetColors, setConfirmResetColors] = useState(false);

  function confirmResetPresetColors() {
    if (confirmResetColors) {
      resetColors();
      setConfirmResetColors(false);
    } else {
      setConfirmResetColors(true);
    }
  }
  return (
    <>
      {!confirmResetColors && (
        <button
          className={`p-1 w-full bg-gray-300 rounded flex flex-grow justify-center ${hasNoNewColors ? "opacity-50" : "cursor-pointer"}`}
          onClick={() => confirmResetPresetColors()}
          disabled={hasNoNewColors}
        >
          Reset Colors
        </button>
      )}
      {confirmResetColors && (
        <div>
          <span className="italic text-xs flex flex-col justify-center text-center">
            <span>Are you sure you want to</span>
            <span>reset your saved colors?</span>
          </span>
          <div className="flex gap-1">
            <button
              className={`p-1 bg-red-400 rounded flex flex-grow justify-center ${hasNoNewColors ? "opacity-50" : "cursor-pointer"}`}
              onClick={() => confirmResetPresetColors()}
              disabled={hasNoNewColors}
            >
              Reset!
            </button>
            <button
              className={`p-1 bg-blue-400 rounded flex flex-grow justify-center ${hasNoNewColors ? "opacity-50" : "cursor-pointer"}`}
              onClick={() => setConfirmResetColors(false)}
              disabled={hasNoNewColors}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetColorsButton;
