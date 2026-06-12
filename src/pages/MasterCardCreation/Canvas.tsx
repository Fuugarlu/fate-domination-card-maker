"use client";

import masterTemplate from "./master-template.png";

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
}: {
  pic: string | null;
  name: string;
  ability: string;
}) => {
  return (
    <div
      id="card"
      className="relative overflow-hidden"
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
          top: 768,
          fontSize: 50,
          fontFamily: '"Times New Roman"',
        }}
      >
        {name}
      </div>

      {/* Ability */}
      <AbilityText text={ability} />
    </div>
  );
};
