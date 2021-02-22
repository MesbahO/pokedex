import React from "react";

export default function SelectedCard({name, height, weight, abilities, stats}) {
  const dispability = (ability) => {
    return ability ? <p>{ability.ability.name}</p> : <p></p>;
  };
  const dispStats = (stat) => {
    return stat ? (
      <>
        <p>{stat.stat.name}</p>
        <p>{stat["base_stat"]}</p>
      </>
    ) : (
      <p></p>
    );
  };
  return (
    <div>
      <h3>
        name
        <span>{name}</span>
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
