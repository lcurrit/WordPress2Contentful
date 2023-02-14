import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import {
  getPostPreviews as wpGetPostPreviews,
  getPostBySlug as wpGetPostBySlug,
  getAllPosts as wpGetAllPosts,
} from "./wordPressApi";
import {
  getPostPreviews as cGetPostPreviews,
  getPostBySlug as cGetPostBySlug,
  getAllPosts as cGetAllPosts,
} from "./contentfulApi";
import testContent from "./testContent";

export async function getPostPreviews() {
  const wpPreviews = await wpGetPostPreviews();
  const cPreviews = await cGetPostPreviews();

  const previewArray = [];

  // Add WordPress to Object
  wpPreviews.edges.map((post) => {
    previewArray.push({
      title: post.node.title,
      excerpt: post.node.excerpt,
      slug: post.node.slug,
      source: "wordpress",
    });
  });

  // Add Contentful to Object
  cPreviews.postCollection.items.map((post) => {
    previewArray.push({
      title: post.title,
      excerpt: post.excerpt, //documentToHtmlString(post.content.json),
      slug: post.slug,
      source: "contentful",
    });
  });

  // Add TestContent to Object
  testContent.map((post) => {
    previewArray.push({
      title: post.title,
      excerpt: post.body,
      slug: post.href,
      source: "testcontent",
    });
  });

  return previewArray.slice(0, 12);
}

export async function getPostBySlug(slug, source) {
  switch (source) {
    case "wordpress":
      const wpPost = await wpGetPostBySlug(slug);
      return {
        title: wpPost.title,
        content: wpPost.content,
      };

    case "contentful":
      const cPost = await cGetPostBySlug(slug);
      return {
        title: cPost.postCollection.items[0].title,
        content: documentToHtmlString(
          cPost.postCollection.items[0].content.json
        ),
      };

    default:
      return {
        title: "",
        content: "",
      };
  }
}

export async function getAllPosts() {
  const wpPosts = await wpGetAllPosts();
  const cPosts = await cGetAllPosts();

  const postsArray = [];

  // Add WordPress Slugs to Array
  wpPosts.edges.map((post) => {
    postsArray.push({
      slug: post.node.slug,
      source: "wordpress",
    });
  });

  // Add Contentful Slugs to Array
  cPosts.postCollection.items.map((post) => {
    postsArray.push({
      slug: post.slug,
      source: "contentful",
    });
  });

  return postsArray;
}
