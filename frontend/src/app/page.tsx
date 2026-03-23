"use client";

import SiteShell from "./components/site-shell";
import styles from "./page.module.css";
import { usePortfolio } from "./portfolio-store";

export default function Home() {
  const { data } = usePortfolio();

  return (
    <SiteShell>
      <section className={styles.hero}>
        <div className={styles.portraitFrame} aria-hidden="true">
          <div
            className={styles.portrait}
            style={
              data.heroImageUrl
                ? { backgroundImage: `url(${data.heroImageUrl})` }
                : undefined
            }
          />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{data.heroEyebrow}</p>
          <h1>{data.name}</h1>
          <p className={styles.heroRole}>{data.heroRole}</p>
          <p className={styles.description}>{data.heroDescription}</p>
          <div className={styles.linkRow}>
            {data.profileLinks.map((link, index) => (
              <a key={`profile-link-${index}`} href={link.href} className={styles.linkButton}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>About</p>
          <h2>{data.aboutTitle}</h2>
        </div>

        <div className={styles.twoColumn}>
          <article className={styles.panel}>
            <p className={styles.cardLabel}>Research Philosophy</p>
            <p>{data.philosophy}</p>
          </article>

          <article className={styles.panel}>
            <p className={styles.cardLabel}>Interests</p>
            <ul className={styles.detailList}>
              {data.interests.map((interest, index) => (
                <li key={`interest-${index}`}>{interest}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Recent Research</p>
          <h2>{data.recentResearchTitle}</h2>
        </div>

        <div className={styles.projectGrid}>
          {data.recentResearch.map((item, index) => (
            <article key={`recent-research-card-${index}`} className={styles.projectCard}>
              <div
                className={index % 2 === 0 ? styles.projectImage : styles.projectImageAlt}
                aria-hidden="true"
              />
              <div className={styles.projectBody}>
                <p className={styles.cardLabel}>{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Skills</p>
          <h2>{data.skillsTitle}</h2>
        </div>

        <div className={styles.tagGroup}>
          {data.skills.map((skill, index) => (
            <span key={`skill-${index}`} className={styles.tag}>
              {skill}
            </span>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
