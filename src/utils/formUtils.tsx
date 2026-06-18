import { formInput } from "../types/formTypes";

export const updateForm = <K extends keyof formInput>(
    key: K,
    value:
      | (formInput)[K]
      | ((prev: (formInput)[K]) => (formInput)[K]),
    setForm: React.Dispatch<React.SetStateAction<formInput>>
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]:
        typeof value === "function"
          ? (value as (p: formInput[K]) => formInput[K])(prev[key])
          : value,
    }));
  };

  
export const enum IMAGE_CROP_SETTINGS {
  CARD = "card",
  TOKEN = "token",
  STANDEE = "standee",
  MASTER_BOX = "master-box",
}