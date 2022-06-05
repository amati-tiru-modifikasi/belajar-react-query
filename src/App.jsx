import React from "react";
import { useQuery, QueryClient } from "react-query";
import axios from "axios";

const queryClient = new QueryClient()


function App() {
  const queryInfo = useQuery("pokemon", async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.data.results)
    }, {
      refetchOnWindowFocus: false
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
      <br />
      {queryClient.isFetching ? 'Updating.. ' : null}
    </div>
  );
}

export default App;
