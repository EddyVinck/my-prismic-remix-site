import type { FC } from "react";
import type { SliceComponentProps, SliceLikeRestV2 } from "@prismicio/react";
import type * as prismicT from "@prismicio/types";

import { PrismicRichText } from "@prismicio/react";

interface SliceData extends SliceLikeRestV2 {
  primary: {
    title: prismicT.RichTextField;
    description: prismicT.RichTextField;
  };
}
type Props = SliceComponentProps<SliceData>;

const Hero: FC<Props> = ({ slice }) => (
  <section>
    {slice.primary.title && <PrismicRichText field={slice.primary.title} />}
    {slice.primary.description && (
      <PrismicRichText field={slice.primary.description} />
    )}
  </section>
);

export default Hero;
