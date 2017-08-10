const apiUrl = 'http://localhost:1337';

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

  return mixedRequestWorkaround(builtUrl);
}

function mixedRequestWorkaround(url, callback) {
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({
      action: 'fetch',
      url
    }, resp => {
      if(resp && !resp.error) {
        resolve(resp);
      } else {
        // Probably not found in OMDB
        reject();
      }
    });
  });
}