import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: ({ image }) =>
        z.object({
          image: z
            .object({
              src: image(),
              alt: z.string(),
            })
            .optional(),
          tags: z.array(z.string()).length(3).optional(),
        }),
    }),
  }),
};
