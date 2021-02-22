import React from "react";
import DropDown from "./DropDown";
import SpriteCollection from "./SpriteCollection";

export default function SelectedCard({
  name,
  height,
  weight,
  abilities,
  stats,
  getsearchedPoke,
  setSpriteGen,
  setSpriteVer,
  spriteGen,
  spriteVer,
}) {
  const dispability = (ability) => {
    return ability ? (
      <span
        className="selected-card__stat-wrapper__ability-list__abilities"
        key={ability.ability.name}
      >
        {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
      </span>
    ) : (
      <p></p>
    );
  };
  const dispStats = (stat) => {
    return stat ? (
      <div className="selected-card__stat-wrapper__stat-list-wrapper__stat-list">
        <p
          className="selected-card__stat-wrapper__stat-list-wrapper__stat-list__stat"
          key={stat.stat.name}
        >
          {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
        </p>
        <p
          className="selected-card__stat-wrapper__stat-list__stat"
          style={{
            width: `${stat["base_stat"]}px`,
            textAlign: "center",
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            lineHeight: "25px",
          }}
          key={stat["base_stat"]}
        >
          {stat["base_stat"]}
        </p>
      </div>
    ) : (
      <p></p>
    );
  };
  return (
    <div className="selected-card">
      <div className="selected-card__image-wrapper">
        <img
          className="selected-card__image-wrapper__image"
          src={getsearchedPoke.sprites.other["official-artwork"]["front_default"]}
          alt="sprite"
        />
      </div>
      <div className="selected-card__wrapper">
        <p className="selected-card__wrapper__content">Name</p>
        <p className="selected-card__wrapper__content">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
      </div>
      <div className="selected-card__wrapper">
        <p className="selected-card__wrapper__content">Height</p>
        <p className="selected-card__wrapper__content">{height}</p>
      </div>
      <div className="selected-card__wrapper">
        <p className="selected-card__wrapper__content">Weight</p>
        <p className="selected-card__wrapper__content">{weight}</p>
      </div>
      <div className="selected-card__stat-wrapper">
        <div className="selected-card__stat-wrapper__ability-list">
          {abilities.map((ability) => dispability(ability))}
        </div>
        <div className="selected-card__stat-wrapper__stat-list-wrapper">
          {stats.map((stat) => dispStats(stat))}
        </div>
      </div>
      <section>
        {getsearchedPoke ? (
          <DropDown
            getsearchedPoke={getsearchedPoke}
            setSpriteGen={setSpriteGen}
            setSpriteVer={setSpriteVer}
            spriteGen={spriteGen}
          />
        ) : (
          <div></div>
        )}
      </section>
      <section>
        <SpriteCollection
          spriteObj={getsearchedPoke?.sprites.versions[spriteGen][spriteVer]}
          getsearchedPoke={getsearchedPoke}
          spriteGen={spriteGen}
          spriteVer={spriteVer}
        />
      </section>
    </div>
  );
}
