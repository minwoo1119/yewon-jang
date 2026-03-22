"use client";

import SiteShell from "../components/site-shell";
import styles from "../page.module.css";
import { usePortfolio } from "../portfolio-store";

export default function ContactPage() {
  const { data } = usePortfolio();

  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Contact</p>
          <h2>{data.contactTitle}</h2>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.contactGrid}>
            {data.contactItems.map((item) => (
              <article key={item.label} className={styles.contactItem}>
                <span>{item.label}</span>
                {item.href ? <a href={item.href}>{item.value}</a> : <p>{item.value}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
