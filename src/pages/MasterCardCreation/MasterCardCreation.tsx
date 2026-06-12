"use client";

import React, { useState } from "react";
import { Card } from "./Canvas";
import ImageCropper from "./ImageCropper";
import html2canvas from "html2canvas";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

export const MasterCardCreation = () => {
  const [Pic, setPic] = useState<string | null>(null);
  const [MasterName, setMasterName] = useState<string>("");
  const [MasterAbility, setMasterAbility] = useState<string>(`<p><span style="font-size: 30px; line-height: 1.1;"><em>Example</em> - Add some abilities!</span></p>
    <p><span style="font-size: 30px; line-height: 1.1;"><em>Other example</em> - <strong>Passive/Combat:</strong> Pay 1 Mana to [cry on command].</span></p>`);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  async function downloadCard() {
    const card = document.getElementById("card");
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
    <div>
      <div className="flex justify-between">
        <h1>Master Card</h1>
        <button>Export</button>
        <button>Import</button>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 items-start">
              <label className="">
                <h2 className="font-semibold mb-1">Master Name</h2>
                <input
                  name="masterName"
                  className="bg-white text-black rounded p-1"
                  onChange={(e) => setMasterName(e.target.value)}
                />
              </label>

              <h2 className="font-semibold mb-1">Master Ability</h2>

              <RichTextEditor
                masterAbility={MasterAbility}
                setMasterAbility={setMasterAbility}
              />
              {/* <input name="masterAbility" className="bg-white text-black" onChange={(e) => setMasterAbility(e.target.value)} /> */}

              <label className="">
                <h2 className="font-semibold mb-1">Master Picture</h2>
                {/* <input name="masterName" className="bg-white text-black" /> */}
                <ImageCropper croppedImage={Pic} setCroppedImage={setPic} />
              </label>
            </div>
          </form>
        <button onClick={() => downloadCard()} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer mt-3">Download</button>
        </div>

        <div className="w-1/2">
          <Card pic={Pic} name={MasterName} ability={MasterAbility} />
        </div>
      </div>
    </div>
  );
};
