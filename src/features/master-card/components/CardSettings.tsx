import React from "react";
import { formInput, MAIN_CARD, mainCardType } from "../types/formTypes";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import ImageCropper from "@/src/components/image-cropper/ImageCropper";
import { IMAGE_CROP_SETTINGS } from "@/src/constants/cropConstants";
import { ServantAttackTypesInput } from "./form/ServantAttackTypesInput";

const CardSettings = ({
  form,
  setForm,
  cardType,
}: {
  form: formInput;
  setForm: React.Dispatch<React.SetStateAction<formInput>>;
  cardType: mainCardType;
}) => {
  return (
    <>
      <div className="input-block w-full">
        <div className="category-header">{cardType.toUpperCase()} CARD</div>
        {form.cardToMake === MAIN_CARD.general && (
          <>
            <h2 className="field-header">Card Ability</h2>

            <div className="input-block w-full">
              <RichTextEditor
                masterAbility={form.masterAbility}
                setMasterAbility={(abilityText) =>
                  setForm((prev) => ({ ...prev, masterAbility: abilityText }))
                }
              />
            </div>

            <div className="input-block w-full">
              <h2 className="category-header">ADDITIONAL ABILITY OPTIONS</h2>
              <label className="flex gap-1 items-center input-block">
                <input
                  id="hasCardAbility"
                  type="checkbox"
                  checked={form.revealServantName ?? false}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      revealServantName: e.target.checked,
                    }))
                  }
                />
                <span className="select-none font-semibold">
                  Reveal Servant Name
                </span>
              </label>
              <label className="block field-header">X Times Per Game</label>
              <select
                id="timesPerGame"
                name="timesPerGame"
                value={form.timesPerGame ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    timesPerGame: e.target.value
                      ? Number(e.target.value)
                      : null,
                  }))
                }
              >
                <option value={""}>No limit</option>
                {Array.from({ length: 5 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        {form.cardToMake === MAIN_CARD.servant && (
          <div className="input-block">
            <ServantAttackTypesInput form={form} setForm={setForm} />
          </div>
        )}
      </div>

      <div className="input-block w-full">
        <h2 className="field-header">Card Picture</h2>
        <ImageCropper
          setCroppedImage={(croppedPic) =>
            setForm((prev) => ({ ...prev, pic: croppedPic }))
          }
          cropSettings={cardType == MAIN_CARD.textless ? IMAGE_CROP_SETTINGS.TEXTLESS : IMAGE_CROP_SETTINGS.CARD}
        />
      </div>
    </>
  );
};

export default CardSettings;
