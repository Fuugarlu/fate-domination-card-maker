"use client";

import React, { useState } from "react";
import { Card } from "./Canvas";
import { ExportImportFeature } from "./components/buttons/ExportImportButtons";
import { MdTextDecrease, MdTextIncrease } from "react-icons/md";
import { ATTACK_TYPES } from "@/src/constants/servantConstants";
import {
  formInput,
  MAIN_CARD,
  MASTER_NAME_FIELD_SIZES,
} from "@/src/features/master-card/types/formTypes";
import { updateForm } from "@/src/utils/formUtils";
import "./styles/master-card-creation.scss";
import { ClearFormButton } from "../../components/header/ClearFormButton";
import { PageName } from "../../components/header/PageName";
import { DownloadButton } from "../../components/buttons/DownloadButton";
import ColorInput from "../master-assets/components/ColorInput";
import { Color } from "@/src/types/colorTypes";
import CardColorInput from "./components/form/CardColorInput";
import { CARD_COLORS } from "./constants/formConsts";
import { IMAGE_CROP_SETTINGS } from "@/src/constants/cropConstants";
import CardSettings from "./components/CardSettings";

const emptyState: formInput = {
  pic: null,
  masterName: "",
  masterNameColor: "#ffffff" as Color,
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
    { index: 0, cardType: "Strength", values: "", showIcon: true },
    { index: 1, cardType: "Agility", values: "", showIcon: true },
    { index: 2, cardType: "Magic", values: "", showIcon: true },
  ],
  servantCardsSpecialFontSize: 36,
  hasCardAbility: true,
  revealServantName: false,
  timesPerGame: null,
  masterNameFieldSize: MASTER_NAME_FIELD_SIZES.short,
  cardColorSettings: CARD_COLORS.default,
  cardToMake: MAIN_CARD.general,
};

const initialState = {
  ...emptyState,
  servantCards: [
    { index: 0, cardType: "Strength", values: "", showIcon: true },
    { index: 1, cardType: "Agility", values: "", showIcon: true },
    { index: 2, cardType: "Magic", values: "", showIcon: true },
  ],
  masterName: "Cool Card Name",
  masterAbility: `<p><span style="color: #ffffff; font-size: 30px; line-height: 1.1;"><em>Example</em> - Add some abilities!</span></p>
  <p><span style="color: #ffffff; font-size: 30px; line-height: 1.1;"><em>Other example</em> - <strong>Passive/Action:</strong> Pay 1 Mana to [do something].</span></p>`,
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

  const getEventOrObjectiveValue = (value: string): "X" | number | null => {
    if (value === "X") return "X";
    if (value === "") return null;

    const numberValue = Number(value);

    return numberValue >= 0 && numberValue <= 9 ? numberValue : null;
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
              <div className="input-block flex gap-2 flex-col">
                <span>
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
                        <div className="text-sm">
                          {form.masterNameFontSize}px
                        </div>
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
                </span>
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
                </span>
                <div>
                  <div>
                    <ColorInput
                      label={"Name Color"}
                      value={form.masterNameColor ?? emptyState.masterNameColor}
                      handleValue={(color: string) =>
                        setForm((prev) => ({
                          ...prev,
                          masterNameColor: color as Color,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col input-block">
                <label htmlFor="optionDropdown" className="field-header">
                  Card Type [General - Servant - Textless]
                </label>
                <select
                  id="optionDropdown"
                  name="optionDropdown"
                  value={form.cardToMake ?? MAIN_CARD.general}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      cardToMake: e.target.value as MAIN_CARD,
                    }));
                    console.log(form);
                  }}
                >
                  <option value={MAIN_CARD.general}>
                    General (attacks, masters...)
                  </option>
                  <option value={MAIN_CARD.servant}>Servant card</option>
                  <option value={MAIN_CARD.textless}>Textless card</option>
                </select>
              </div>

              <CardSettings
                cardType={form.cardToMake}
                form={form}
                setForm={setForm}
              />
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
                        getEventOrObjectiveValue(e.target.value),
                      )
                    }
                  >
                    <option value="">None</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                    <option key="X" value={"X"}>
                      X
                    </option>
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
                        getEventOrObjectiveValue(e.target.value),
                      )
                    }
                  >
                    <option value="">None</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                    <option key="X" value={"X"}>
                      X
                    </option>
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
                      Grayscale filter{" "}
                      <span className="tooltip">(includes card art)</span>
                    </div>
                  </div>
                  <CardColorInput form={form} setForm={setForm} />
                </div>
              </div>
            </div>
          </form>

          <div className="flex flex-row w-full gap-2">
              <DownloadButton
                idToSave={IMAGE_CROP_SETTINGS.CARD}
                name={form.masterName}
              />
            <ExportImportFeature form={form} setForm={setForm} exportOnly />
          </div>
        </div>

        <div className="xl:w-1/2">
          <Card form={form} isPreview={true} cardType={form.cardToMake} />
        </div>
        <Card form={form} isPreview={false} cardType={form.cardToMake} />
      </div>
    </div>
  );
};
