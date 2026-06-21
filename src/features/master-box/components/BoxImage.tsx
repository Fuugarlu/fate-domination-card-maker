import React from "react";

type props = {
    pic: string,
    width: number,
    height: number,
    rotate: boolean
}

const BoxImage = ({pic, width, height, rotate}: props) => {
  return (
    <div>
      <img
        src={pic}
        alt=""
        className={`absolute object-fit ${rotate ? "top-0 left-0 rotate-90" : "bottom-0 right-0"}`}
        style={{
          width: width,
          height: height,
        }}
      />
    </div>
  );
};

export default BoxImage;
