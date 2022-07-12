import {
  createClient,
  getRepositoryEndpoint,
} from "@prismicio/client";

export const repoName = "my-prismic-remix-site";
// If your Prismic repo is private, add  your token here:
export const accessToken = "";
export const endpoint = getRepositoryEndpoint(repoName);

export const getPrismicClient = () => {
  return createClient(endpoint, {
    fetch,
    accessToken,
    /* TODO routes? */
  });
};
