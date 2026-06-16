"use client";

import React, { useState } from "react";
import { Card } from "./Canvas";
import ImageCropper from "./ImageCropper";
import html2canvas from "html2canvas";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import { ExportImportFeature } from "./export/export";
import { MdTextDecrease, MdTextIncrease } from "react-icons/md";
import { ATTACK_TYPES, SERVANT_TYPES } from "@/src/constants/servantConstants";
import { servantCardType } from "@/src/types/servantTypes";
import { formInput } from "@/src/types/formTypes";
import { updateForm } from "@/src/utils/formUtils";
import { ServantAttackTypesInput } from "./FormComponents/ServantAttackTypesInput";
import "./master-card-creation.scss";

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
  servantCards: [] as servantCardType[] | null,
  servantCardsSpecialFontSize: 36,
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
  const [masterAbilityInput, setMasterAbilityInput] = useState<boolean>(true);

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

  const toggleMasterAbilityInput = (checkbox: boolean) => {
    setMasterAbilityInput(checkbox);
  };

  async function downloadCard() {
    const card = document.getElementById("card-to-save");
    if (!card) return;
    const canvas = await html2canvas(card, {
      width: 750,
      height: 1050,
      scale: 1,
      windowWidth: 750,
      windowHeight: 1050,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${form.masterName || "master-card"}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  return (
    <div className="flex-col w-full">
      <div className="flex flex-col xl:flex-row">
        <div className="xl:w-1/2 flex flex-col justify-between">
          {/* <ExportImportFeature /> */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start">
              <h2 className="category-header">MAIN</h2>
              {/* Name */}
              <div className="input-block">
                <label htmlFor="masterName" className="field-header">Card Name</label>
                <div className="flex flex-row align-center gap-3">
                  <input
                    type="text"
                    id="masterName"
                    name="masterName"
                    defaultValue={form.masterName}
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
                      className="w-9 h-9 flex items-center justify-center border border-black cursor-pointer text-xl bg-blue-900 rounded-l"
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
                      className="w-9 h-9 flex items-center justify-center border border-black cursor-pointer text-xl bg-blue-900 rounded-r"
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
                    type="checkbox"
                    checked={masterAbilityInput}
                    onChange={(e) => toggleMasterAbilityInput(e.target.checked)}
                  />
                  <span>Enable card ability</span>
                </label>

                {masterAbilityInput && (
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
                  <label className="field-header" htmlFor="eventMana">Event Mana</label>
                  <select
                    id="eventMana"
                    name="eventMana"
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
                  <label className="field-header" htmlFor="objective">Objective points</label>
                  <select
                    id="objective"
                    name="objective"
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
                    <label className="field-header" htmlFor="grayscaleFilter">Filters</label>
                    <div className="flex gap-1">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          mainUpdateForm("grayscaleFilter", e.target.checked)
                        }
                      />
                      Grayscale filter
                    </div>
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
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer mt-3 w-full"
          >
            Download Card
          </button>
        </div>

        <div className="xl:w-1/2">
          <Card
            {...form}
            name={form.masterName}
            nameFontSize={form.masterNameFontSize}
            ability={masterAbilityInput ? form.masterAbility : ""}
            isPreview={true}
          />
        </div>
        <Card
          {...form}
          name={form.masterName}
          nameFontSize={form.masterNameFontSize}
          ability={masterAbilityInput ? form.masterAbility : ""}
          isPreview={false}
        />
      </div>
    </div>
  );
};
