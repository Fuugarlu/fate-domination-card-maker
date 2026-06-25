"use client";

import React, { useState } from "react";
import { Card } from "./Canvas";
import ImageCropper from "../../components/image-cropper/ImageCropper";
import RichTextEditor from "./components/RichTextEditor/RichTextEditor";
import { ExportImportFeature } from "./components/buttons/ExportImportButtons";
import { MdTextDecrease, MdTextIncrease } from "react-icons/md";
import { ATTACK_TYPES } from "@/src/constants/servantConstants";
import {
  formInput,
  MASTER_NAME_FIELD_SIZES,
} from "@/src/features/master-card/types/formTypes";
import { IMAGE_CROP_SETTINGS, updateForm } from "@/src/utils/formUtils";
import { ServantAttackTypesInput } from "./components/form/ServantAttackTypesInput";
import "./styles/master-card-creation.scss";
import { ClearFormButton } from "../../components/header/ClearFormButton";
import { PageName } from "../../components/header/PageName";
import { DownloadButton } from "../../components/buttons/DownloadButton";

const emptyState: formInput = {
  pic: null,
  masterName: "",
  masterNameFontSize: 50,
  objectiveValue: null,
  eventMana: null,
  cardAttack: null,
  cardMana: null,
  attackTypes: {
    strength: false,
    agility: false,
    magic: false,
    special: false,
    "noble phantasm": false,
  },
  masterAbility: "",
  grayscaleFilter: false,
  servantClass: null,
  servantCards: [
    { index: 0, cardType: "Strength", values: "", showIcon: false },
    { index: 1, cardType: "Agility", values: "", showIcon: false },
    { index: 2, cardType: "Magic", values: "", showIcon: false },
  ],
  servantCardsSpecialFontSize: 36,
  hasCardAbility: true,
  // enableCardColorHueInput: false,
  // cardColorHue: "0",
  masterNameFieldSize: MASTER_NAME_FIELD_SIZES.short,
};

const initialState = {
  ...emptyState,
  servantCards: [
    { index: 0, cardType: "Strength", values: "", showIcon: false },
    { index: 1, cardType: "Agility", values: "", showIcon: false },
    { index: 2, cardType: "Magic", values: "", showIcon: false },
  ],
  masterName: "Cool Card Name",
  masterAbility: `<p><span style="color: #ffffff; font-size: 30px; line-height: 1.1;"><em>Example</em> - Add some abilities!</span></p>
  <p><span style="color: #ffffff; font-size: 30px; line-height: 1.1;"><em>Other example</em> - <strong>Passive/Combat:</strong> Pay 1 Mana to [cry on command].</span></p>`,
};

