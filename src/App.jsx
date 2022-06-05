import React from "react";
import { useQuery } from "react-query";
import axios from "axios";


function App() {
  const [pokemon, setPokemon] = React.useState('');
  return (
    <div>
      <input value={pokemon} onChange={e => setPokemon(e.target.value)} />
      <PokemonSearch pokemon={pokemon} />
    </div>
  )
}

function PokemonSearch() {
  const queryInfo = useQuery([pokemon], async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res => res.data)
  });
  return queryInfo.isLoading ? (
    "Loading..."
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      <h1>Show the Pokemon</h1>
      {/* {console.log(queryInfo.data)} */}
      {/* {queryInfo.data?.sprites?.front_default} ? (
        <img src={queryInfo.data.sprites.front_default} alt="pokemon" />
      ):(
        'Pokemon not found.'
      ) */}
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  );
}

// function usePokemon() {
//   return useQuery("pokemon", async () => {
//     await new Promise(resolve => setTimeout(resolve, 1000))
//     return axios
//       .get("https://pokeapi.co/api/v2/pokemon")
//       .then((res) => res.data.results)
//     });
// }

// function Count() {
//   const queryInfo = usePokemon()
//   return <h3>Your ar looking at {queryInfo.data?.length} pokemon</h3>
// }

// function Berries() {
//   const queryInfo = useQuery("berries", async () => {
//     await new Promise(resolve => setTimeout(resolve, 1000))
//     return axios
//       .get("https://pokeapi.co/api/v2/berry")
//       .then((res) => res.data.results)
//     });

//   return queryInfo.isLoading ? (
//     "Loading..."
//   ) : queryInfo.isError ? (
//     queryInfo.error.message
//   ) : (
//     <div>
//       {queryInfo.data?.map((result) => {
//         return <div key={result.name}>{result.name}</div>;
//       })}
//     </div>
//   );
// }

// function Pokemon() {
//   const queryInfo = useQuery("pokemon", async () => {
//     await new Promise(resolve => setTimeout(resolve, 1000))
//     return axios
//       .get("https://pokeapi.co/api/v2/pokemon")
//       .then((res) => res.data.results)
//     });

//   return queryInfo.isLoading ? (
//     "Loading..."
//   ) : queryInfo.isError ? (
//     queryInfo.error.message
//   ) : (
//     <div>
//       {queryInfo.data?.map((result) => {
//         return <div key={result.name}>{result.name}</div>;
//       })}
//     </div>
//   );
// }

export default App;
