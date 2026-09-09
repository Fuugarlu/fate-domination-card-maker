import React, { useState } from "react";

type ClearFormButtonProps<T> = {
  setForm: React.Dispatch<React.SetStateAction<T>>;
  emptyState: T;
};

export const ClearFormButton = <T,>({
  setForm,
  emptyState,
}: ClearFormButtonProps<T>) => {
  const [confirmationMessage, setConfirmationMessage] =
    useState<boolean>(false);

  const handleButtonPress = () => {
    if (confirmationMessage == true) {
      setForm(emptyState);
      setConfirmationMessage(false);
    } else {
      setConfirmationMessage(true);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleButtonPress()}
        className="bg-gray-700 import-export-button hover:bg-red-800 transition"
      >
        {confirmationMessage ? "REALLY CLEAR?" : "CLEAR ALL"}
      </button>
    </div>
  );
};
