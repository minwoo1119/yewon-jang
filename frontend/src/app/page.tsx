import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="#about">소개</a>
          <a href="#background">학력·경력</a>
          <a href="#projects">프로젝트</a>
          <a href="#publications">논문</a>
          <a href="#contact">연락처</a>
        </nav>
      </header>

      <main className={styles.main}>
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

        <section className={styles.section} id="about">
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

        <section className={styles.section} id="background">
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

        <section className={styles.section} id="projects">
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
                  inspect evidence, models, and uncertainty in the same
                  workflow.
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

        <section className={styles.section} id="publications">
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
                <h4>Interpretable Models for Longitudinal Evidence Synthesis</h4>
                <p>
                  Yewon Jang, Co-author Name. <em>Journal of Responsible AI
                  Systems</em>.
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
                <h4>Robust Evaluation Pipelines for Reproducible Research Systems</h4>
                <p>
                  Co-author Name, Yewon Jang. <em>Proceedings of the Annual
                  Conference on Research Infrastructure</em>.
                </p>
                <div className={styles.inlineLinks}>
                  <a href="https://doi.org/10.0000/example-2025">DOI</a>
                  <a href="https://example.com/paper-2025">Paper</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section} id="awards">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Awards</p>
            <h2>연구 성과와 지원 이력을 짧고 명확하게 제시합니다.</h2>
          </div>

          <div className={styles.awardList}>
            <article className={styles.panel}>
              <p className={styles.awardYear}>2026</p>
              <h3>Outstanding Research Award</h3>
              <p>
                Awarded by Institution Name for methodological contributions to
                interpretable research systems.
              </p>
            </article>

            <article className={styles.panel}>
              <p className={styles.awardYear}>2025</p>
              <h3>Competitive Research Grant</h3>
              <p>
                Supported a one-year project on collaborative evaluation
                pipelines for evidence synthesis.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.section} id="contact">
          <div className={styles.contactCard}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>Contact</p>
              <h2>공동 연구, 발표, 학술 협업 제안을 환영합니다.</h2>
            </div>

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
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Yewon Jang. Built for a clear academic presentation.</p>
        <a href="mailto:contact@example.com">contact@example.com</a>
      </footer>
    </div>
  );
}
