"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/profile";

export function SiteNav() {
  const pathname = usePathname();
  const links = [
    { label: "Work", href: "/work" },
    { label: "Projects", href: "/projects" },
    { label: "Evidence", href: "/evidence" },
    { label: "Community", href: "/community" },
    { label: "About", href: "/#about" },
    ...(profile.cvUrl
      ? [
          {
            label: "CV",
            href: profile.cvUrl,
            download: true,
            ariaLabel: `Download CV of ${profile.name}`,
          },
        ]
      : []),
    { label: "Search", href: "/search" },
  ];

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/">
          Muhammad Naufal Hafiz
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => {
            const active =
              l.href.startsWith("/") &&
              !l.href.includes("#") &&
              (pathname === l.href || pathname.startsWith(`${l.href}/`));
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={active ? "is-active" : undefined}
                {...("download" in l && l.download ? { download: true } : {})}
                {...("ariaLabel" in l && l.ariaLabel
                  ? { "aria-label": l.ariaLabel as string }
                  : {})}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
