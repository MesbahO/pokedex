import React from "react";

export default function DropDown({getsearchedPoke, setSpriteGen, setSpriteVer, spriteGen}) {
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
      <select
        name="Generation"
        id="Gen"
        onChange={(e) => {
          setSpriteGen(e.target.value);
        }}
      >
        {getkeys(getsearchedPoke?.sprites.versions).map((key) => (
          <option value={key}>{key}</option>
        ))}
      </select>
      <select
        name="Version"
        id="Ver"
        onChange={(e) => {
          setSpriteVer(e.target.value);
        }}
      >
        {getkeys(getsearchedPoke?.sprites.versions[spriteGen]).map((key) => (
          <option value={key}>{key}</option>
        ))}
      </select>
    </div>
  );
}
