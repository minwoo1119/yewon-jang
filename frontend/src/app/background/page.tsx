"use client";

import SiteShell from "../components/site-shell";
import styles from "../page.module.css";
import { usePortfolio } from "../portfolio-store";

export default function BackgroundPage() {
  const { data } = usePortfolio();

  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Education & Experience</p>
          <h2>{data.backgroundTitle}</h2>
        </div>

        <div className={styles.timeline}>
          {data.backgroundItems.map((item) => (
            <article key={`${item.year}-${item.title}`} className={styles.timelineItem}>
              <span className={styles.timelineYear}>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
