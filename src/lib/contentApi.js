import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import {
  getPostPreviews as wpGetPostPreviews,
  getPostBySlug as wpGetPostBySlug,
  getAllPosts as wpGetAllPosts,
} from "./wordPressApi";
import { getPostPreviews as cGetPostPreviews } from "./contentfulApi";
import testContent from "./testContent";

export async function getPostPreviews() {
  const wpPreviews = await wpGetPostPreviews();
  const cPreviews = await cGetPostPreviews();

  const previewObj = [];

  // Add WordPress to Object
  wpPreviews.edges.map((post) => {
    previewObj.push({
      title: post.node.title,
      excerpt: post.node.excerpt,
      slug: post.node.slug,
    });
  });

  // Add Contentful to Object
  cPreviews.postCollection.items.map((post) => {
    previewObj.push({
      title: post.title,
      excerpt: post.excerpt, //documentToHtmlString(post.content.json),
      slug: post.slug,
    });
  });

  // Add TestContent to Object
  testContent.map((post) => {
    previewObj.push({
      title: post.title,
      excerpt: post.body,
      slug: post.href,
    });
  });

  return previewObj;
}

export async function getPostBySlug(slug) {
  const wpPost = await wpGetPostBySlug(slug);
  return wpPost;
}

export async function getAllPosts() {
  const wpPosts = await wpGetAllPosts();
  return wpPosts;
}
