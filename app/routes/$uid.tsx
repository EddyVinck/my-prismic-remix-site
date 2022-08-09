import { SliceZone } from "@prismicio/react";
import type { PrismicDocument } from "@prismicio/types";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import Hero from "slices/Hero";
import {
  addPrismicDocToCache,
  getCachedDataByUID,
} from "~/utils/prismicio.server";

export const loader: LoaderFunction = async ({ params }) => {
  const customType = "page";
  const uid = params.uid as string;

  if (uid === "home") {
    return redirect("/");
  }

  try {
    const doc = await getCachedDataByUID(customType, uid);
    addPrismicDocToCache(uid, doc);
    return json(doc.data);
  } catch (error) {
    throw new Response("Not found", {
      status: 404,
    });
  }
};

export default function Index() {
  const data = useLoaderData<PrismicDocument["data"]>();
  const params = useParams();

  return (
    <div>
      <h1>Welcome to routes/{params.uid}</h1>
      <SliceZone slices={data.slices} components={{ hero: Hero }} />
    </div>
  );
}
