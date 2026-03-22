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
              <p className={styles.cardLabel}>Materials Research</p>
              <h3>Fatigue and Durability Assessment of Structural Materials</h3>
              <p>
                Evaluating cyclic loading behavior and long-term durability of
                candidate materials for mechanically demanding applications.
              </p>
            </div>
          </article>

          <article className={styles.projectCard}>
            <div className={styles.projectImageAlt} aria-hidden="true" />
            <div className={styles.projectBody}>
              <p className={styles.cardLabel}>Manufacturing Study</p>
              <h3>Process Optimization for High-Performance Components</h3>
              <p>
                Studying how forming or additive manufacturing parameters affect
                microstructure, dimensional stability, and final performance.
              </p>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
