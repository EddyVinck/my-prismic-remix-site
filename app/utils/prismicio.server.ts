import LRU from "lru-cache";
import { getPrismicClient } from "./prismicio";
import type { PrismicDocument } from "@prismicio/types";
import type { AllDocumentTypes } from "types.generated";

const options = {
  max: 500,
};

export const prismicCache = new LRU(options);

export function addPrismicDocToCache(uid: string, doc: PrismicDocument) {
  prismicCache.set(uid, doc);
}

type CustomType = AllDocumentTypes["type"];

export function getCachedDataByUID(
  customType: CustomType,
  uid: string
): Promise<PrismicDocument> {
  const client = getPrismicClient();
  const doc = prismicCache.get<PrismicDocument>(uid);
  if (typeof doc !== "undefined") {
    return Promise.resolve(doc);
  }

  return client.getByUID(customType, uid);
}

export function removePrismicDocFromCache(uid: string) {
  prismicCache.delete(uid);
}
