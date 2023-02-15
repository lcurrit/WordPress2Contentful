import contentful from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const API_URL = import.meta.env.CONTENTFUL_API_URL;
const API_TOKEN = import.meta.env.CONTENTFUL_BEARER_TOKEN;
const API_SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID;

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

const client = contentful.createClient({
  space: API_SPACE_ID,
  accessToken: API_TOKEN,
});

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ({
      data: {
        target: { fields },
      },
    }) =>
      `<img src="${fields.file.url}" height="${fields.file.details.image.height}" width="${fields.file.details.image.width}" alt="${fields.description}"/>`,
  },
};

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

export async function getPostBySlug(slug) {
  // const data = await fetchAPI(`
  // {
  //   postCollection(where: {slug: "${slug}"} ) {
  //     items {
  //       title
  //       content {
  //         json
  //       }
  //     }
  //   }
  // }
  // `);
  // return data;
  const post = await client
    .getEntries({
      content_type: "post",
      limit: 1,
      include: 10,
      "fields.slug": slug,
    })
    .then((entry) => {
      return {
        title: entry.items[0].fields.title,
        content: documentToHtmlString(
          entry.items[0].fields.content,
          renderOptions
        ),
      };
    })
    .catch(console.error);
  return post;
}

export async function getAllPosts() {
  const data = await fetchAPI(`
  {
    postCollection {
      items {
        slug
      }
    }
  }
  `);
  return data;
}
