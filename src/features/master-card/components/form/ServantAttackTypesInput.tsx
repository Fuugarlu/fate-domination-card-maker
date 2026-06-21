import React from "react";
import { formInput } from "@/src/features/master-card/types/formTypes";
import { updateForm } from "@/src/utils/formUtils";
import { SERVANT_TYPES } from "@/src/constants/servantConstants";
import { MdTextDecrease, MdTextIncrease } from "react-icons/md";
import { servantCardType } from "@/src/types/servantTypes";

const white = "#ffffff";
const red = "#f87171";
const gray = "#9ca3af";

type Props = {
  form: formInput;
  setForm: React.Dispatch<React.SetStateAction<formInput>>;
};

export const ServantAttackTypesInput = (prop: Props) => {

  function addOrChangeServantAttack(
    attackIndex: number,
    attackType: string,
    attackValues: string,
  ) {
    prop.setForm((prev) => {
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

  const getInputColorBasedOnCard = (card: servantCardType) => {
    if (card.showIcon) return white;
    if (card.values) return red;
    return gray;
  };

  function deleteServantAttack(attackIndex: number) {
    prop.setForm((prev) => {
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
    prop.setForm((prev) => {
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

  function changeSpecialCardType(attackIndex: number, newType: string) {
    prop.setForm((prev) => {
      const servantCards = prev.servantCards ? [...prev.servantCards] : [];

      const existingIndex = servantCards.findIndex(
        (card) => card.index === attackIndex,
      );

      if (existingIndex === -1) return prev;

      servantCards[existingIndex] = {
        ...servantCards[existingIndex],
        cardType: newType,
      };

      return {
        ...prev,
        servantCards,
      };
    });
  }

  return (
    <div>
      {" "}
      <div className="category-header">SERVANT CARD</div>
      <div className="input-block flex flex-col">
        <label className="field-header" htmlFor="servantClass">
          Servant Class
        </label>
        <select
          id="servantClass"
          name="servantClass"
          onChange={(e) =>
            updateForm(
              "servantClass",
              e.target.value ? e.target.value : null,
              prop.setForm,
            )
          }
        >
          <option value="">None</option>
          <option value="" disabled>
            &#10022; STANDARD
          </option>
          {SERVANT_TYPES.STANDARD.map((servantType, i) => (
            <option key={i} value={servantType}>
              {servantType}
            </option>
          ))}
          <option value="" disabled>
            &#10022; EXTRA
          </option>
          {SERVANT_TYPES.EXTRA.map((servantType, i) => (
            <option key={i} value={servantType}>
              {servantType}
            </option>
          ))}
        </select>
      </div>
      <div className="input-block">
        <h2 className="field-header">Servant Cards</h2>
        <div className="flex flex-col gap-1">
          {prop.form.servantCards?.slice(0, 3).map((card, index) => (
            <div
              className="flex flex-row items-stretch justify-start gap-1"
              key={card.index}
            >
              <div className="flex flex-row items-center gap-1">
                <img
                  src={"./attack-types-text/" + card.cardType.toLowerCase() + ".png"}
                  style={{ width: 33, height: 28 }}
                />
                <input
                  id="attackType"
                  type="text"
                  value={card.values ?? ""}
                  placeholder={"1,2,3..."}
                  onChange={(e) =>
                    addOrChangeServantAttack(
                      card.index,
                      card.cardType,
                      e.target.value,
                    )
                  }
                  style={{ color: `${getInputColorBasedOnCard(card)}` }}
                />
              </div>
              <button
                onClick={() => toggleHideServantAttack(card.index)}
                className="bg-blue-500 hover:bg-blue-400 rounded px-2 cursor-pointer"
              >
                {card.showIcon ? "HIDE ICON" : "SHOW ICON"}
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-4 my-2">
          <button
            className="bg-blue-500 hover:bg-blue-400 p-1 rounded cursor-pointer"
            onClick={() =>
              addOrChangeServantAttack(
                Math.max(
                  ...(prop.form.servantCards?.map((card) => card.index) ?? [0]),
                ) + 1,
                "special",
                "",
              )
            }
          >
            Add Special & Other Types
          </button>

          {prop.form.servantCards && prop.form.servantCards.length >= 4 && (
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  prop.setForm((prev) => ({
                    ...prev,
                    servantCardsSpecialFontSize:
                      prev.servantCardsSpecialFontSize - 2,
                  }))
                }
                className="w-9 h-9 flex items-center justify-center border border-black cursor-pointer text-xl bg-blue-900 hover:bg-blue-700 rounded-l"
                title="Decrease font"
              >
                <MdTextDecrease />
              </button>

              <div
                className="w-11 h-9 flex items-center justify-center border border-black bg-gray-700 text-center"
                style={{ marginLeft: -1 }}
              >
                <div className="text-sm">
                  {prop.form.servantCardsSpecialFontSize}px
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  prop.setForm((prev) => ({
                    ...prev,
                    servantCardsSpecialFontSize:
                      prev.servantCardsSpecialFontSize + 2,
                  }))
                }
                className="w-9 h-9 flex items-center justify-center border border-black cursor-pointer text-xl bg-blue-900 hover:bg-blue-700 rounded-r"
                title="Increase font"
                style={{ marginLeft: -1 }}
              >
                <MdTextIncrease />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {prop.form.servantCards?.slice(3).map((card) => (
            <div className="flex flex-row items-center gap-1" key={card.index}>
              <img
                src={"./attack-types-text/" + card.cardType.toLowerCase() + ".png"}
                style={{ width: 33, height: 28 }}
              />
              <input
                id="specialType"
                type="text"
                value={card.values ?? ""}
                placeholder={"Surveil"}
                onChange={(e) =>
                  addOrChangeServantAttack(
                    card.index,
                    card.cardType,
                    e.target.value,
                  )
                }
              />
              <div className="flex gap-1 items-center">
                <button
                  className="bg-gray-700 rounded p-1 cursor-pointer"
                  onClick={() => deleteServantAttack(card.index)}
                >
                  DELETE
                </button>

                <label htmlFor="eventMana">Type:</label>
                <select
                  id="eventMana"
                  name="eventMana"
                  onChange={(e) =>
                    changeSpecialCardType(card.index, e.target.value ?? null)
                  }
                  defaultValue={"special"}
                >
                  <option value="strength">Strength</option>
                  <option value="agility">Agility</option>
                  <option value="magic">Magic</option>
                  <option value="special">Special</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
