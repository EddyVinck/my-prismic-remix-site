import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/helpers";
import type { SliceComponentProps } from "@prismicio/react";
import type { HeroSlice } from "types.generated";

type Props = SliceComponentProps<HeroSlice>;

const Hero = ({ slice }: Props) => (
  <section>
    {isFilled.title(slice.primary.title) && (
      <PrismicRichText field={slice.primary.title} />
    )}
    {isFilled.richText(slice.primary.description) && (
      <PrismicRichText field={slice.primary.description} />
    )}
  </section>
);

export default Hero;
