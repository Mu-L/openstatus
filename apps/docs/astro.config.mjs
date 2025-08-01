import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightSidebarTopics from "starlight-sidebar-topics";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.openstatus.dev",
  vite: {
    plugins: [Icons({ compiler: "astro" }), tailwindcss()],
  },
  env: {
    schema: {
      NEXT_PUBLIC_OPENPANEL_CLIENT_ID: envField.string({
        access: "public",
        context: "client",
      }),
    },
  },
  integrations: [
    sitemap(),
    starlight({
      title: "OpenStatus Documentation",
      favicon: "/favicon.ico",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/openstatusHQ/openstatus",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://www.openstatus.dev/discord",
        },
        {
          icon: "blueSky",
          label: "BlueSky",
          href: "https://bsky.app/profile/openstatus.dev",
        },
      ],
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
        Head: "./src/components/Head.astro",
        Hero: "./src/components/Hero.astro",
        Footer: "./src/components/Footer.astro",
      },
      editLink: {
        baseUrl: "https://github.com/openstatusHQ/openstatus/app/docs",
      },
      customCss: [
        // Path to your Tailwind base styles:
        "./src/global.css",
        "./src/custom.css",
      ],
      plugins: [
        starlightSidebarTopics([
          {
            label: "Documentation",
            link: "/",
            id: "docs",
            icon: "open-book",
            items: [
              {
                label: "Getting Started",
                items: [
                  {
                    label: "Introduction",
                    slug: "getting-started/introduction",
                  },
                ],
              },
              {
                label: "Monitoring",
                items: [
                  { label: "Overview", slug: "monitoring/overview" },
                  {
                    label: "Create a monitor",
                    slug: "monitoring/create-monitor",
                  },
                  {
                    label: "Monitoring as Code",
                    slug: "monitoring/monitoring-as-code",
                  },
                  {
                    label: "View your results data",
                    slug: "monitoring/monitor-data-collected",
                  },
                  {
                    label: "Group your checks",
                    slug: "monitoring/group-monitor-tag",
                  },
                  {
                    label: "Clone a check",
                    slug: "monitoring/clone-monitor",
                  },
                  {
                    label: "OpenTelemetry",
                    slug: "monitoring/opentelemetry",
                  },
                  {
                    label: "Check Types",
                    collapsed: true,
                    items: [
                      {
                        label: "HTTP",
                        slug: "monitoring/type/http",
                      },
                      {
                        label: "TCP",
                        slug: "monitoring/type/tcp",
                      },
                    ],
                  },
                  {
                    label: "Customizations",
                    collapsed: true,
                    items: [
                      {
                        label: "Assertions",
                        slug: "monitoring/customization/assertions",
                      },
                      {
                        label: "Frequency",
                        slug: "monitoring/customization/frequency",
                      },
                      {
                        label: "Notifications",
                        slug: "monitoring/customization/notification",
                      },
                      {
                        label: "Locations",
                        slug: "monitoring/customization/locations",
                      },
                      {
                        label: "Timing",
                        slug: "monitoring/customization/timing",
                      },
                    ],
                  },
                ],
                collapsed: false,
              },
              {
                label: "Status Page",
                collapsed: true,

                items: [
                  { label: "Overview", slug: "status-page/overview" },
                  {
                    label: "Create your status page",
                    slug: "status-page/create-status-page",
                  },

                  {
                    label: "Work with Status Page",
                    autogenerate: { directory: "status-page/work" },
                    collapsed: false,
                  },
                  {
                    label: "Advanced",
                    autogenerate: { directory: "status-page/advanced" },
                    collapsed: true,
                  },
                ],
              },
              {
                label: "Incidents",
                collapsed: true,
                items: [
                  { label: "Overview", slug: "incident/overview" },
                  {
                    label: "Work with incident",
                    slug: "incident/work-with-incident",
                  },

                  {
                    label: "Incident Detail",
                    slug: "incident/incident-detail",
                  },
                ],
              },
              {
                label: "Alerting",
                collapsed: true,
                items: [
                  { label: "Overview", slug: "alerting/overview" },
                  {
                    label: "Notification Channels",
                    autogenerate: {
                      directory: "alerting/providers",
                      collapsed: true,
                    },
                  },
                ],
              },
              {
                label: "Developer Tools",
                collapsed: true,
                autogenerate: { directory: "tools" },
              },
              {
                label: "Support",
                collapsed: true,
                items: [
                  {
                    label: "Help",
                    slug: "help/support",
                    collapsed: true,
                  },
                ],
              },
            ],
          },
          {
            label: "CLI",
            icon: "seti:powershell",
            link: "/cli/getting-started",
            items: [
              {
                label: "CLI",
                items: [
                  {
                    label: "Getting Started",
                    slug: "cli/getting-started",
                  },
                  {
                    label: "Commands",
                    autogenerate: { directory: "cli/commands" },
                  },
                ],
              },
            ],
          },
          {
            label: "API Reference",
            icon: "puzzle",
            link: "https://api.openstatus.dev/v1",
          },
          {
            label: "Guides",
            icon: "rocket",
            link: "/guides/introduction",
            items: [
              {
                label: "Guides",
                autogenerate: { directory: "guides" },
              },
            ],
          },
          {
            label: "Contributing",
            icon: "heart",
            link: "/contributing/getting-started",
            items: [
              {
                label: "Contributing",
                autogenerate: { directory: "contributing" },
              },
            ],
          },
        ]),
        starlightLlmsTxt({
          projectName: "OpenStatus Documentation",
          description:
            "OpenStatus is an open-source global uptime monitoring platform that offers a status page and monitoring as code.",
        }),
      ],
    }),
  ],
});
