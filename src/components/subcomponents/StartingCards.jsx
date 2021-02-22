import React from "react";

export default function StartingCards({image, header}) {
  return (
    <div className="starting-cards">
      <p className="starting-cards__header">{header.charAt(0).toUpperCase() + header.slice(1)}</p>
      <img src={image} alt="Pokemon Sprite" className="starting-cards__image" />
    </div>
  );
}