export const MasterCardCreation = () => {
  const [form, setForm] = useState<formInput>(initialState);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const mainUpdateForm = <K extends keyof formInput>(
    key: K,
    value: formInput[K] | ((prev: formInput[K]) => formInput[K]),
  ) => {
    updateForm(key, value, setForm);
  };

  const handleAttackTypeChange = (index: string) => {
    mainUpdateForm("attackTypes", {
      ...form.attackTypes,
      [index]: !form.attackTypes[index],
    });
  };

  return (
    <div className="flex-col w-full flex">
      <div className="flex flex-col xl:flex-row">
        <div className="xl:w-1/2 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <PageName />
            <span className="flex gap-2">
              <ClearFormButton setForm={setForm} emptyState={emptyState} />
              <ExportImportFeature form={form} setForm={setForm} />
            </span>
          </div>
          <hr className="my-3" />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start">
              <h2 className="category-header">MAIN</h2>
              {/* Name */}
              <div className="input-block">
                <label htmlFor="masterName" className="field-header">
                  Card Name
                </label>
                <div className="flex flex-row align-center gap-3">
                  <input
                    type="text"
                    id="masterName"
                    name="masterName"
                    value={form.masterName ?? ""}
                    onChange={(e) =>
                      mainUpdateForm("masterName", e.target.value)
                    }
                  />
                  {/* Name Font Size */}
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        mainUpdateForm(
                          "masterNameFontSize",
                          form.masterNameFontSize - 2,
                        )
                      }
                      className="w-9 h-9 flex items-center justify-center border border-black cursor-pointer text-xl bg-blue-900 hover:bg-blue-700 rounded-l"
                      title="Decrease font"
                    >
                      <MdTextDecrease />
                    </button>

                    <div
                      className="w-11 h-9 flex items-center justify-center border border-black bg-blue-500 text-center"
                      style={{ marginLeft: -1 }}
                    >
                      <div className="text-sm">{form.masterNameFontSize}px</div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        mainUpdateForm(
                          "masterNameFontSize",
                          form.masterNameFontSize + 2,
                        )
                      }
                      className="w-9 h-9 flex items-center justify-center border border-black cursor-pointer text-xl bg-blue-900 hover:bg-blue-700 rounded-r"
                      title="Increase font"
                      style={{ marginLeft: -1 }}
                    >
                      <MdTextIncrease />
                    </button>
                  </div>
                </div>
                <div className="input-block">
                  <h2 className="field-header">Name Length</h2>
                  <div className="flex gap-2">
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        id="short-name"
                        name="masterName"
                        value="short-name"
                        checked={
                          form.masterNameFieldSize ==
                            MASTER_NAME_FIELD_SIZES.short || false
                        }
                        onChange={(e) =>
                          e.target.checked &&
                          mainUpdateForm(
                            "masterNameFieldSize",
                            MASTER_NAME_FIELD_SIZES.short,
                          )
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
                          form.masterNameFieldSize ==
                            MASTER_NAME_FIELD_SIZES.medium || false
                        }
                        onChange={(e) =>
                          e.target.checked &&
                          mainUpdateForm(
                            "masterNameFieldSize",
                            MASTER_NAME_FIELD_SIZES.medium,
                          )
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
                        checked={
                          form.masterNameFieldSize ==
                            MASTER_NAME_FIELD_SIZES.long || false
                        }
                        onChange={(e) =>
                          e.target.checked &&
                          mainUpdateForm(
                            "masterNameFieldSize",
                            MASTER_NAME_FIELD_SIZES.long,
                          )
                        }
                      />
                      <label htmlFor="long-name">Long</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="input-block w-full">
                <h2 className="field-header">Card Ability</h2>
                <label className="flex gap-1 items-center">
                  <input
                    id="hasCardAbility"
                    type="checkbox"
                    checked={form.hasCardAbility}
                    onChange={(e) =>
                      mainUpdateForm("hasCardAbility", e.target.checked)
                    }
                  />
                  <span className="select-none">Enable card ability</span>
                </label>

                {form.hasCardAbility && (
                  <RichTextEditor
                    masterAbility={form.masterAbility}
                    setMasterAbility={(abilityText) =>
                      mainUpdateForm("masterAbility", abilityText)
                    }
                  />
                )}
              </div>

              <div className="input-block w-full">
                <h2 className="field-header">Card Picture</h2>
                <ImageCropper
                  croppedImage={form.pic}
                  setCroppedImage={(croppedPic) =>
                    setForm((prev) => ({ ...prev, pic: croppedPic }))
                  }
                  cropSettings={IMAGE_CROP_SETTINGS.CARD}
                />
              </div>
            </div>

            {/* Everything Else */}
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <span className="category-header">Mana & Attack</span>
                {/* Mana */}
                <div className="flex flex-col items-start input-block">
                  <label htmlFor="manaInput" className="field-header">
                    Mana
                  </label>
                  <input
                    id="manaInput"
                    name="manaInput"
                    type="text"
                    maxLength={2}
                    value={form.cardMana ?? ""}
                    placeholder={"Blank, X, or 1-2 digits"}
                    onChange={(e) =>
                      mainUpdateForm(
                        "cardMana",
                        e.target.value.toUpperCase() || null,
                      )
                    }
                  />
                </div>
                {/* Attack */}
                <div className="flex flex-col items-start input-block">
                  <label htmlFor="attackInput" className="field-header">
                    Attack
                  </label>
                  <input
                    id="attackInput"
                    name="attackInput"
                    type="text"
                    maxLength={2}
                    value={form.cardAttack ?? ""}
                    placeholder={"Blank, X, or 1-2 digits"}
                    onChange={(e) =>
                      mainUpdateForm(
                        "cardAttack",
                        e.target.value.toUpperCase() || null,
                      )
                    }
                  />
                </div>
                {/* Attack Types (top left) */}
                <div className="flex flex-col input-block">
                  <h2 className="category-header">Attack Types</h2>
                  {ATTACK_TYPES.map((type, i) => (
                    <label key={i} className="flex gap-1">
                      <input
                        id={"attackType" + i}
                        type="checkbox"
                        checked={form.attackTypes[type.toLowerCase()] ?? false}
                        onChange={() =>
                          handleAttackTypeChange(type.toLowerCase())
                        }
                      />
                      {ATTACK_TYPES[i]}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="category-header">EVENTS & OBJECTIVES</span>
                <div className="input-block flex flex-col items-start">
                  <label className="field-header" htmlFor="eventMana">
                    Event Mana
                  </label>
                  <select
                    id="eventMana"
                    name="eventMana"
                    value={form.eventMana ?? ""}
                    onChange={(e) =>
                      mainUpdateForm(
                        "eventMana",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                  >
                    <option value="">None</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-block flex flex-col items-start">
                  <label className="field-header" htmlFor="objective">
                    Objective points
                  </label>
                  <select
                    id="objective"
                    name="objective"
                    value={form.objectiveValue ?? ""}
                    onChange={(e) =>
                      mainUpdateForm(
                        "objectiveValue",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                  >
                    <option value="">None</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="category-header">MISC OPTIONS</span>
                  <div className="input-block">
                    <label className="field-header" htmlFor="grayscaleFilter">
                      Filters
                    </label>
                    <div className="flex gap-1">
                      <input
                        checked={form.grayscaleFilter ?? ""}
                        type="checkbox"
                        onChange={(e) =>
                          mainUpdateForm("grayscaleFilter", e.target.checked)
                        }
                      />
                      Grayscale filter
                    </div>

                    {/* <label className="field-header" htmlFor="hueSlider">
                      Card Color
                    </label>
                    <div className="flex gap-1">
                      <input
                        checked={form.enableCardColorHueInput ?? ""}
                        type="checkbox"
                        onChange={(e) =>
                          mainUpdateForm(
                            "enableCardColorHueInput",
                            e.target.checked,
                          )
                        }
                      />
                      <label htmlFor="enableHueSlider">Enable hue slider</label>
                    </div>
                    {form.enableCardColorHueInput && (
                      <div className="color-picker-container flex items-center gap-1">
                        <input
                          type="range"
                          id="hueSlider"
                          min="0"
                          max="360"
                          value={form.cardColorHue ?? "0"}
                          onChange={(e) =>
                            mainUpdateForm("cardColorHue", e.target.value)
                          }
                        />
                        <input
                          type="text"
                          style={{ width: "100%" }}
                          maxLength={3}
                          placeholder={form.cardColorHue}
                          value={form.cardColorHue ?? "0"}
                          onChange={(e) =>
                            mainUpdateForm("cardColorHue", e.target.value)
                          }
                        />
                        <span>&#176;</span>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
            {/* Servant Options */}
            <div className="input-block">
              <ServantAttackTypesInput form={form} setForm={setForm} />
            </div>
          </form>

          <DownloadButton
            idToSave={IMAGE_CROP_SETTINGS.CARD}
            name={form.masterName}
          />
        </div>

        <div className="xl:w-1/2">
          <Card form={form} isPreview={true} />
        </div>
        <Card form={form} isPreview={false} />
      </div>
    </div>
  );
};
