import { formInput } from "@/src/features/master-card/types/formTypes";
import React from "react";

type ClearFormButtonProps<T> = {
  setForm: React.Dispatch<React.SetStateAction<T>>;
  emptyState: T;
};

export const ClearFormButton = <T,>({setForm, emptyState}: ClearFormButtonProps<T>) => {
  return (
    <div>
      <button
        onClick={() => setForm(emptyState)}
        className="bg-gray-700 import-export-button hover:bg-red-800 transition"
      >
        CLEAR ALL
      </button>
    </div>
  );
};
