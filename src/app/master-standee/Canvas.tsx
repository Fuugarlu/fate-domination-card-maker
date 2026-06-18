import React from 'react'
import tokenTemplate from "./token-template.png";
import { tokenFormInput } from './page';
import { PicsToSave } from '@/src/types/formTypes';

type HEX = `#${string}`;
type props = {
    form: tokenFormInput
    isPreview: boolean
}

export const Token = ({form, isPreview}: props) => {
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
          id={isPreview ? "card-preview" : PicsToSave.TOKEN}
          className={`relative overflow-hidden`}
          style={{
            width: 876,
            height: 1433,
          }}
        >
          {/* Character image */}
          {form.pic && (
            <img
              src={form.pic}
              alt=""
              className="absolute object-cover"
              style={{
                width: 876,
                height: 1433,
                border: `50px solid ${form.tokenColor}`
              }}
            />
          )}

          {/* Template frame */}
          {/* <img
            src={
              tokenTemplate.src
            }
            alt=""
            className="absolute inset-0 pointer-events-none"
            style={{
            //   filter: `hue-rotate(${form.enableCardColorHueInput ? form.cardColorHue : "0"}deg)`,
            }}
          /> */}
        </div>
        <div className="flex justify-center">
          <div className="text-2xl italic mt-2">
            Token is previewed at 50% zoom.
          </div>
        </div>
      </div>
    </div>
  );
};
