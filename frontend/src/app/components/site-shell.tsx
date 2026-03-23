"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";
import { usePortfolio } from "../portfolio-store";

type SiteShellProps = {
  children: React.ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  const { data, locale, setLocale } = usePortfolio();
  const pathname = usePathname();
  const [isLocaleOpen, setIsLocaleOpen] = useState(false);
  const localeMenuRef = useRef<HTMLDivElement | null>(null);
  const emailItem = data.contactItems.find((item) => {
    const normalizedLabel = item.label.trim().toLowerCase();
    const normalizedValue = item.value.trim().toLowerCase();
    const normalizedHref = item.href?.trim().toLowerCase();

    return (
      normalizedLabel === "email" ||
      normalizedLabel === "e-mail" ||
      normalizedLabel === "이메일" ||
      normalizedHref?.startsWith("mailto:") ||
      normalizedValue.includes("@")
    );
  });
  const navItems =
    locale === "ko"
      ? [
          { href: "/", label: "소개" },
          { href: "/background", label: "학력·경력" },
          { href: "/projects", label: "프로젝트" },
          { href: "/publications", label: "논문" },
          { href: "/contact", label: "연락처" },
        ]
      : [
          { href: "/", label: "About" },
          { href: "/background", label: "Background" },
          { href: "/projects", label: "Projects" },
          { href: "/publications", label: "Publications" },
          { href: "/contact", label: "Contact" },
        ];

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!localeMenuRef.current?.contains(event.target as Node)) {
        setIsLocaleOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? styles.navLinkActive : styles.navLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.localeMenu} ref={localeMenuRef}>
          <span className={styles.localeLabel}>Language</span>
          <button
            type="button"
            className={styles.localeTrigger}
            aria-haspopup="menu"
            aria-expanded={isLocaleOpen}
            onClick={() => setIsLocaleOpen((current) => !current)}
          >
            <span className={styles.localeTriggerMeta}>Lang</span>
            <span className={styles.localeTriggerValue}>
              {locale === "ko" ? "한국어" : "English"}
            </span>
            <span
              className={
                isLocaleOpen ? styles.localeChevronOpen : styles.localeChevron
              }
              aria-hidden="true"
            />
          </button>

          {isLocaleOpen && (
            <div className={styles.localePopover} role="menu" aria-label="Language menu">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={locale === "ko"}
                className={
                  locale === "ko" ? styles.localeOptionActive : styles.localeOption
                }
                onClick={() => {
                  setLocale("ko");
                  setIsLocaleOpen(false);
                }}
              >
                <span className={styles.localeOptionTitle}>한국어</span>
                <span className={styles.localeOptionMeta}>Korean</span>
              </button>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={locale === "en"}
                className={
                  locale === "en" ? styles.localeOptionActive : styles.localeOption
                }
                onClick={() => {
                  setLocale("en");
                  setIsLocaleOpen(false);
                }}
              >
                <span className={styles.localeOptionTitle}>English</span>
                <span className={styles.localeOptionMeta}>English</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerIdentity}>
          <Link href="/manage" className={styles.footerName}>
            {data.name}
          </Link>
          <p>{data.footerRole}</p>
        </div>
        <div className={styles.footerMeta}>
          <p>{data.footerCopyright}</p>
          {emailItem?.href ? (
            <a href={emailItem.href}>{emailItem.value}</a>
          ) : (
            <p>{emailItem?.value}</p>
          )}
        </div>
      </footer>
    </div>
  );
}
