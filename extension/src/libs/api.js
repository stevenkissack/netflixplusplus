//const apiUrl = 'http://localhost:1337';
const apiUrl = 'https://netflixplusplus.herokuapp.com';

export async function fetchInfo(details) {
  // details: parsed information abstracted from dom node
  let builtUrl = apiUrl + '/details';
  
  if(!details.title) {
    console.warn('Did not pass title to fetch');
    return null;
  } else {
    builtUrl += `?title=${encodeURIComponent(details.title)}`;
  }

  if(details.type) builtUrl += `&type=${encodeURIComponent(details.type)}`;
  
  if(details.year !== null) builtUrl += `&year=${encodeURIComponent(details.year)}`;

  //return mixedRequestWorkaround(builtUrl);

  return fetch(builtUrl)
		.then(res => res.json())
}