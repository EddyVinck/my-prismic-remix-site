import { createClient, getRepositoryEndpoint } from "@prismicio/client";
import type { LinkResolverFunction } from "@prismicio/helpers";

export const repoName = "my-prismic-remix-site";
// If your Prismic repo is private, add  your token here via an environment variable
export const accessToken = "";
export const endpoint = getRepositoryEndpoint(repoName);

export const getPrismicClient = () => {
  return createClient(repoName, {
    accessToken,
  });
};

export const linkResolver: LinkResolverFunction = (document) => {
  if (document.isBroken) {
    return "/not-found";
  }
  if (document.type === "page") {
    if (document.uid === "home") {
      return `/${document.uid}`;
    }
    return `/${document.uid}`;
  }
  return "/";
};
