import {
  createClient,
  getRepositoryEndpoint,
} from "@prismicio/client";
import type { LinkResolverFunction } from "@prismicio/helpers";

export const repoName = "my-prismic-remix-site";
// If your Prismic repo is private, add  your token here:
export const accessToken = "";
export const endpoint = getRepositoryEndpoint(repoName);

export const getPrismicClient = () => {
  return createClient(endpoint, {
    fetch,
    accessToken,
  });
};

export const linkResolver: LinkResolverFunction = (
  document
) => {
  if (document.isBroken) {
    return "/not-found";
  }
  if (document.uid === "home") {
    return `/${document.uid}`;
  }
  if (document.type === "page") {
    return `/${document.uid}`;
  }
  return "/";
};
