import React from "react";
import { formInput } from "@/src/types/formTypes";
import { updateForm } from "@/src/utils/formUtils";
import { SERVANT_TYPES } from "@/src/constants/servantConstants";



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

  return (
    <div>
      {" "}
      <div>
        <label htmlFor="servantClass">Servant Class:</label>
        <select
          id="servantClass"
          name="servantClass"
          onChange={(e) =>
            updateForm("servantClass", e.target.value ? e.target.value : null, prop.setForm)
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
        {prop.form.servantCards?.slice(0, 3).map((card, index) => (
          <div className="flex flex-row" key={card.index}>
            <img src={"./attack-types-text/" + card.cardType + ".png"} />
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
                ...(prop.form.servantCards?.map((card) => card.index) ?? [0]),
              ) + 1,
              "special",
              "",
            )
          }
        >
          Add Special
        </button>
        {prop.form.servantCards?.slice(3).map((card) => (
          <div className="flex flex-row" key={card.index}>
            <img src={"./attack-types-text/" + card.cardType + ".png"} />
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
  );
};
