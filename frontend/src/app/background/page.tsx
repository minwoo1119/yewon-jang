import SiteShell from "../components/site-shell";
import styles from "../page.module.css";

export default function BackgroundPage() {
  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Education & Experience</p>
          <h2>학력과 연구 경력을 간결한 타임라인으로 정리했습니다.</h2>
        </div>

        <div className={styles.timeline}>
          <article className={styles.timelineItem}>
            <span className={styles.timelineYear}>2024 - Present</span>
            <div>
              <h3>M.S. in Computer Science</h3>
              <p>Institution Name, Human-Centered AI Lab</p>
              <p>
                Researching evaluation frameworks for collaborative AI systems
                and interpretable machine learning.
              </p>
            </div>
          </article>

          <article className={styles.timelineItem}>
            <span className={styles.timelineYear}>2022 - 2024</span>
            <div>
              <h3>Research Assistant</h3>
              <p>Department of Computer Science, Institution Name</p>
              <p>
                Supported data curation, experimental design, and publication
                development for longitudinal analysis projects.
              </p>
            </div>
          </article>

          <article className={styles.timelineItem}>
            <span className={styles.timelineYear}>2018 - 2022</span>
            <div>
              <h3>B.S. in Software and Data Science</h3>
              <p>Institution Name</p>
              <p>
                Built a foundation in machine learning, statistical modeling,
                and research communication.
              </p>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
