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

// type servantCardType = [
//   number,
//   attackTypesType,
//   string | null,
//   boolean
// ]

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
};

const initialState = {
  ...emptyState,
  servantCards: [
    { index: 0, cardType: "Strength", values: "", showIcon: true },
    { index: 1, cardType: "Agility", values: "", showIcon: true },
    { index: 2, cardType: "Magic", values: "", showIcon: true },
  ] as servantCardType[],
  // servantCards: [["0", ""], ["1", ""], ["2", "2,2,3,3"], ["0", "Saber Install"], ["0", "Berserker Install"], ["1", "Archer Install"], ["1", "Assassin Install"], ["1", "Lancer Install"], ["2", "Caster Install"], ["3", "Rider Install"], ["3", "Luck"]],
  // servantCards: [["0", ""], ["1", ""], ["2", "2,2,3,3"], ["3", "Avenger Class"],["3", "Avenger Class"],["3", "Avenger Class"],["3", "Avenger Class"],["3", "Avenger Class"],["3", "Avenger Class"],],
  // servantCards: [["0", "0"], ["1", "0"], ["2", "0,2,3,3"], ["3", "Surveil"],["3", "Surveil"],["3", "Surveil"],],
  masterName: "Original Character",
  masterAbility: emptyState.masterAbility,
  // masterAbility: `<p><span style="font-size: 30px; line-height: 1.1;"><em>Example</em> - Add some abilities!</span></p>
  // <p><span style="font-size: 30px; line-height: 1.1;"><em>Other example</em> - <strong>Passive/Combat:</strong> Pay 1 Mana to [cry on command].</span></p>`,
};

