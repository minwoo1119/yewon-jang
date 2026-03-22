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
            <p className={styles.heroRole}>
              Graduate Researcher, Human-Centered AI Lab
            </p>
            <p className={styles.description}>
              Interpretable machine learning, reproducible evaluation pipelines,
              and research systems designed for real collaboration.
            </p>
            <div className={styles.linkRow}>
              <a href="https://scholar.google.com" className={styles.linkButton}>
                Google Scholar
              </a>
              <a href="https://orcid.org" className={styles.linkButton}>
                ORCID
              </a>
              <a href="https://github.com" className={styles.linkButton}>
                GitHub
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>About</p>
            <h2>정제된 질문 설정과 재현 가능한 연구 설계를 중심으로 작업합니다.</h2>
          </div>

          <div className={styles.twoColumn}>
            <article className={styles.panel}>
              <p className={styles.cardLabel}>Research Philosophy</p>
              <p>
                연구 결과 자체보다도, 그 결과가 어떤 평가 체계와 설명 구조 안에서
                제시되는지를 중요하게 다룹니다. 복잡한 시스템을 더 해석 가능하고
                협업 가능한 형태로 만드는 것이 핵심 관심사입니다.
              </p>
            </article>

            <article className={styles.panel}>
              <p className={styles.cardLabel}>Interests</p>
              <ul className={styles.detailList}>
                <li>Interpretable machine learning and model transparency</li>
                <li>Evaluation pipelines for reproducible research workflows</li>
                <li>Human-centered tools for evidence synthesis and analysis</li>
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
                <h3>Interpretable Evaluation for Collaborative AI Systems</h3>
                <p>
                  사용자와 연구자가 함께 결과를 검토할 수 있는 평가 구조와
                  설명 가능한 리포팅 방식을 설계하고 있습니다.
                </p>
              </div>
            </article>

            <article className={styles.projectCard}>
              <div className={styles.projectImageAlt} aria-hidden="true" />
              <div className={styles.projectBody}>
                <p className={styles.cardLabel}>Ongoing Question</p>
                <h3>Evidence Synthesis Across Longitudinal Data</h3>
                <p>
                  장기적 데이터 흐름 안에서 해석 가능한 모델과 재현 가능한 분석
                  절차를 결합하는 문제를 다루고 있습니다.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Skills</p>
            <h2>연구와 구현을 함께 다루기 위한 핵심 기술 스택입니다.</h2>
          </div>

          <div className={styles.tagGroup}>
            <span className={styles.tag}>Python</span>
            <span className={styles.tag}>PyTorch</span>
            <span className={styles.tag}>Scikit-learn</span>
            <span className={styles.tag}>TypeScript</span>
            <span className={styles.tag}>React</span>
            <span className={styles.tag}>Next.js</span>
            <span className={styles.tag}>Data Visualization</span>
            <span className={styles.tag}>Experimental Design</span>
          </div>
        </section>
    </SiteShell>
  );
}
