import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPrismicClient } from "~/utils/prismicio";
import { addPrismicDocToCache } from "~/utils/prismicio.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }
  const payload = await request.json();
  if (payload.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return json({ message: "Signature mismatch" }, 401);
  }

  return updateCacheEntries(payload);
};

async function updateCacheEntries(payload: any) {
  const client = getPrismicClient();
  try {
    if (payload.type !== "api-update" && payload.documents.length <= 0) {
      throw new Error("No documents to update");
    }

    const documents = await client.getAllByIDs(payload.documents);

    // Get a list of UIDs and use them to update the cache
    await Promise.all(
      documents
        .filter((doc) => !!doc.uid)
        .map(async (doc) => {
          const uid = doc.uid as string;
          console.log(`updating uid ${uid}`);
          const updatedDoc = await client.getByUID(doc.type, uid);
          addPrismicDocToCache(uid, updatedDoc);
        })
    );

    return json({ updated: true }, { status: 200 });
  } catch (err) {
    return json({ message: "Error updating cache" }, { status: 500 });
  }
}
