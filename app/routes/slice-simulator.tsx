import { SliceSimulator } from "@prismicio/slice-simulator-react";
import { SliceZone } from "@prismicio/react";
import { components } from "../../slices/index";
import state from "../../.slicemachine/libraries-state.json";

export const loader = () => {
  const includeSliceSimulator = process.env.NODE_ENV !== "production";

  if (!includeSliceSimulator) {
    throw new Response("Not found.", { status: 404 });
  }
  return true;
};

const SliceSimulatorPage = () => (
  <SliceSimulator
    sliceZone={({ slices }) => (
      <SliceZone slices={slices} components={components} />
    )}
    state={state}
  />
);

export default SliceSimulatorPage;
