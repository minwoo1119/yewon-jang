import SiteShell from "../components/site-shell";
import styles from "../page.module.css";

export default function ManagePage() {
  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Portfolio Management</p>
          <h2>포트폴리오 관리 페이지입니다.</h2>
        </div>

        <article className={styles.panel}>
          <p className={styles.cardLabel}>Admin</p>
          <p>
            향후 이 페이지에서 연구 이력, 프로젝트, 논문, 연락처 정보를 수정할 수
            있도록 확장할 수 있습니다.
          </p>
        </article>
      </section>
    </SiteShell>
  );
}
