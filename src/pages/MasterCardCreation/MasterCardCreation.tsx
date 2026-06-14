"use client";

import React, { useState } from "react";
import { Card } from "./Canvas";
import ImageCropper from "./ImageCropper";
import html2canvas from "html2canvas";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import { ExportImportFeature } from "./export/export";
import { MdTextDecrease, MdTextIncrease } from "react-icons/md";

export const MasterCardCreation = () => {
  const [Pic, setPic] = useState<string | null>(null);
  const [MasterName, setMasterName] = useState<string>("Original Character");
  const [MasterNameFontSize, setMasterNameFontSize] = useState<number>(50);
  const [ObjectiveValue, setObjectiveValue] = useState<number | null>(null);
  const [EventMana, setEventMana] = useState<number | null>(null);
  const [CardAttack, setCardAttack] = useState<string | null>(null);
  const [CardMana, setCardMana] = useState<string | null>(null);
  const [AttackTypes, setAttackTypes] = useState<boolean[]>([false, false, false, false, false]);
  const [MasterAbility, setMasterAbility] =
    useState<string>(`<p><span style="font-size: 30px; line-height: 1.1;"><em>Example</em> - Add some abilities!</span></p>
    <p><span style="font-size: 30px; line-height: 1.1;"><em>Other example</em> - <strong>Passive/Combat:</strong> Pay 1 Mana to [cry on command].</span></p>`);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAttackTypeChange = (index: number) => {
  setAttackTypes((prev) =>
    prev.map((val, i) => (i === index ? !val : val))
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
      link.download = `${MasterName || "master-card"}.png`;
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
                  defaultValue={MasterName}
                  className="bg-white text-black rounded p-1"
                  onChange={(e) => setMasterName(e.target.value)}
                />

                <div className="flex items-center gap-0">
                  <button
                    type="button"
                    onClick={() =>
                      setMasterNameFontSize(MasterNameFontSize - 2)
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
                    <div className="text-sm">{MasterNameFontSize}px</div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setMasterNameFontSize(MasterNameFontSize + 2)
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
                  masterAbility={MasterAbility}
                  setMasterAbility={setMasterAbility}
                />
                {/* <input name="masterAbility" className="bg-white text-black" onChange={(e) => setMasterAbility(e.target.value)} /> */}
              </>

              <h2 className="font-semibold mb-3">Master Picture</h2>
              {/* <input name="masterName" className="bg-white text-black" /> */}
              <ImageCropper croppedImage={Pic} setCroppedImage={setPic} />
            </div>



            <div>
                <label htmlFor="event-mana">Event mana points:</label>
                <select id="event-mana" name="event-mana" onChange={(e) => setEventMana(e.target.value ? Number(e.target.value) : null)}>
                  <option value="">None</option>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </select>
            </div>

            <div>
                <label htmlFor="objective">Objective points:</label>
                <select id="objective" name="objective" onChange={(e) => setObjectiveValue(e.target.value ? Number(e.target.value) : null)}>
                  <option value="">None</option>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </select>
            </div>

            <div>
              Mana
              <input maxLength={2} placeholder={"None"} onChange={(e) => setCardMana(e.target.value || null)}/>
            </div>
            
            <div>
              Attack
              <input maxLength={2} placeholder={"None"} onChange={(e) => setCardAttack(e.target.value || null)}/>
            </div>
            
            <div>
              Attack Type AttackTypes
                <div>
                  <input type="checkbox" id="scales" name="scales" checked />
                  <label htmlFor="scales">Scales</label>
                </div>
                {AttackTypes.map((isChecked, i) => (
  <label key={i}>
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => handleAttackTypeChange(i)}
    />
    Checkbox {i + 1}
  </label>
))}
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
            pic={Pic}
            name={MasterName}
            nameFontSize={MasterNameFontSize}
            ability={MasterAbility}
            objectiveValue={ObjectiveValue}
            eventMana={EventMana}
            cardAttack={CardAttack}
            cardMana={CardMana}
            isPreview={true}
            attackTypes={AttackTypes}
          />
        </div>
          <Card
            pic={Pic}
            name={MasterName}
            nameFontSize={MasterNameFontSize}
            ability={MasterAbility}
            objectiveValue={ObjectiveValue}
            eventMana={EventMana}
            cardAttack={CardAttack}
            cardMana={CardMana}
            isPreview={false}
            attackTypes={AttackTypes}
          />
      </div>
    </div>
  );
};
