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
              <h3>M.S. in Mechanical Engineering</h3>
              <p>Institution Name, Materials and Mechanics Laboratory</p>
              <p>
                Conducting research on materials performance, structural
                reliability, and process-aware mechanical design.
              </p>
            </div>
          </article>

          <article className={styles.timelineItem}>
            <span className={styles.timelineYear}>2022 - 2024</span>
            <div>
              <h3>Research Assistant</h3>
              <p>Department of Mechanical Engineering, Institution Name</p>
              <p>
                Supported specimen preparation, mechanical testing, and analysis
                for projects in materials processing and structural evaluation.
              </p>
            </div>
          </article>

          <article className={styles.timelineItem}>
            <span className={styles.timelineYear}>2018 - 2022</span>
            <div>
              <h3>B.S. in Mechanical Engineering</h3>
              <p>Institution Name</p>
              <p>
                Built a foundation in solid mechanics, thermofluids, materials
                science, and engineering design.
              </p>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
