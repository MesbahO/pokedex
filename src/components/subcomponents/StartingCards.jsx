import React from "react";

export default function StartingCards({image, header}) {
  return (
    <div>
      <span>{header}</span>
      <img src={image} alt="Pokemon Sprite" style={{width: "100px"}} />
    </div>
  );
}
