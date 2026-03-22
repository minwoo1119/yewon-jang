import SiteShell from "../components/site-shell";
import styles from "../page.module.css";

export default function ContactPage() {
  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Contact</p>
          <h2>공동 연구, 발표, 학술 협업 제안을 환영합니다.</h2>
        </div>

        <div className={styles.contactCard}>
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
              <span>Office</span>
              <p>Seoul, Republic of Korea</p>
            </article>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
