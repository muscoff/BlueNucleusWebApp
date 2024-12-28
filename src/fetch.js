const fetchThing = async ({ queryKey }) => {

  const id = queryKey[1];
  const apiResponse = await fetch(`http://some-api.com/endpoint?id=${id}`);

  if (!apiResponse.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return apiResponse.json();
};

export default fetchThing;

export default function useBreadList(animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);
  return [results?.data?.breeds ?? [], results.status];
}

/* Usage 

const results = useQuery(["details", id])

if (results.isError) {

  return(
    <h1>Uh Oh, Error </h1>
  );
}

if (results.isLoading) {
  return(
    <div className="loading-pan">
      <h2 className="loader">loading...</h2>
    </div
  );
}

const thing = results.data.pets[0];

return(
  <div className="details">
    <div>
      <h1> {thing.name} </h1>
      <h2> {thing.email}</h2>
    </div>
  </div>
);

*/