export const MasterCardCreation = () => {
  const [form, setForm] = useState(initialState);

  function addOrChangeServantAttack(
    attackIndex: number,
    attackType: string,
    attackValues: string,
  ) {
    setForm((prev) => {
      const servantCards = prev.servantCards ? [...prev.servantCards] : [];

      const existingIndex = servantCards.findIndex(
        (card) => card.index === attackIndex,
      );

      const newCard = {
        index: attackIndex,
        cardType: attackType,
        values: attackValues,
        showIcon: true,
      };

      if (existingIndex === -1) {
        servantCards.push(newCard);
      } else {
        servantCards[existingIndex] = newCard;
      }

      return {
        ...prev,
        servantCards,
      };
    });
  }

  function deleteServantAttack(attackIndex: number) {
    setForm((prev) => {
      const servantCards = prev.servantCards ? [...prev.servantCards] : [];

      const existingIndex = servantCards.findIndex(
        (card) => card.index === attackIndex,
      );

      if (existingIndex !== -1) {
        servantCards.splice(existingIndex, 1);
      }

      return {
        ...prev,
        servantCards,
      };
    });
  }

  function toggleHideServantAttack(attackIndex: number) {
    setForm((prev) => {
      const servantCards = prev.servantCards ? [...prev.servantCards] : [];

      const existingIndex = servantCards.findIndex(
        (card) => card.index === attackIndex,
      );

      if (existingIndex === -1) return prev;

      servantCards[existingIndex] = {
        ...servantCards[existingIndex],
        showIcon: !servantCards[existingIndex].showIcon,
      };

      return {
        ...prev,
        servantCards,
      };
    });
  }
  // const [specialForms, setSpecialForms] = useState<string[][]>([]);

  // const addSpecialForm = () => {
  //   setSpecialForms((prev) => [
  //     ...prev,
  //     [
  //       "3",
  //       "",
  //       ["Luck", "Surveil", "Preparation"][Math.floor(Math.random() * 3)],
  //     ],
  //   ]);
  // };

  // const deleteSpecialForm = (index: number) => {
  //   setSpecialForms((prev) => prev.filter((_, i) => i !== index));
  // };

  // const addServantCard = (type: string) => {
  //   if (form.servantCards) {
  //     updateForm("servantCards", [...form.servantCards, [type, ""]]);
  //   }
  // };

  // const updateServantCard = (index: number, value: string) => {
  //   if (form.servantCards) {
  //     updateForm(
  //       "servantCards",
  //       form.servantCards.map((card, i) =>
  //         i === index ? [card[0], value] : card,
  //       ),
  //     );
  //   }
  // };

  const deleteServantcard = (index: number) => {
    if (form.servantCards) {
      updateForm(
        "servantCards",
        form.servantCards.filter((_, i) => i !== index),
      );
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const updateForm = <K extends keyof typeof initialState>(
    key: K,
    value:
      | (typeof initialState)[K]
      | ((prev: (typeof initialState)[K]) => (typeof initialState)[K]),
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]:
        typeof value === "function"
          ? (value as (p: any) => any)(prev[key])
          : value,
    }));
  };

  // const cardProps = {
  //   pic: form.pic,
  //   name: form.masterName,
  //   nameFontSize: form.masterNameFontSize,
  //   ability: form.masterAbility,
  //   objectiveValue: form.objectiveValue,
  //   eventMana: form.eventMana,
  //   cardAttack: form.cardAttack,
  //   cardMana: form.cardMana,
  //   attackTypes: form.attackTypes,
  //   servantCards: form.servantCards
  // };

  const handleAttackTypeChange = (index: number) => {
    updateForm(
      "attackTypes",
      form.attackTypes.map((val, i) => (i === index ? !val : val)),
    );
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
      <div className="flex">
        <div className="w-1/2 flex flex-col justify-between">
          {/* <ExportImportFeature /> */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 items-start">
              <label className="">
                <h2 className="font-semibold mb-1">Master Name</h2>
                <input
                  name="masterName"
                  defaultValue={form.masterName}
                  className="bg-white text-black rounded p-1"
                  onChange={(e) => updateForm("masterName", e.target.value)}
                />

                <div className="flex items-center gap-0">
                  <button
                    type="button"
                    onClick={() =>
                      updateForm(
                        "masterNameFontSize",
                        form.masterNameFontSize - 2,
                      )
                    }
                    className="w-10 h-10 flex items-center justify-center border border-black cursor-pointer text-xl"
                    title="Decrease font"
                  >
                    <MdTextDecrease />
                  </button>

                  <div
                    className="w-10 h-10 flex items-center justify-center border border-black bg-blue-500 text-center"
                    style={{ marginLeft: -1 }}
                  >
                    <div className="text-sm">{form.masterNameFontSize}px</div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      updateForm(
                        "masterNameFontSize",
                        form.masterNameFontSize + 2,
                      )
                    }
                    className="w-10 h-10 flex items-center justify-center border border-black cursor-pointer text-xl"
                    title="Increase font"
                    style={{ marginLeft: -1 }}
                  >
                    <MdTextIncrease />
                  </button>
                </div>
              </label>

              <>
                <h2 className="font-semibold mb-1">Master Ability</h2>

                <RichTextEditor
                  masterAbility={form.masterAbility}
                  setMasterAbility={(abilityText) =>
                    updateForm("masterAbility", abilityText)
                  }
                />
                {/* <input name="masterAbility" className="bg-white text-black" onChange={(e) => setMasterAbility(e.target.value)} /> */}
              </>

              <h2 className="font-semibold mb-3">Master Picture</h2>
              {/* <input name="masterName" className="bg-white text-black" /> */}
              <ImageCropper
                croppedImage={form.pic}
                setCroppedImage={(croppedPic) => updateForm("pic", croppedPic)}
              />
            </div>

            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <div>
                  Mana
                  <input
                    maxLength={2}
                    placeholder={"Blank, X, or 1-2 digits"}
                    onChange={(e) =>
                      updateForm(
                        "cardMana",
                        e.target.value.toUpperCase() || null,
                      )
                    }
                  />
                </div>

                <div>
                  Attack
                  <input
                    maxLength={2}
                    placeholder={"Blank, X, or 1-2 digits"}
                    onChange={(e) =>
                      updateForm(
                        "cardAttack",
                        e.target.value.toUpperCase() || null,
                      )
                    }
                  />
                </div>

                <div className="flex flex-col">
                  Attack Types
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
                <div>
                  <label htmlFor="eventMana">Event Mana:</label>
                  <select
                    id="eventMana"
                    name="eventMana"
                    onChange={(e) =>
                      updateForm(
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

                <div>
                  <label htmlFor="objective">Objective points:</label>
                  <select
                    id="objective"
                    name="objective"
                    onChange={(e) =>
                      updateForm(
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
                  Filters
                  <label className="flex gap-1">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        updateForm("grayscaleFilter", e.target.checked)
                      }
                    />
                    Grayscale filter
                  </label>
                </div>
              </div>

              {/* Servant Options */}
              <div>
                <label htmlFor="servantClass">Servant Class:</label>
                <select
                  id="servantClass"
                  name="servantClass"
                  onChange={(e) =>
                    updateForm(
                      "servantClass",
                      e.target.value ? e.target.value : null,
                    )
                  }
                >
                  <option value="">None</option>
                  <option value="" disabled>
                    --STANDARD--
                  </option>
                  {SERVANT_TYPES.STANDARD.map((servantType, i) => (
                    <option key={i} value={servantType}>
                      {servantType}
                    </option>
                  ))}
                  <option value="" disabled>
                    -----EXTRA-----
                  </option>
                  {SERVANT_TYPES.EXTRA.map((servantType, i) => (
                    <option key={i} value={servantType}>
                      {servantType}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                {form.servantCards?.slice(0, 3).map((card, index) => (
                  <div className="flex flex-row" key={card.index}>
                    <img
                      src={"./attack-types-text/" + card.cardType + ".png"}
                    />
                    <input
                      disabled={!card.showIcon}
                      placeholder={"2,3,4"}
                      onChange={(e) =>
                        addOrChangeServantAttack(
                          card.index,
                          card.cardType,
                          e.target.value,
                        )
                      }
                    />
                    <button onClick={() => toggleHideServantAttack(card.index)}>
                      {card.showIcon ? "HIDE ICON" : "SHOW ICON"}
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    addOrChangeServantAttack(
                      Math.max(
                        ...(form.servantCards?.map((card) => card.index) ?? [
                          0,
                        ]),
                      ) + 1,
                      "special",
                      "",
                    )
                  }
                >
                  Add Special
                </button>
                {form.servantCards?.slice(3).map((card) => (
                  <div className="flex flex-row" key={card.index}>
                    <img
                      src={"./attack-types-text/" + card.cardType + ".png"}
                    />
                    <input
                      placeholder={"2,3,4"}
                      onChange={(e) =>
                        addOrChangeServantAttack(
                          card.index,
                          card.cardType,
                          e.target.value,
                        )
                      }
                    />
                    <button onClick={() => deleteServantAttack(card.index)}>
                      DELETE
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </form>
          <button
            onClick={() => downloadCard()}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer mt-3 w-full"
          >
            Download Card
          </button>
        </div>

        <div className="w-1/2">
          <Card
            {...form}
            name={form.masterName}
            nameFontSize={form.masterNameFontSize}
            ability={form.masterAbility}
            isPreview={true}
          />
        </div>
        <Card
          {...form}
          name={form.masterName}
          nameFontSize={form.masterNameFontSize}
          ability={form.masterAbility}
          isPreview={false}
        />
      </div>
    </div>
  );
};
