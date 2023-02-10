import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import { getPostPreviews as wordPressPostPreviews } from "./wordPressApi";
import { getPostPreviews as contentfulPostPreviews } from "./contentfulApi";
import testContent from "./testContent";

export async function getPostPreviews() {
  const wordPressPreviews = await wordPressPostPreviews();
  const contentfulPreviews = await contentfulPostPreviews();

  const contentObj = [];

  // Add WordPress to Object
  wordPressPreviews.edges.map((post) => {
    contentObj.push({
      title: post.node.title,
      excerpt: post.node.excerpt,
      slug: post.node.slug,
    });
  });

  // Add Contentful to Object
  contentfulPreviews.postCollection.items.map((post) => {
    contentObj.push({
      title: post.title,
      excerpt: post.excerpt, //documentToHtmlString(post.content.json),
      slug: post.slug,
    });
  });

  // Add TestContent to Object
  testContent.map((post) => {
    contentObj.push({
      title: post.title,
      excerpt: post.body,
      slug: post.href,
    });
  });

  //console.log("contentObj:", contentObj);

  return contentObj;
}
