import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPrismicClient } from "~/utils/prismicio";
import { removePrismicDocFromCache } from "~/utils/prismicio.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }
  const payload = await request.json();
  if (payload.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return json({ message: "Signature mismatch" }, 401);
  }

  return deleteCacheEntries(payload);
};

async function deleteCacheEntries(payload: any) {
  const client = getPrismicClient();
  try {
    if (payload.type !== "api-update" && payload.documents.length <= 0) {
      throw new Error("No documents to delete");
    }

    const documents = await client.getAllByIDs(payload.documents);

    // Get a list of UIDs and use them to update the cache
    documents
      .filter((doc) => !!doc.uid)
      .map(async (doc) => {
        const uid = doc.uid as string;
        console.log(`deleting uid ${uid}`);
        removePrismicDocFromCache(uid);
      });

    return json({ updated: true }, { status: 200 });
  } catch (err) {
    return json({ message: "Error updating cache" }, { status: 500 });
  }
}
