"use client";

import SiteShell from "../components/site-shell";
import styles from "../page.module.css";
import { usePortfolio } from "../portfolio-store";

export default function ProjectsPage() {
  const { data } = usePortfolio();

  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Research Projects</p>
          <h2>{data.projectsTitle}</h2>
        </div>

        <div className={styles.projectGrid}>
          {data.projects.map((project, index) => (
            <article key={project.title} className={styles.projectCard}>
              <div
                className={index % 2 === 0 ? styles.projectImage : styles.projectImageAlt}
                aria-hidden="true"
              />
              <div className={styles.projectBody}>
                <p className={styles.cardLabel}>{project.label}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
