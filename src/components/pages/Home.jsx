import React, {useState, useEffect} from "react";
import axios from "axios";
import StartingCards from "../subcomponents/StartingCards";

export default function Home() {
  const [pokemonList, setPokemonList] = useState();
  const [totalCount, setTotalCount] = useState();
  const [randomPokeList, setRandomPokeList] = useState();
  const [clickedCard, setClickedCard] = useState();
  const [searchedPoke, setSearchedPoke] = useState();
  const [getsearchedPoke, setGetSearchedPoke] = useState();

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

  //redner radom pokemon list with child eliment and set an image for each pokemon
  const renderStartingCards = () => {
    if (randomPokeList) {
      return randomPokeList.map((eachCard) => (
        <div onClick={() => setClickedCard(pokemonList[eachCard].name)}>
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

  console.log(pokemonList);
  console.log(totalCount);
  console.log(randomPokeList);
  console.log(clickedCard);
  console.log(getsearchedPoke);

  return (
    <div>
      <div>
        <form
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            searchPokeFunc(searchedPoke);
          }}
        >
          <input
            placeholder="search for Pokemon"
            onChange={(e) => {
              setSearchedPoke(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>
        <div></div>
      </div>
      <div> {renderStartingCards()}</div>
    </div>
  );
}
