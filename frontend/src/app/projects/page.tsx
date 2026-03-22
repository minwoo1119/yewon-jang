import SiteShell from "../components/site-shell";
import styles from "../page.module.css";

export default function ProjectsPage() {
  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Research Projects</p>
          <h2>진행 중인 연구 프로그램과 구현 중심 프로젝트를 포함합니다.</h2>
        </div>

        <div className={styles.projectGrid}>
          <article className={styles.projectCard}>
            <div className={styles.projectImage} aria-hidden="true" />
            <div className={styles.projectBody}>
              <p className={styles.cardLabel}>Research Program</p>
              <h3>Human-Centered Analysis Workflow Design</h3>
              <p>
                Designing interpretable interfaces for analysts who need to
                inspect evidence, models, and uncertainty in the same workflow.
              </p>
            </div>
          </article>

          <article className={styles.projectCard}>
            <div className={styles.projectImageAlt} aria-hidden="true" />
            <div className={styles.projectBody}>
              <p className={styles.cardLabel}>Infrastructure</p>
              <h3>Reproducible Evaluation Toolkit</h3>
              <p>
                Building lightweight evaluation infrastructure for experiments,
                reporting, and publication-ready result tracking.
              </p>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
