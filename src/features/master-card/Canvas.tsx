"use client";

import { servantCardType } from "@/src/types/servantTypes";
import shortNameMasterTemplate from "./images/master-template-short.png";
import mediumNameMasterTemplate from "./images/master-template-medium.png";
import longNameMasterTemplate from "./images/master-template-long.png";
import {
  formInput,
  MASTER_NAME_FIELD_SIZES,
} from "@/src/features/master-card/types/formTypes";
import { ATTACK_TYPES } from "@/src/constants/servantConstants";
import { StaticImageData } from "next/image";
import { IMAGE_CROP_SETTINGS } from "@/src/utils/formUtils";

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
  return (
    <div
      className="absolute text-white break-words"
      style={{
        left: 33,
        top: 845,
        width: 680,
        fontFamily: '"Times New Roman"',
        lineHeight: 1.1,
      }}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
}

type CardProps = {
  form: formInput;
  isPreview: boolean;
};

export const Card = ({ form, isPreview }: CardProps) => {
  function handleTemplate(
    masterNameFieldSize: MASTER_NAME_FIELD_SIZES,
  ): StaticImageData {
    switch (masterNameFieldSize) {
      case MASTER_NAME_FIELD_SIZES.short:
        return shortNameMasterTemplate;
      case MASTER_NAME_FIELD_SIZES.medium:
        return mediumNameMasterTemplate;
      case MASTER_NAME_FIELD_SIZES.long:
        return longNameMasterTemplate;

      default:
        return shortNameMasterTemplate;
    }
  }

  return (
    <div
      style={isPreview ? { zoom: 0.5 } : {}}
      className={`
        ${!isPreview ? "absolute left-[-9999px] top-[-9999px]" : "flex flex-col items-center"}
      `}
    >
      <div>
        <div
          id={
            isPreview ? "card-preview" : IMAGE_CROP_SETTINGS.CARD + "-to-save"
          }
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
              className="absolute object-cover bg-black"
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
            src={handleTemplate(form.masterNameFieldSize).src}
            alt=""
            className="absolute inset-0 pointer-events-none"
            style={{
              width: 750,
              height: 1050,
              // filter: `hue-rotate(${form.enableCardColorHueInput ? form.cardColorHue : "0"}deg)`,
            }}
          />

          {/* Name */}
          <div
            className="absolute flex items-center"
            style={{
              left: 30,
              top: 778,
              fontSize: form.masterNameFontSize,
              fontFamily: '"Times New Roman"',
              height: "60px",
              width: "700px",
            }}
          >
            <div className="text-white">{form.masterName}</div>
          </div>

          {/* Objective Value */}
          {form.objectiveValue !== null && (
            <div className="absolute right-[10px] top-0 w-[190px]">
              <img src={"./objective-vp/" + form.objectiveValue + " VP.png"} />
            </div>
          )}

          {/* Event Mana */}
          {form.eventMana !== null && (
            <div
              className="absolute top-[13px] w-[190px]"
              style={{
                right: form.objectiveValue == null ? 5 : 200,
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
                right: 10,
                top: 770,
              }}
            >
              <div className="relative">
                <img src={"./attack-card/attack.png"} />
                <div
                  className="absolute"
                  style={{
                    left: "35%",
                    fontSize: "74px",
                    fontFamily: '"Times New Roman"',
                    top: "50%",
                    transform: "translate(-65%, -50%)",
                    letterSpacing: form.cardAttack.toString().includes("1")
                      ? "-5px"
                      : "-2px",
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
                right: 169,
                top: 770,
              }}
            >
              <div className="relative">
                <img src={"./attack-card/mana.png"} />
                <div
                  className="absolute"
                  style={{
                    left: "33%",
                    fontSize: "74px",
                    fontFamily: '"Times New Roman"',
                    top: "50%",
                    transform: "translate(-67%, -50%)",
                    color: "#15e86f",
                    letterSpacing: form.cardMana.toString().includes("1")
                      ? "-5px"
                      : "-2px",
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
              <div className="flex flex-col gap-[2px]">
                {ATTACK_TYPES.map(
                  (attackType) =>
                    form.attackTypes[attackType.toLowerCase()] && (
                      <div key={attackType.toLowerCase()}>
                        <img
                          src={`attack-types-card/${attackType.toLowerCase()}.png`}
                          alt={attackType}
                        />
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>

          {/* Servant Class */}
          {form.servantClass !== null && (
            <div className="absolute right-[20px] top-[20px]">
              <img
                src={"./servant-classes/" + form.servantClass + ".png"}
                className="block"
              />
            </div>
          )}

          {/* Ability */}
          {form.hasCardAbility && form.masterAbility && (
            <AbilityText text={form.masterAbility} />
          )}

          {/* Servant Info */}
          {form.servantCards && (
            <div
              className="absolute text-4xl"
              style={{
                top: 860,
                left: 33,
                width: "684px",
                fontFamily: '"Times New Roman"',
              }}
            >
              <div
                className={`flex w-full justify-between ${form.servantCards.length <= 6 ? "mx-4" : "mx-1"}`}
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
                        className={`flex items-center gap-2 ${cardItem.cardType.toLowerCase()} h-10`}
                      >
                        <img
                          style={{ width: "35px", height: "28px" }}
                          src={getCardIcon(cardItem.cardType)}
                        />
                        <span>{cardItem.values}</span>
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
                            className={`flex flex-row gap-2 items-center ${cardItem.cardType.toLowerCase()}`}
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
