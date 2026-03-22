import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>YJ</span>
          <div>
            <p className={styles.brandName}>Yewon Jang</p>
            <p className={styles.brandRole}>Research Portfolio</p>
          </div>
        </div>
        <nav className={styles.nav}>
          <a href="#about">About</a>
          <a href="#publications">Publications</a>
          <a href="#projects">Projects</a>
          <a href="#awards">Awards</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} id="about">
          <p className={styles.eyebrow}>Computational Researcher</p>
          <h1>
            Evidence-driven research, structured clearly for collaborators,
            reviewers, and institutions.
          </h1>
          <p className={styles.description}>
            This portfolio is designed to present publications, projects, and
            academic milestones with a calm visual rhythm and direct navigation.
          </p>
        </section>

        <section className={styles.content}>
          <article className={styles.featuredCard}>
            <p className={styles.cardLabel}>Profile</p>
            <h2>
              Research centered on interpretable systems, rigorous evaluation,
              and practical impact
            </h2>
            <p>
              Use this space to frame a primary research question, introduce
              your institutional affiliation, and establish the methods or
              domain expertise that define your work.
            </p>
          </article>

          <section className={styles.section} id="publications">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>Publications</p>
              <h2>Peer-reviewed work and recent scholarly output</h2>
            </div>

            <div className={styles.stack}>
              <article className={styles.listCard}>
                <div className={styles.metaRow}>
                  <span>2026</span>
                  <span>Journal Article</span>
                </div>
                <h3>Interpretable Models for Longitudinal Evidence Synthesis</h3>
                <p>
                  Summarize the paper contribution, co-authors, venue, and the
                  methodological significance in two concise lines.
                </p>
              </article>

              <article className={styles.listCard}>
                <div className={styles.metaRow}>
                  <span>2025</span>
                  <span>Conference Paper</span>
                </div>
                <h3>
                  Robust Evaluation Pipelines for Reproducible Research Systems
                </h3>
                <p>
                  Highlight the problem setting, benchmark or dataset, and the
                  measurable outcome that makes this publication notable.
                </p>
              </article>
            </div>
          </section>

          <section className={styles.section} id="projects">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>Projects</p>
              <h2>Selected initiatives, tools, and collaborative programs</h2>
            </div>

            <div className={styles.grid}>
              <article className={styles.card}>
                <p className={styles.cardLabel}>Research Program</p>
                <h3>Human-centered analysis workflow design</h3>
                <p>
                  Describe an ongoing project that combines technical depth with
                  stakeholder relevance, such as clinical, policy, or education
                  applications.
                </p>
              </article>

              <article className={styles.card}>
                <p className={styles.cardLabel}>Infrastructure</p>
                <h3>Prepared for CMS integration</h3>
                <p>
                  The frontend structure is ready to connect with an admin-backed
                  NestJS service so updates can be managed from a private panel.
                </p>
              </article>
            </div>
          </section>

          <section className={styles.section} id="awards">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>Awards</p>
              <h2>Recognition, grants, and academic milestones</h2>
            </div>

            <div className={styles.timeline}>
              <article className={styles.timelineItem}>
                <span className={styles.timelineYear}>2026</span>
                <div>
                  <h3>Outstanding Research Award</h3>
                  <p>
                    Add the granting institution, selection context, and why
                    this recognition matters within your field.
                  </p>
                </div>
              </article>

              <article className={styles.timelineItem}>
                <span className={styles.timelineYear}>2025</span>
                <div>
                  <h3>Competitive Research Grant</h3>
                  <p>
                    Capture the funded theme, duration, and strategic value of
                    the project in one compact summary.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className={styles.section} id="contact">
            <div className={styles.contactCard}>
              <div className={styles.sectionHeading}>
                <p className={styles.sectionEyebrow}>Contact</p>
                <h2>
                  Open to research collaboration, invited talks, and academic
                  partnerships
                </h2>
              </div>

              <div className={styles.contactGrid}>
                <article className={styles.contactItem}>
                  <span>Email</span>
                  <a href="mailto:contact@example.com">contact@example.com</a>
                </article>

                <article className={styles.contactItem}>
                  <span>Affiliation</span>
                  <p>Department / Lab / Institution Name</p>
                </article>

                <article className={styles.contactItem}>
                  <span>Profiles</span>
                  <p>Google Scholar, ORCID, GitHub</p>
                </article>
              </div>
            </div>
          </section>
        </section>

        <section className={styles.bottomNote}>
          <article className={styles.noteCard}>
            <p className={styles.cardLabel}>Navigation</p>
            <h3>Section-based storytelling</h3>
            <p>
              The fixed header is now aligned with the main content structure so
              visitors can move directly to the information they need.
            </p>
          </article>

          <article className={styles.noteCard}>
            <p className={styles.cardLabel}>Next Step</p>
            <h3>Ready for dynamic content</h3>
            <p>
              These sections can now be connected to backend-managed data for
              publications, projects, awards, and contact details.
            </p>
          </article>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Yewon Jang Research Portfolio</p>
        <a href="mailto:contact@example.com">contact@example.com</a>
      </footer>
    </div>
  );
}
