export function getAllPeople(func) {
  fetch('/api/people/all')
  .then(response => {
    if (!response.ok)
      throw Error(response.statusText);
    return response.json();
  })
  .then(responseJson => func(responseJson))
  .catch(error => console.log(error));
}

export function getPerson(id, func) {
  fetch('/api/people/' + id)
  .then(response => {
    if (!response.ok)
      throw Error(response.statusText);
    return response.json();
  })
  .then(responseJson => func(responseJson))
  .catch(error => console.log(error));
}