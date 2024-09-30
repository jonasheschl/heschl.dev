import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "heschl.dev",
      expressiveCode: {
        plugins: [pluginCollapsibleSections()],
      },
      social: {
        github: "https://github.com/jonasheschl",
        mastodon: "https://mastodon.de/@jones",
        //email: "heschl@pm.me",
      },
      sidebar: [
        {
          label: "Welcome",
          autogenerate: { directory: "pwnmemo/welcome" },
        },
        {
          label: "Targets",
          autogenerate: { directory: "pwnmemo/targets" },
        },
        {
          label: "Tools",
          autogenerate: { directory: "pwnmemo/tools" },
        },
        {
          label: "Binaries",
          autogenerate: { directory: "pwnmemo/binaries" },
        },
        {
          label: "Misc",
          autogenerate: { directory: "pwnmemo/misc" },
        },
        {
          label: "Web",
          autogenerate: { directory: "pwnmemo/web" },
        },
        {
          label: "CTF Writeups",
          collapsed: true,
          items: [
            {
              label: "Google CTF 2023 — Under-Construction",
              link: "/blog/2023-06-26-google-ctf-2023-under-construction-writeup",
              attrs: { target: "_blank", style: "font-style: italic" },
            },
            {
              label: "openECSC 2024 – Life Quiz CTF Writeup",
              link: "/blog/2024-03-24-openecsc-2024-life-quiz-ctf-writeup",
              attrs: { target: "_blank", style: "font-style: italic" },
            },
          ],
        },
      ],
      components: {
        PageFrame: "./src/components/PageFrameOverride.astro",
        Pagination: "./src/components/PaginationOverride.astro",
        Header: "./src/components/HeaderOverride.astro",
      },
      customCss: [
        "@fontsource/merriweather-sans/400.css",
        "@fontsource/merriweather-sans/600.css",
        "@fontsource/jetbrains-mono/400.css",
        "./src/styles/global.css",
      ],
    }),
  ],
  redirects: {
    "/pwnmemo": "/pwnmemo/welcome/welcome",
    "/pwnmemo/welcome": "/pwnmemo/welcome/welcome",
  },
});
