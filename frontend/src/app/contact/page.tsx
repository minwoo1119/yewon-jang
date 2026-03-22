import SiteShell from "../components/site-shell";
import styles from "../page.module.css";

export default function ContactPage() {
  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Contact</p>
          <h2>재료, 소재, 기계공학 관련 공동 연구와 학술 협업을 환영합니다.</h2>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.contactGrid}>
            <article className={styles.contactItem}>
              <span>Email</span>
              <a href="mailto:contact@example.com">contact@example.com</a>
            </article>

            <article className={styles.contactItem}>
              <span>Affiliation</span>
              <p>Department of Mechanical Engineering / Lab / Institution Name</p>
            </article>

            <article className={styles.contactItem}>
              <span>Office</span>
              <p>Seoul, Republic of Korea</p>
            </article>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
