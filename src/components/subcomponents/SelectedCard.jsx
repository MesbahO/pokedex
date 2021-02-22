import React from "react";

export default function SelectedCard({name, height, weight, abilities, stats, getsearchedPoke}) {
  const dispability = (ability) => {
    return ability ? <p key={ability.ability.name}>{ability.ability.name}</p> : <p></p>;
  };
  const dispStats = (stat) => {
    return stat ? (
      <>
        <p key={stat.stat.name}>{stat.stat.name}</p>
        <p key={stat["base_stat"]}>{stat["base_stat"]}</p>
      </>
    ) : (
      <p></p>
    );
  };
  return (
    <div>
      <div>
        {getsearchedPoke ? (
          <img
            src={getsearchedPoke.sprites.other["official-artwork"]["front_default"]}
            alt="sprite"
          />
        ) : (
          <p>Select Pokemon</p>
        )}
      </div>
      <h3>
        name
        <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
      </h3>
      <h3>
        height
        <span>{height}</span>
      </h3>
      <h3>
        weight
        <span>{weight}</span>
      </h3>
      <br />
      {abilities.map((ability) => dispability(ability))}
      {stats.map((stat) => dispStats(stat))}
    </div>
  );
}
