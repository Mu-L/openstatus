"use client";

import { NavBreadcrumb } from "@/components/nav/nav-breadcrumb";

export function Breadcrumb() {
  return (
    <NavBreadcrumb
      items={[
        {
          type: "link",
          label: "Status Pages",
          href: "/status-pages",
        },
        { type: "page", label: "Create Status Page" },
      ]}
    />
  );
}
