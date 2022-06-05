import React from "react";
import { useQuery } from "react-query";
import axios from "axios";


function App() {
  return (
    <div>
      <Count />
      <Pokemon />
    </div>
  )
}

function usePokemon() {
  return useQuery("pokemon", async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.data.results)
    });
}

function Count() {
  const queryInfo = usePokemon()
  return <h3>Your ar looking at {queryInfo.data?.length} pokemon</h3>
}

function Pokemon() {
  const queryInfo = useQuery("pokemon", async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.data.results)
    });

  return queryInfo.isLoading ? (
    "Loading..."
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo.data?.map((result) => {
        return <div key={result.name}>{result.name}</div>;
      })}
    </div>
  );
}

export default App;
