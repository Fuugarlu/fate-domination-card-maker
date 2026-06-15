"use client";

import { servantCardType } from "@/src/types/servantTypes";
import masterTemplate from "./master-template.png";
import * as vp from "@/public/objective-vp";

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

function getCardColor(key: string) {
  switch (key.toLowerCase()) {
    case "strength":
      return "text-red-500";
    case "agility":
      return "text-green-500";
    case "magic":
      return "text-blue-500";
    case "special":
      return "text-white";
  }
}

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
  grayscaleFilter,
  servantClass,
  servantCards,
}: {
  pic: string | null;
  name: string;
  ability: string | null;
  isPreview: boolean;
  nameFontSize: number;
  objectiveValue: number | null;
  eventMana: number | null;
  cardAttack: string | null;
  cardMana: string | null;
  attackTypes: boolean[];
  grayscaleFilter: boolean;
  servantClass: string | null;
  servantCards: servantCardType[] | null;
}) => {
  return (
    <div
      style={isPreview ? { zoom: 0.5 } : {}}
      className={`
        ${!isPreview ? "absolute left-[-9999px]" : "flex flex-col items-center"}
      `}
      id={isPreview ? "card-preview" : "card-to-save"}
    >
      <div className="fixed">
        <div
          id="card"
          className={`relative overflow-hidden ${grayscaleFilter && "grayscale "}`}
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
          {cardAttack != null && (
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
                  {cardAttack}
                </div>
              </div>
            </div>
          )}

          {/* Mana */}
          {cardMana != null && (
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
                  {cardMana}
                </div>
              </div>
            </div>
          )}

          {/* Attack Type */}
          <div className="absolute" style={{ top: 10, left: 10 }}>
            <div className="flex flex-col">
              {attackTypes[0] && <img src="attack-types-card/strength.png" />}
              {attackTypes[1] && <img src="attack-types-card/agility.png" />}
              {attackTypes[2] && <img src="attack-types-card/magic.png" />}
              {attackTypes[3] && <img src="attack-types-card/special.png" />}
              {attackTypes[4] && (
                <img src="attack-types-card/noblephantasm.png" />
              )}
            </div>
          </div>

          {/* Servant Class */}
          {servantClass !== null && (
            <div
              className="absolute"
              style={{
                right: 20,
                top: 20,
              }}
            >
              <img src={"./servant-classes/" + servantClass + ".png"} />
            </div>
          )}

          {/* Ability */}
          {ability && <AbilityText text={ability} />}

          {/* Servant Info */}
          {/* {servantCards && (
            <div
              className="absolute text-4xl"
              style={{ top: 868, left: 60, fontFamily: '"Times New Roman"' }}
            >
              <div className="grid grid-flow-col grid-rows-3 gap-x-5 gap-y-1">
              {servantCards.map((cardItem, i) => (
                <div key={i} className={`${getCardColor(cardItem[1])}`}>
                  <img src={getCardIcon(cardItem[1])} />
                  {cardItem.at(1)}
                </div>
              ))}
              </div>
            </div>
          )} */}

          {servantCards && (
            <div
              className="absolute text-4xl"
              style={{
                top: 860,
                left: 50,
                width: "620px",
                fontFamily: '"Times New Roman"',
              }}
            >
              <div
                className="flex w-full justify-between"
                style={{ maxHeight: "170px" }}
              >
                {/* Strength/Agility/Magic basic attacks */}
                {/* TODO: remove basic icon option (ex. in illya servant) */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {servantCards.slice(0, 3).filter(card => card.showIcon == true).map((cardItem, i) => (
                    <div
                      key={i}
                      className={`relative flex gap-1 ${getCardColor(cardItem.cardType)}`}
                    >
                      <img
                        style={{ width: "50px", height: "44px" }}
                        src={getCardIcon(cardItem.cardType)}
                      />
                      {cardItem.values}
                    </div>
                  ))}
                </div>
                {/* Could change this so that it's more centered if there's up to 3? */}
                <div
                  className={`flex gap-2 w-full justify-center ${servantCards.slice(3).length > 6 ? "-mt-4" : ""} ${servantCards.slice(3).length > 3 ? "text-3xl" : "text-4xl"}`}
                >
                  {getServantChunked(servantCards.slice(3)).map(
                    (group, colIndex) => (
                      <div
                        key={colIndex}
                        className={`grid grid-flow-col gap-1`}
                        style={{
                          gridTemplateRows: `repeat(${getServantSplitCount(servantCards.slice(3))}, minmax(0, 1fr))`,
                        }}
                      >
                        {group.map((cardItem, i) => (
                          <div
                            key={i}
                            className={
                              getCardColor(cardItem.cardType) + " flex flex-row gap-1"
                            }
                          >
                            <img
                              style={{ width: "50px", height: "44px" }}
                              src={getCardIcon(cardItem.cardType)}
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
