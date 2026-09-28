import { NAME_FIELD_SIZES } from "@/src/constants/formConstants";
import React from "react";

const NameLength = ({nameFieldSize, updateForm}: { nameFieldSize: string; updateForm: (value: NAME_FIELD_SIZES) => void }) => {
  return (
    <span>
      <h2 className="field-header">Name Length</h2>
      <div className="flex gap-2">
        <div className="flex gap-1">
          <input
            type="radio"
            id="short-name"
            name="masterName"
            value="short-name"
            checked={
              nameFieldSize == NAME_FIELD_SIZES.short || false
            }
            onChange={(e) =>
              e.target.checked &&
              updateForm(NAME_FIELD_SIZES.short)
            }
          />
          <label htmlFor="short-name">Short</label>
        </div>

        <div className="flex gap-1">
          <input
            type="radio"
            id="medium-name"
            name="masterName"
            value="medium-name"
            checked={
              nameFieldSize == NAME_FIELD_SIZES.medium || false
            }
            onChange={(e) =>
              e.target.checked &&
              updateForm(NAME_FIELD_SIZES.medium)
            }
          />
          <label htmlFor="medium-name">Medium</label>
        </div>

        <div className="flex gap-1">
          <input
            type="radio"
            id="long-name"
            name="masterName"
            value="long-name"
            checked={nameFieldSize == NAME_FIELD_SIZES.long || false}
            onChange={(e) =>
              e.target.checked &&
              updateForm(NAME_FIELD_SIZES.long)
            }
          />
          <label htmlFor="long-name">Long</label>
        </div>
      </div>
    </span>
  );
};

export default NameLength;
