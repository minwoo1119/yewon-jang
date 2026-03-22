"use client";

import SiteShell from "../components/site-shell";
import styles from "../page.module.css";
import { usePortfolio } from "../portfolio-store";

export default function PublicationsPage() {
  const { data } = usePortfolio();
  const publicationYears = [...new Set(data.publications.map((item) => item.year))];

  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Publications</p>
          <h2>{data.publicationsTitle}</h2>
        </div>

        {publicationYears.map((year) => (
          <div key={year} className={styles.publicationYear}>
            <h3>{year}</h3>
            <div className={styles.publicationList}>
              {data.publications
                .filter((item) => item.year === year)
                .map((item) => (
                  <article key={`${item.year}-${item.title}`} className={styles.listCard}>
                    <div className={styles.metaRow}>
                      <span>{item.type}</span>
                      <span>{item.role}</span>
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.citation}</p>
                    <div className={styles.inlineLinks}>
                      <a href={item.doi}>DOI</a>
                      <a href={item.paperUrl}>Paper</a>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
