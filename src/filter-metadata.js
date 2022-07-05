/*
  type Metadata = {
    url: string | null;
    siteName: string | null;
    title: string | null;
    description: string | null;
    keywords: string[] | null;
    author: string | null;
  };
*/

/**
 * Remove special caracters fro a given string
 * @param {string} str 
 * @returns {string} the escaped string without special caracters
 */
function cleanupQuery(str){
  return str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase();
}

/**
 * Filters the given Metadata array to only include the objects that match the given search query.
 * If the search query has multiple words,
 * treat each word as a separate search term to filter by,
 * in addition to gathering results from the overall query.
 * If the search query has special characters,
 * run the query filter with the special characters removed.
 * Can return an empty array if no Metadata objects match the search query.
 * @param {Metadata[]} metadata - An array of Metadata objects
 * @param {string} query - The search query string
 * @returns {Metadata[]} - An array of Metadata objects that match the given search query
 */

export default function filterMetadata(metadatas, query) {
  if (!Array.isArray(metadatas)){
    return [];
  } else if(!query){
    return metadatas;
  }

  return metadatas.filter(function (metadata) {
    for (let q of query.split(" ")) {
      if (!q){
        continue;
      }
      const cleanQuery = cleanupQuery(q);
      if (
      (metadata.url && cleanupQuery(metadata.url).includes(cleanQuery))
      || (metadata.siteName && cleanupQuery(metadata.siteName).includes(cleanQuery))
      || (metadata.description && cleanupQuery(metadata.description).includes(cleanQuery))
      || (metadata.title && cleanupQuery(metadata.title).includes(cleanQuery))
      || (metadata.keywords && (metadata.keywords.includes(cleanQuery) || metadata.keywords.filter(value => q.includes(value)).length))
      || (metadata.author && cleanupQuery(metadata.author).includes(cleanQuery))
      ){
        return true;
      }
    }
    return false;
  })
}