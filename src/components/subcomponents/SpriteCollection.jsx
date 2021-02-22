import React from "react";

export default function SpriteCollection({spriteObj, getsearchedPoke, spriteGen, spriteVer}) {
  const getkeys = (obj) => {
    let keys = [];
    if (obj) {
      for (const [key] of Object.entries(obj)) {
        keys.push(key);
      }
    }
    return keys;
  };
  return (
    <div>
      {getkeys(spriteObj).map((key) => {
        if (spriteObj[key]) {
          return (
            <img src={getsearchedPoke.sprites.versions[spriteGen][spriteVer][key]} alt="sprite" />
          );
        }
      })}
    </div>
  );
}
