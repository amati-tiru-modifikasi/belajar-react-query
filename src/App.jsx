import React from "react";
import { useQuery } from "react-query";
import axios from "axios";


function App() {
  return (
    <div>
      <Pokemon queryKey="pokemon1" />
      <br />
      <Pokemon queryKey="pokemon2" />
    </div>
  )
}

function Pokemon({ queryKey }) {
  const queryInfo = useQuery(queryKey, async () => {
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
