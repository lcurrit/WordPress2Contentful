const API_URL = import.meta.env.CONTENTFUL_API_URL;
const API_TOKEN = import.meta.env.CONTENTFUL_BEARER_TOKEN;

async function fetchAPI(query = {}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + API_TOKEN,
  };
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getPosts() {
  const data = await fetchAPI(`
  {
    postCollection {
      items {
        title
        excerpt
        content {
          json
        }
      }
    }
  }
  `);
  return data;
}

export async function getPostPreviews() {
  const data = await fetchAPI(`
  {
    postCollection {
      items {
        title
        excerpt
        slug
      }
    }
  }
  `);
  return data;
}
