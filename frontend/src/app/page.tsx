import SiteShell from "./components/site-shell";
import styles from "./page.module.css";

export default function Home() {
  return (
    <SiteShell>
        <section className={styles.hero}>
          <div className={styles.portraitFrame} aria-hidden="true">
            <div className={styles.portrait} />
          </div>

          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Research Portfolio</p>
            <h1>Yewon Jang</h1>
            <p className={styles.heroRole}>Graduate Researcher, Mechanical Engineering</p>
            <p className={styles.description}>
              Research in materials, advanced manufacturing, and mechanical
              systems with an emphasis on reliable experiments and practical
              engineering applications.
            </p>
            <div className={styles.linkRow}>
              <a href="https://scholar.google.com" className={styles.linkButton}>
                Google Scholar
              </a>
              <a href="https://orcid.org" className={styles.linkButton}>
                ORCID
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>About</p>
            <h2>재료, 소재, 기계 시스템을 연결하는 실험 중심 연구를 수행합니다.</h2>
          </div>

          <div className={styles.twoColumn}>
            <article className={styles.panel}>
              <p className={styles.cardLabel}>Research Philosophy</p>
              <p>
                재료 특성, 공정 조건, 구조적 거동 사이의 관계를 정량적으로 해석하는
                데 관심이 있습니다. 기초 물성 이해와 실제 기계 시스템 적용 사이의
                간극을 줄이는 연구를 지향합니다.
              </p>
            </article>

            <article className={styles.panel}>
              <p className={styles.cardLabel}>Interests</p>
              <ul className={styles.detailList}>
                <li>Structural and functional materials for engineering systems</li>
                <li>Mechanical behavior, durability, and failure analysis</li>
                <li>Manufacturing processes, testing, and performance evaluation</li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Recent Research</p>
            <h2>최근 연구 주제와 진행 중인 질문을 홈 화면에서 먼저 보여줍니다.</h2>
          </div>

          <div className={styles.projectGrid}>
            <article className={styles.projectCard}>
              <div className={styles.projectImage} aria-hidden="true" />
              <div className={styles.projectBody}>
                <p className={styles.cardLabel}>Current Study</p>
                <h3>Lightweight Material Design for Structural Reliability</h3>
                <p>
                  경량화와 강도 확보를 동시에 만족시키기 위한 소재 조성 및 구조 설계
                  전략을 검토하고 있습니다.
                </p>
              </div>
            </article>

            <article className={styles.projectCard}>
              <div className={styles.projectImageAlt} aria-hidden="true" />
              <div className={styles.projectBody}>
                <p className={styles.cardLabel}>Ongoing Question</p>
                <h3>Process-Property Relationships in Advanced Manufacturing</h3>
                <p>
                  가공 조건 변화가 미세조직과 기계적 성능에 어떤 영향을 미치는지
                  실험 기반으로 분석하고 있습니다.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Skills</p>
            <h2>기계공학 연구 수행에 필요한 실험, 해석, 설계 역량입니다.</h2>
          </div>

          <div className={styles.tagGroup}>
            <span className={styles.tag}>Materials Characterization</span>
            <span className={styles.tag}>Mechanical Testing</span>
            <span className={styles.tag}>CAD Modeling</span>
            <span className={styles.tag}>Finite Element Analysis</span>
            <span className={styles.tag}>Failure Analysis</span>
            <span className={styles.tag}>Experimental Design</span>
            <span className={styles.tag}>Data Analysis</span>
            <span className={styles.tag}>Advanced Manufacturing</span>
          </div>
        </section>
    </SiteShell>
  );
}
