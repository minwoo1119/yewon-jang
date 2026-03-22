import Link from "next/link";
import styles from "../page.module.css";

type SiteShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/", label: "소개" },
  { href: "/background", label: "학력·경력" },
  { href: "/projects", label: "프로젝트" },
  { href: "/publications", label: "논문" },
  { href: "/contact", label: "연락처" },
];

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>© 2026 Yewon Jang. Built for a clear academic presentation.</p>
        <a href="mailto:contact@example.com">contact@example.com</a>
      </footer>
    </div>
  );
}
