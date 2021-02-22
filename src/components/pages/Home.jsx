import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Home() {
  const [pokemonList, setPokemonList] = useState();
  const [totalCount, setTotalCount] = useState();
  const [randomPokeList, setRandomPokeList] = useState();

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

  console.log(pokemonList);
  console.log(totalCount);
  console.log(randomPokeList);

  return <div></div>;
}
