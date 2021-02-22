import React, {useState, useEffect} from "react";
import axios from "axios";
import StartingCards from "../subcomponents/StartingCards";
import SelectedCard from "../subcomponents/SelectedCard";
import DropDown from "../subcomponents/DropDown";
import SpriteCollection from "../subcomponents/SpriteCollection";

export default function Home() {
  const [pokemonList, setPokemonList] = useState();
  const [totalCount, setTotalCount] = useState();
  const [randomPokeList, setRandomPokeList] = useState();
  const [clickedCard, setClickedCard] = useState();
  const [searchedPoke, setSearchedPoke] = useState();
  const [getsearchedPoke, setGetSearchedPoke] = useState();
  const [spriteGen, setSpriteGen] = useState("generation-i");
  const [spriteVer, setSpriteVer] = useState("red-blue");

  //find the species limit and create a list of all the species names/ url in it
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon-species/?limit=0")
      .then((res) => {
        setTotalCount(res.data.count);
        axios
          .get(`https://pokeapi.co/api/v2/pokemon?limit=${res.data.count}`)
          .then((res) => {
            setPokemonList(res.data.results);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  //generate a list of 20 random pokemon enclusive to minimun && the species limit
  useEffect(() => {
    if (totalCount) {
      const generateRandom = () => {
        let min = Math.ceil(19);
        let max = Math.floor(totalCount - 1);
        let randomArray = [];
        for (let i = 0; i < 20; i++) {
          randomArray.push(Math.floor(Math.random() * (max - min + 1) + min));
        }
        return randomArray;
      };
      setRandomPokeList(generateRandom);
    }
  }, [pokemonList]);

  // Automatically renders seleted card on click of a starting card

  useEffect(() => {
    searchPokeFunc(clickedCard);
  }, [clickedCard]);

  // Resets sprite version state when generation state has been changed.
  useEffect(() => {
    let keys = [];
    if (getsearchedPoke?.sprites.versions[spriteGen]) {
      for (const [key] of Object.entries(getsearchedPoke?.sprites.versions[spriteGen])) {
        keys.push(key);
        setSpriteVer(keys[0]);
      }
    }
  }, [spriteGen]);

  // Redner radom pokemon list with child eliment and set an image for each pokemon
  const renderStartingCards = () => {
    if (randomPokeList) {
      return randomPokeList.map((eachCard) => (
        <div
          className="starting-card-section__cards"
          onClick={() => setClickedCard(pokemonList[eachCard].name)}
          key={pokemonList[eachCard].name}
        >
          <StartingCards
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              pokemonList[eachCard].url.split("/")[6]
            }.png`}
            header={pokemonList[eachCard].name}
          />
        </div>
      ));
    } else {
      return <span>Loading Data</span>;
    }
  };

  // validates and filters input data then makes a call to get all data for a specific pokemon

  const searchPokeFunc = (setPoke) => {
    let validate = pokemonList?.filter(
      (pokemon) => pokemon.name === setPoke?.toLowerCase().split(" ").join("-")
    );
    if (setPoke && validate[0]) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${setPoke.toLowerCase().split(" ").join("-")}`)
        .then((res) => {
          setGetSearchedPoke(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <div>
      <section className="form-section">
        <form
          className="form-section__form"
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            searchPokeFunc(searchedPoke);
          }}
        >
          <input
            className="form-section__form__input"
            placeholder="search for Pokemon"
            onChange={(e) => {
              setSearchedPoke(e.target.value);
            }}
          />{" "}
          <div className="form-section__suggestion">
            {pokemonList?.map((pokemon) => {
              if (pokemon.name?.includes(searchedPoke) && pokemon.name[0] === searchedPoke[0]) {
                return (
                  <div className="form-section__suggestion__text" key={pokemon.name}>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                  </div>
                );
              }
            })}
          </div>
          <button type="submit" className="form-section__form__button">
            Search
          </button>
        </form>
      </section>
      <section className="selected-card-section">
        {getsearchedPoke ? (
          <SelectedCard
            name={getsearchedPoke?.name}
            height={getsearchedPoke?.height * 10 + " cm"}
            weight={getsearchedPoke?.weight / 10 + " Kg"}
            abilities={getsearchedPoke?.abilities}
            stats={getsearchedPoke?.stats}
            getsearchedPoke={getsearchedPoke}
            setSpriteGen={setSpriteGen}
            setSpriteVer={setSpriteVer}
            spriteGen={spriteGen}
            spriteObj={getsearchedPoke?.sprites.versions[spriteGen][spriteVer]}
            spriteVer={spriteVer}
          />
        ) : (
          <div></div>
        )}
      </section>
      {/* <section>
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
      </section> */}
      {/* <section>
        <SpriteCollection
          spriteObj={getsearchedPoke?.sprites.versions[spriteGen][spriteVer]}
          getsearchedPoke={getsearchedPoke}
          spriteGen={spriteGen}
          spriteVer={spriteVer}
        />
      </section> */}
      <section className="starting-card-section"> {renderStartingCards()}</section>
    </div>
  );
}
