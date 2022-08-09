import LRU from "lru-cache";
import { getPrismicClient } from "./prismic";
import type { PrismicDocument } from "@prismicio/types";

const options = {
  max: 500,
};

export const prismicCache = new LRU(options);

export function addPrismicDocToCache<Tdocument extends PrismicDocument>(
  uid: string,
  doc: Tdocument
) {
  prismicCache.set(uid, doc);
}

export function getCachedDataByUID(
  customType: string,
  uid: string
): Promise<PrismicDocument> {
  const client = getPrismicClient();
  const doc = prismicCache.get<PrismicDocument>(uid);
  if (typeof doc !== "undefined") {
    return Promise.resolve(doc);
  }

  return client.getByUID(customType, uid);
}
