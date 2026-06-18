import React from 'react'
import tokenTemplate from "./token-template.png";
import { tokenFormInput } from './page';
import { PicsToSave } from '@/src/types/formTypes';
import boxTopRightBlack from './box-top-right.png';
import boxBottomLeftShadows from './box-bottom-left.png';

type props = {
    form: tokenFormInput
    isPreview: boolean
}

export const MasterBox = ({form, isPreview}: props) => {
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
          id={isPreview ? "card-preview" : PicsToSave.MASTER_BOX}
          className={`relative overflow-hidden`}
          style={{
            width: 2990,
            height: 2990,
          }}
        >
          {/* Bottom layer (colors) */}
          <div style={{width: 2990, height: 2990, backgroundColor: form.tokenColor}}></div>
          {/* Top right dark part */}
          <img src={boxTopRightBlack.src} 
          style={{right:0, top:0, width: 1990, height: 2001}}
          className='absolute w-full'/>
          {/* Bottom left shadows over colors */}
          <img src={boxBottomLeftShadows.src} 
          style={{left:0, bottom:0, width: 2001, height: 1990}}
          className='absolute w-full'/>

          {/* Character image */}
          {form.pic && (
            <img
              src={form.pic}
              alt=""
              className="absolute object-fit"
              style={{
                width: 1000,
                height: 1000,
                bottom: 0,
                right: 0
              }}
            />
          )}

           {form.pic && (
            <img
              src={form.pic}
              alt=""
              className="absolute object-fit"
              style={{
                width: 1000,
                height: 1000,
                top: 0,
                left: 0,
                transform: "rotate(90deg)"
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
