"use client";

import React, { useState } from "react";
import { Card } from "./Canvas";
import ImageCropper from "./ImageCropper";
import html2canvas from "html2canvas-pro";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import { ExportImportFeature } from "./export/export";
import { MdTextDecrease, MdTextIncrease } from "react-icons/md";
import { ATTACK_TYPES, SERVANT_TYPES } from "@/src/constants/servantConstants";
import { servantCardType } from "@/src/types/servantTypes";
import { formInput } from "@/src/types/formTypes";
import { updateForm } from "@/src/utils/formUtils";
import { ServantAttackTypesInput } from "./FormComponents/ServantAttackTypesInput";
import "./master-card-creation.scss";
import { snapdom } from "@zumer/snapdom";

const emptyState = {
  pic: null as string | null,
  masterName: "",
  masterNameFontSize: 50,
  objectiveValue: null as number | null,
  eventMana: null as number | null,
  cardAttack: null as string | null,
  cardMana: null as string | null,
  attackTypes: [false, false, false, false, false],
  masterAbility: "",
  grayscaleFilter: false,
  servantClass: null as string | null,
  servantCards: [
    { index: 0, cardType: "Strength", values: "", showIcon: false },
    { index: 1, cardType: "Agility", values: "", showIcon: false },
    { index: 2, cardType: "Magic", values: "", showIcon: false },
  ] as servantCardType[] | null,
  servantCardsSpecialFontSize: 36,
  hasCardAbility: true,
  enableCardColorHueInput: false,
  cardColorHue: "0",
};

const initialState = {
  ...emptyState,
  servantCards: [
    { index: 0, cardType: "Strength", values: "", showIcon: false },
    { index: 1, cardType: "Agility", values: "", showIcon: false },
    { index: 2, cardType: "Magic", values: "", showIcon: false },
  ] as servantCardType[],
  // servantCards: [["0", ""], ["1", ""], ["2", "2,2,3,3"], ["0", "Saber Install"], ["0", "Berserker Install"], ["1", "Archer Install"], ["1", "Assassin Install"], ["1", "Lancer Install"], ["2", "Caster Install"], ["3", "Rider Install"], ["3", "Luck"]],
  // servantCards: [["0", ""], ["1", ""], ["2", "2,2,3,3"], ["3", "Avenger Class"],["3", "Avenger Class"],["3", "Avenger Class"],["3", "Avenger Class"],["3", "Avenger Class"],["3", "Avenger Class"],],
  // servantCards: [["0", "0"], ["1", "0"], ["2", "0,2,3,3"], ["3", "Surveil"],["3", "Surveil"],["3", "Surveil"],],
  masterName: "Fuugarlu",
  // masterAbility: emptyState.masterAbility,
  masterAbility: `<p><span style="font-size: 30px; line-height: 1.1;"><em>Example</em> - Add some abilities!</span></p>
  <p><span style="font-size: 30px; line-height: 1.1;"><em>Other example</em> - <strong>Passive/Combat:</strong> Pay 1 Mana to [cry on command].</span></p>`,
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

  const handleAttackTypeChange = (index: number) => {
    mainUpdateForm(
      "attackTypes",
      form.attackTypes.map((val, i) => (i === index ? !val : val)),
    );
  };

async function downloadCard() {
  const card = document.getElementById("card-to-save");

  if (!card) return;

  const result = await snapdom(card);

  await result.download({
    format: "png",
    filename: `${form.masterName || "master-card"}.png`,
  });
}
  return (
    <div className="flex-col w-full">
      <div className="flex flex-col xl:flex-row">
        <div className="xl:w-1/2 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <h1 className="text-xl font-semibold">
              Fate/Domination Card Maker
            </h1>
            <span className="flex gap-2">
              <button
                onClick={() => setForm(emptyState)}
                className="bg-gray-700 import-export-button hover:bg-red-800 transition"
              >
                CLEAR ALL
              </button>
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
                  <span>Enable card ability</span>
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
                    mainUpdateForm("pic", croppedPic)
                  }
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
                  {form.attackTypes.map((isChecked, i) => (
                    <label key={i} className="flex gap-1">
                      <input
                        id={"attackType" + i}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleAttackTypeChange(i)}
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

                    <label className="field-header" htmlFor="hueSlider">
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
                        {/* <span>{form.cardColorHue}&#176;</span> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Servant Options */}
            <div className="input-block">
              <ServantAttackTypesInput form={form} setForm={setForm} />
            </div>
          </form>

          <button
            onClick={() => downloadCard()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded cursor-pointer mt-3 w-full"
          >
            Download Card
          </button>
        </div>

        <div className="xl:w-1/2">
          <Card form={form} isPreview={true} />
        </div>
        <Card form={form} isPreview={false} />
      </div>
    </div>
  );
};
