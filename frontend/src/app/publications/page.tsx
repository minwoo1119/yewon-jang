import SiteShell from "../components/site-shell";
import styles from "../page.module.css";

export default function PublicationsPage() {
  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Publications</p>
          <h2>연도별로 정리한 주요 논문과 연구 산출물입니다.</h2>
        </div>

        <div className={styles.publicationYear}>
          <h3>2026</h3>
          <div className={styles.publicationList}>
            <article className={styles.listCard}>
              <div className={styles.metaRow}>
                <span>Journal Article</span>
                <span>First Author</span>
              </div>
              <h4>Mechanical Reliability Evaluation of Lightweight Composite Structures</h4>
              <p>
                Yewon Jang, Co-author Name. <em>Journal of Materials Processing
                and Mechanical Design</em>.
              </p>
              <div className={styles.inlineLinks}>
                <a href="https://doi.org/10.0000/example-2026">DOI</a>
                <a href="https://example.com/paper-2026">Paper</a>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.publicationYear}>
          <h3>2025</h3>
          <div className={styles.publicationList}>
            <article className={styles.listCard}>
              <div className={styles.metaRow}>
                <span>Conference Paper</span>
                <span>Co-Author</span>
              </div>
              <h4>Effects of Processing Parameters on the Mechanical Properties of Engineered Alloys</h4>
              <p>
                Co-author Name, Yewon Jang. <em>Proceedings of the Korean Society
                of Mechanical Engineers Annual Meeting</em>.
              </p>
              <div className={styles.inlineLinks}>
                <a href="https://doi.org/10.0000/example-2025">DOI</a>
                <a href="https://example.com/paper-2025">Paper</a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
