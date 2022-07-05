// Note: Please do not use JSDOM or any other external library/package (sorry)
/*
type Metadata = {
  url: string;
  siteName: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
};
*/

/**
 * Gets the URL, site name, title, description, keywords, and author info out of the <head> meta tags from a given html string.
 * 1. Get the URL from the <meta property="og:url"> tag.
 * 2. Get the site name from the <meta property="og:site_name"> tag.
 * 3. Get the title from the the <title> tag.
 * 4. Get the description from the <meta property="og:description"> tag or the <meta name="description"> tag.
 * 5. Get the keywords from the <meta name="keywords"> tag and split them into an array.
 * 6. Get the author from the <meta name="author"> tag.
 * If any of the above tags are missing or if the values are empty, then the corresponding value will be null.
 * @param html The complete HTML document text to parse
 * @returns A Metadata object with data from the HTML <head>
 */

export default function getMetadata(html) {
  
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(html, "text/html");
  const title = xmlDoc.getElementsByTagName("title")[0]?.innerHTML;
  
  const url = xmlDoc.querySelector("meta[property='og:url']");
  const siteName = xmlDoc.querySelector("meta[property='og:site_name']");
  const description = xmlDoc.querySelector("meta[property='og:description']");
  const keywords = xmlDoc.querySelector("meta[name='keywords']");
  const author = xmlDoc.querySelector("meta[name='author']");

  return {
    url: url?(url.attributes.content.value || null):null,
    siteName: siteName?(siteName.attributes.content.value|| null):null,
    title: title || null,
    description:description?(description.attributes.content.value||null):null,
    keywords:(keywords?.attributes.content.value)?keywords.attributes.content.value.split(','):null,
    author: author?(author.attributes.content.value||null):null,
  };
}