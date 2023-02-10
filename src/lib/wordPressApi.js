const API_URL = import.meta.env.WP_URL;

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

// Pages
export async function getAllPagesWithSlugs() {
  const data = await fetchAPI(`
  {
    pages(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.pages;
}

export async function getPageBySlug(slug) {
  const data = await fetchAPI(`
  {
    page(id: "${slug}", idType: URI) {
      title
      content
    }
  }
  `);
  return data?.page;
}

export async function getPagePreviews() {
  const data = await fetchAPI(`
  {
    pages(first: 10) {
      edges {
        node {
          slug
          title
        }
      }
    }
  }
  `);
  return data?.pages;
}

// Posts
export async function getPostPreviews() {
  const data = await fetchAPI(`
  {
    posts(first: 6) {
      edges {
        node {
          slug
          title
          excerpt
        }
      }
    }
  }
  `);
  return data?.posts;
}

export async function getPostBySlug(slug) {
  const data = await fetchAPI(`
  {
    post(id: "${slug}", idType: SLUG) {
      title
      content
    }
  }
  `);
  return data?.post;
}

export async function getAllPosts() {
  const data = await fetchAPI(`
  {
    posts {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.posts;
}
