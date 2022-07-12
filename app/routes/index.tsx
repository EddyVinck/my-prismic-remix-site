import { SliceZone } from "@prismicio/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Hero from "slices/Hero";
import { getPrismicClient } from "~/utils/prismic";

const client = getPrismicClient();

export const loader: LoaderFunction = async () => {
  const customType = "page";
  const uid = "home";

  try {
    const doc = await client.getByUID(customType, uid);
    return json(doc.data);
  } catch (error) {
    console.log(error);
    throw new Response("Not found", {
      status: 404,
    });
  }
};

export default function Index() {
  const data = useLoaderData();

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.4",
      }}
    >
      <h1>Welcome to Remix</h1>
      <SliceZone
        slices={data.slices}
        components={{ hero: Hero }}
      />
    </div>
  );
}
