"use client";

import { servantCardType } from "@/src/types/servantTypes";
import masterTemplate from "./master-template.png";
import { formInput } from "@/src/types/formTypes";

function getCardIcon(key: string) {
  switch (key.toLowerCase()) {
    case "strength":
      return "./attack-types-text/strength.png";
    case "agility":
      return "./attack-types-text/agility.png";
    case "magic":
      return "./attack-types-text/magic.png";
    case "special":
      return "./attack-types-text/special.png";
  }
}

// function getCardColor(key: string) {
//   switch (key.toLowerCase()) {
//     case "strength":
//       return "text-red-500";
//     case "agility":
//       return "text-green-500";
//     case "magic":
//       return "text-blue-500";
//     case "special":
//       return "";
//   }
// }

function getServantChunked(servantCards: servantCardType[]) {
  let chunk_size = getServantSplitCount(servantCards);
  const chunked = [];
  for (let i = 0; i < servantCards.length; i += chunk_size) {
    chunked.push(servantCards.slice(i, i + chunk_size));
  }
  return chunked;
}

function getServantSplitCount(servantCards: servantCardType[]) {
  return servantCards.length >= 7 ? 4 : 3;
}

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
    ></div>
  );
}

type CardProps = {
  form: formInput;
  isPreview: boolean;
};

export const Card = ({form, isPreview}: CardProps) => {
  return (
    <div
      style={isPreview ? { zoom: 0.5 } : {}}
      className={`
        ${!isPreview ? "absolute left-[-9999px]" : "flex flex-col items-center"}
      `}
    >
      <div className="xl:fixed"> 
        {/* mt-4 above messes up download */}
        <div
          id={isPreview ? "card-preview" : "card-to-save"}
          className={`relative overflow-hidden ${form.grayscaleFilter && "grayscale "}`}
          style={{
            width: 750,
            height: 1050,
          }}
        >
          {/* Character image */}
          {form.pic && (
            <img
              src={form.pic}
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
              filter: `hue-rotate(${form.enableCardColorHueInput ? form.cardColorHue : "0"}deg)`
            }}
          />

          {/* Name */}
          <div
            className="absolute text-white whitespace-nowrap"
            style={{
              left: 33,
              top: 770 + (50 - form.masterNameFontSize),
              fontSize: form.masterNameFontSize,
              fontFamily: '"Times New Roman"',
            }}
          >
            {form.masterName}
          </div>

          {/* Objective Value */}
          {form.objectiveValue !== null && (
            <div
              className="absolute"
              style={{
                right: 10,
                top: 0,
                width: "190px",
              }}
            >
              <img src={"./objective-vp/" + form.objectiveValue + " VP.png"} />
            </div>
          )}

          {/* Event Mana */}
          {form.eventMana !== null && (
            <div
              className="absolute"
              style={{
                right: form.objectiveValue == null ? 5 : 200,
                top: 13,
                width: "190px",
              }}
            >
              <img src={"./event-mana/" + form.eventMana + " Mana.png"} />
            </div>
          )}

          {/* Mana & Attack */}
          {/* Attack */}
          {form.cardAttack != null && (
            <div
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
                  {form.cardAttack}
                </div>
              </div>
            </div>
          )}

          {/* Mana */}
          {form.cardMana != null && (
            <div
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
                  {form.cardMana}
                </div>
              </div>
            </div>
          )}

          {/* Attack Type */}
          <div className="absolute" style={{ top: 10, left: 10 }}>
            <div className="flex flex-col gap-1">
              {form.attackTypes[0] && <img src="attack-types-card/strength.png" />}
              {form.attackTypes[1] && <img src="attack-types-card/agility.png" />}
              {form.attackTypes[2] && <img src="attack-types-card/magic.png" />}
              {form.attackTypes[3] && <img src="attack-types-card/special.png" />}
              {form.attackTypes[4] && (
                <img src="attack-types-card/noblephantasm.png" />
              )}
            </div>
          </div>

          {/* Servant Class */}
          {form.servantClass !== null && (
            <div
              className="absolute"
              style={{
                right: 20,
                top: 20,
              }}
            >
              <img src={"./servant-classes/" + form.servantClass + ".png"} className="block"/>
            </div>
          )}

          {/* Ability */}
          {form.masterAbility && <AbilityText text={form.masterAbility} />}

          {/* Servant Info */}
          {form.servantCards && (
            <div
              className="absolute text-4xl"
              style={{
                top: 860,
                left: 50,
                width: "650px",
                fontFamily: '"Times New Roman"',
              }}
            >
              <div
                className="flex w-full justify-between"
                style={{ maxHeight: "170px" }}
              >
                {/* Strength/Agility/Magic basic attacks */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {form.servantCards
                    .slice(0, 3)
                    .filter((card) => card.showIcon == true)
                    .map((cardItem, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 ${cardItem.cardType.toLowerCase()}`}
                      >
                        <img
                          style={{ width: "35px", height: "28px" }}
                          src={getCardIcon(cardItem.cardType)}
                        />
                        <span>
                        {cardItem.values}
                        </span>
                      </div>
                    ))}
                </div>
                <div
                  className={`flex gap-2 w-full justify-center ${form.servantCards.slice(3).length > 6 ? "-mt-4" : ""} ${form.servantCards.slice(3).length > 3 ? "text-3xl" : "text-4xl"}`}
                  style={{ fontSize: form.servantCardsSpecialFontSize + "px" }}
                >
                  {getServantChunked(form.servantCards.slice(3)).map(
                    (group, colIndex) => (
                      <div
                        key={colIndex}
                        className={`grid grid-flow-col gap-1`}
                        style={{
                          gridTemplateRows: `repeat(${form.servantCards ? getServantSplitCount(form.servantCards.slice(3)) : "3"}, minmax(0, 1fr))`,
                        }}
                      >
                        {group.map((cardItem, i) => (
                          <div
                            key={i}
                            className={`flex flex-row gap-2 items-center ${cardItem.cardType.toLowerCase()}`
                            }
                          >
                            <img
                              style={{ width: "35px", height: "28px" }}
                              src={getCardIcon(cardItem.cardType)}
                              className="block"
                            />
                            {cardItem.values}
                          </div>
                        ))}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <div className="text-2xl italic mt-2">
            Card is previewed at 50% zoom.
          </div>
        </div>
      </div>
    </div>
  );
};
