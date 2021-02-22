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
  const types = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };
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
      <div className="selected-card__type-wrapper">
        {getsearchedPoke.types.map((type) => {
          return (
            <p
              className="selected-card__type-wrapper__type"
              style={{backgroundColor: types[type.type.name]}}
            >
              {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
            </p>
          );
        })}
      </div>
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
