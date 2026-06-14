"use client";

import masterTemplate from "./master-template.png";
import * as vp from "@/public/objective-vp";

// function getVpSrc(value: number | null): string | null {
//   if (value === null || value === undefined) return null;
//   const key = `vp${value}` as keyof typeof vp;
//   const img = (vp as any)[key];
//   if (!img) return null;
//   return typeof img === "string" ? img : img?.src ?? null;
// }

function AbilityText({ text }: { text: string }) {
  let fontSize = 30;
  let lineHeight = 35;

  if (text.length > 250) {
    fontSize = 25;
    lineHeight = 30;
  }

  if (text.length > 400) {
    fontSize = 20;
    lineHeight = 25;
  }

  return (
    <div
      className="absolute text-white break-words"
      style={{
        left: 33,
        top: 845,
        width: 680,
        // fontSize,
        // lineHeight: `${lineHeight}px`,
        fontFamily: '"Times New Roman"',
      }}
      dangerouslySetInnerHTML={{ __html: text }}
    >
      {/* {text} */}
    </div>
  );
}

export const Card = ({
  pic,
  name,
  ability,
  isPreview,
  nameFontSize,
  objectiveValue,
  eventMana,
  cardAttack,
  cardMana,
  attackTypes,
}: {
  pic: string | null;
  name: string;
  ability: string;
  isPreview: boolean;
  nameFontSize: number;
  objectiveValue: number | null;
  eventMana: number | null;
  cardAttack: string | null;
  cardMana: string | null;
  attackTypes: boolean[];
}) => {
  return (
    <div
      style={isPreview ? { zoom: 0.5 } : {}}
      className={
        !isPreview ? "absolute left-[-9999px]" : "flex flex-col items-center"
      }
      id={isPreview ? "card-preview" : "card-to-save"}
    >
      <div className="fixed">
        <div
          id="card"
          className="relative overflow-hidden "
          style={{
            width: 750,
            height: 1050,
          }}
        >
          {/* Character image */}
          {pic && (
            <img
              src={pic}
              alt=""
              className="absolute object-cover"
              style={{
                left: 25,
                top: 25,
                width: 700,
                height: 800,
              }}
            />
          )}

          {/* Template frame */}
          <img
            src={masterTemplate.src}
            alt=""
            className="absolute inset-0 pointer-events-none"
            style={{
              width: 750,
              height: 1050,
            }}
          />

          {/* Name */}
          <div
            className="absolute text-white whitespace-nowrap"
            style={{
              left: 33,
              top: 768 + (50 - nameFontSize),
              fontSize: nameFontSize,
              fontFamily: '"Times New Roman"',
            }}
          >
            {name}
          </div>

          {/* Objective Value */}
          {objectiveValue !== null && (
            <div
              className="absolute"
              style={{
                right: 10,
                top: 0,
                width: "190px",
              }}
            >
              <img src={"./objective-vp/" + objectiveValue + " VP.png"} />
            </div>
          )}

          {/* Event Mana */}
          {eventMana !== null && (
            <div
              className="absolute"
              style={{
                right: objectiveValue == null ? 5 : 200,
                top: 13,
                width: "190px",
              }}
            >
              <img src={"./event-mana/" + eventMana + " Mana.png"} />
            </div>
          )}

          {/* Mana & Attack */}
          {/* Attack */}
          {cardAttack != null && <div
            className="absolute"
            style={{
              right: 16,
              top: 768,
            }}
          >
            <div className="relative">
              <img src={"./attack-card/attack.png"} />
              <div
                className="absolute"
                style={{
                  left: "35%",
                  fontSize: "64px",
                  fontFamily: '"Times New Roman"',
                  top: "50%",
                  transform: "translate(-65%, -50%)",
                }}
              >
                {cardAttack}
              </div>
            </div>
          </div>}

          {/* Mana */}
          {cardMana != null && <div
            className="absolute"
            style={{
              right: 176,
              top: 768,
            }}
          >
            <div className="relative">
              <img src={"./attack-card/mana.png"} />
              <div
                className="absolute"
                style={{
                  left: "33%",
                  // top: 0,
                  fontSize: "64px",
                  fontFamily: '"Times New Roman"',
                  top: "50%",
                  transform: "translate(-67%, -50%)",
                  color: "#15e86f",
                }}
              >
                {cardMana}
              </div>
            </div>
          </div>}

          {/* Attack Type */}
          <div className="absolute" style={{top: 10, left: 10}}>
                <div className="flex flex-col">
                  {attackTypes[0] && <img src="attack-types-card/strength.png"/>}
                  {attackTypes[1] && <img src="attack-types-card/agility.png"/>}
                  {attackTypes[2] && <img src="attack-types-card/magic.png"/>}
                  {attackTypes[3] && <img src="attack-types-card/special.png"/>}
                  {attackTypes[4] && <img src="attack-types-card/noblephantasm.png"/>}
                  
                </div>
          </div>

          {/* Ability */}
          <AbilityText text={ability} />
        </div>
        <div className="flex justify-center">
          <div className="text-2xl italic mt-2">
            Card is displayed at 50% zoom.
          </div>
        </div>
      </div>
    </div>
  );
};
