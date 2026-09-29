import { ALL_CARDS } from "@/src/constants/cardConstants";
import { capitalizeString } from "@/src/utils/TextUtils";
import React, { useState } from "react";
import { formInput } from "../../types/formTypes";

const BlackTextlessTypeOptions = ({
  setForm,
  form,
}: {
  setForm: React.Dispatch<React.SetStateAction<formInput>>;
  form: formInput;
}) => {
  function handleTypeChange(checkedType: string) {
    const newBlackTextlessTypes = {
      ...form.blackTextlessTypes,
      [checkedType]: !form.blackTextlessTypes[checkedType],
    };
    setForm((prev) => ({ ...prev, blackTextlessTypes: newBlackTextlessTypes }));
  }

  return (
    <>
      <div className="input-block flex flex-col items-start">
        <div className="flex gap-1">
          <label className="field-header" htmlFor="cardType">
            Card Type
          </label>
          <span>(next to card name)</span>
        </div>
        {ALL_CARDS.map((type, _) => (
          <div className="flex flex-row gap-1" key={type + "-textless-black"}>
            <input
              type="checkbox"
              value={type}
              onChange={() => handleTypeChange(type.toLowerCase().replaceAll(' ', ''))}
              checked={form.blackTextlessTypes[type.toLowerCase().replaceAll(' ', '')] ?? false}
            />
            {capitalizeString(type)}
          </div>
        ))}
      </div>
    </>
  );
};

export default BlackTextlessTypeOptions;
