import React from "react";
import { ServantCardForm } from "../types/formTypes";
import { capitalizeString } from "@/src/utils/TextUtils";

type TraitsAndDrawbacksType = {
  traits: string[];
  drawbacks: string[];
  isTraits: boolean;
  setForm: React.Dispatch<React.SetStateAction<ServantCardForm>>;
};

const TraitsAndDrawbacks = ({
  traits,
  drawbacks,
  isTraits,
  setForm,
}: TraitsAndDrawbacksType) => {
  const list = isTraits ? traits : drawbacks;
  const key = isTraits ? "traits" : "drawbacks";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        {list.map((item, i) => (
          <div className="flex flex-row items-center gap-1" key={i}>
            <input
              type="text"
              placeholder={capitalizeString(key).slice(0, key.length - 1)}
              value={item}
              onChange={(e) =>
                setForm((prev) => {
                  const updated = [...list];
                  updated[i] = e.target.value;
                  return {
                    ...prev,
                    [key]: updated,
                  };
                })
              }
            />
            <div className="flex gap-1 items-center">
              <button
                className="bg-gray-700 rounded p-1 cursor-pointer"
                disabled={list.length == 1}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    [key]: list.filter((_, index) => i !== index),
                  }))
                }
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 rounded p-1 cursor-pointer w-[229px]"
        onClick={() =>
          setForm((prev) => ({
            ...prev,
            [key]: [...list, ""],
          }))
        }
      >
        ADD {key.toUpperCase()}
      </button>
    </div>
  );
};

export default TraitsAndDrawbacks;
