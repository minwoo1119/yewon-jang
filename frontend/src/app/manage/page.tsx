"use client";

import { useState } from "react";
import SiteShell from "../components/site-shell";
import styles from "../page.module.css";
import { defaultPortfolioData, usePortfolio, type PortfolioData } from "../portfolio-store";

export default function ManagePage() {
  const { data, setData, resetData } = usePortfolio();
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const updateField = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const splitLines = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleUnlock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password.trim()) return;
    setDraft(data);
    setIsUnlocked(true);
  };

  const handleSave = () => {
    setData(draft);
  };

  const handleReset = () => {
    setDraft(defaultPortfolioData);
    resetData();
  };

  if (!isUnlocked) {
    return (
      <SiteShell>
        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Portfolio Management</p>
            <h2>관리 페이지 접근을 위해 암호를 입력하세요.</h2>
          </div>

          <form className={styles.authCard} onSubmit={handleUnlock}>
            <label className={styles.formField}>
              <span>Access Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
              />
            </label>
            <p className={styles.formHint}>
              현재는 백엔드 인증 연결 전 단계라서 입력 UI만 제공됩니다. 이후 서버
              검증 로직을 연결하면 됩니다.
            </p>
            <button type="submit" className={styles.primaryButton}>
              Continue
            </button>
          </form>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Portfolio Management</p>
          <h2>포트폴리오에 표시되는 모든 정보를 여기서 수정할 수 있습니다.</h2>
        </div>

        <div className={styles.manageLayout}>
          <article className={styles.managePanel}>
            <p className={styles.cardLabel}>Basic Information</p>
            <label className={styles.formField}>
              <span>Eyebrow</span>
              <input
                value={draft.heroEyebrow}
                onChange={(event) => updateField("heroEyebrow", event.target.value)}
              />
            </label>
            <label className={styles.formField}>
              <span>Name</span>
              <input
                value={draft.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </label>
            <label className={styles.formField}>
              <span>Role</span>
              <input
                value={draft.heroRole}
                onChange={(event) => updateField("heroRole", event.target.value)}
              />
            </label>
            <label className={styles.formField}>
              <span>Hero Description</span>
              <textarea
                value={draft.heroDescription}
                onChange={(event) => updateField("heroDescription", event.target.value)}
                rows={4}
              />
            </label>
            <label className={styles.formField}>
              <span>Profile Links</span>
              <textarea
                value={draft.profileLinks.map((item) => `${item.label}|${item.href}`).join("\n")}
                onChange={(event) =>
                  updateField(
                    "profileLinks",
                    splitLines(event.target.value).map((line) => {
                      const [label, href] = line.split("|");
                      return { label: label ?? "", href: href ?? "" };
                    }),
                  )
                }
                rows={4}
              />
            </label>
          </article>

          <article className={styles.managePanel}>
            <p className={styles.cardLabel}>Home Sections</p>
            <label className={styles.formField}>
              <span>About Title</span>
              <textarea
                value={draft.aboutTitle}
                onChange={(event) => updateField("aboutTitle", event.target.value)}
                rows={3}
              />
            </label>
            <label className={styles.formField}>
              <span>Research Philosophy</span>
              <textarea
                value={draft.philosophy}
                onChange={(event) => updateField("philosophy", event.target.value)}
                rows={5}
              />
            </label>
            <label className={styles.formField}>
              <span>Interests</span>
              <textarea
                value={draft.interests.join("\n")}
                onChange={(event) => updateField("interests", splitLines(event.target.value))}
                rows={4}
              />
            </label>
            <label className={styles.formField}>
              <span>Recent Research Title</span>
              <textarea
                value={draft.recentResearchTitle}
                onChange={(event) => updateField("recentResearchTitle", event.target.value)}
                rows={3}
              />
            </label>
            <label className={styles.formField}>
              <span>Skills Title</span>
              <textarea
                value={draft.skillsTitle}
                onChange={(event) => updateField("skillsTitle", event.target.value)}
                rows={3}
              />
            </label>
            <label className={styles.formField}>
              <span>Skills</span>
              <textarea
                value={draft.skills.join("\n")}
                onChange={(event) => updateField("skills", splitLines(event.target.value))}
                rows={6}
              />
            </label>
          </article>

          <article className={styles.managePanel}>
            <p className={styles.cardLabel}>Recent Research Cards</p>
            {draft.recentResearch.map((item, index) => (
              <div key={`${item.title}-${index}`} className={styles.formGroup}>
                <label className={styles.formField}>
                  <span>Label {index + 1}</span>
                  <input
                    value={item.label}
                    onChange={(event) =>
                      updateField(
                        "recentResearch",
                        draft.recentResearch.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, label: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Title {index + 1}</span>
                  <input
                    value={item.title}
                    onChange={(event) =>
                      updateField(
                        "recentResearch",
                        draft.recentResearch.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, title: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Description {index + 1}</span>
                  <textarea
                    value={item.description}
                    onChange={(event) =>
                      updateField(
                        "recentResearch",
                        draft.recentResearch.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, description: event.target.value }
                            : entry,
                        ),
                      )
                    }
                    rows={4}
                  />
                </label>
              </div>
            ))}
          </article>

          <article className={styles.managePanel}>
            <p className={styles.cardLabel}>Background</p>
            <label className={styles.formField}>
              <span>Background Title</span>
              <textarea
                value={draft.backgroundTitle}
                onChange={(event) => updateField("backgroundTitle", event.target.value)}
                rows={3}
              />
            </label>
            {draft.backgroundItems.map((item, index) => (
              <div key={`${item.year}-${item.title}`} className={styles.formGroup}>
                <label className={styles.formField}>
                  <span>Period {index + 1}</span>
                  <input
                    value={item.year}
                    onChange={(event) =>
                      updateField(
                        "backgroundItems",
                        draft.backgroundItems.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, year: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Title {index + 1}</span>
                  <input
                    value={item.title}
                    onChange={(event) =>
                      updateField(
                        "backgroundItems",
                        draft.backgroundItems.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, title: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Subtitle {index + 1}</span>
                  <input
                    value={item.subtitle}
                    onChange={(event) =>
                      updateField(
                        "backgroundItems",
                        draft.backgroundItems.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, subtitle: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Description {index + 1}</span>
                  <textarea
                    value={item.description}
                    onChange={(event) =>
                      updateField(
                        "backgroundItems",
                        draft.backgroundItems.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, description: event.target.value }
                            : entry,
                        ),
                      )
                    }
                    rows={4}
                  />
                </label>
              </div>
            ))}
          </article>

          <article className={styles.managePanel}>
            <p className={styles.cardLabel}>Projects</p>
            <label className={styles.formField}>
              <span>Projects Title</span>
              <textarea
                value={draft.projectsTitle}
                onChange={(event) => updateField("projectsTitle", event.target.value)}
                rows={3}
              />
            </label>
            {draft.projects.map((item, index) => (
              <div key={`${item.label}-${item.title}`} className={styles.formGroup}>
                <label className={styles.formField}>
                  <span>Label {index + 1}</span>
                  <input
                    value={item.label}
                    onChange={(event) =>
                      updateField(
                        "projects",
                        draft.projects.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, label: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Title {index + 1}</span>
                  <input
                    value={item.title}
                    onChange={(event) =>
                      updateField(
                        "projects",
                        draft.projects.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, title: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Description {index + 1}</span>
                  <textarea
                    value={item.description}
                    onChange={(event) =>
                      updateField(
                        "projects",
                        draft.projects.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, description: event.target.value }
                            : entry,
                        ),
                      )
                    }
                    rows={4}
                  />
                </label>
              </div>
            ))}
          </article>

          <article className={styles.managePanel}>
            <p className={styles.cardLabel}>Publications</p>
            <label className={styles.formField}>
              <span>Publications Title</span>
              <textarea
                value={draft.publicationsTitle}
                onChange={(event) => updateField("publicationsTitle", event.target.value)}
                rows={3}
              />
            </label>
            {draft.publications.map((item, index) => (
              <div key={`${item.year}-${item.title}`} className={styles.formGroup}>
                <label className={styles.formField}>
                  <span>Year {index + 1}</span>
                  <input
                    value={item.year}
                    onChange={(event) =>
                      updateField(
                        "publications",
                        draft.publications.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, year: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Type {index + 1}</span>
                  <input
                    value={item.type}
                    onChange={(event) =>
                      updateField(
                        "publications",
                        draft.publications.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, type: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Role {index + 1}</span>
                  <input
                    value={item.role}
                    onChange={(event) =>
                      updateField(
                        "publications",
                        draft.publications.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, role: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Title {index + 1}</span>
                  <input
                    value={item.title}
                    onChange={(event) =>
                      updateField(
                        "publications",
                        draft.publications.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, title: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Citation {index + 1}</span>
                  <textarea
                    value={item.citation}
                    onChange={(event) =>
                      updateField(
                        "publications",
                        draft.publications.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, citation: event.target.value }
                            : entry,
                        ),
                      )
                    }
                    rows={3}
                  />
                </label>
                <label className={styles.formField}>
                  <span>DOI URL {index + 1}</span>
                  <input
                    value={item.doi}
                    onChange={(event) =>
                      updateField(
                        "publications",
                        draft.publications.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, doi: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
                <label className={styles.formField}>
                  <span>Paper URL {index + 1}</span>
                  <input
                    value={item.paperUrl}
                    onChange={(event) =>
                      updateField(
                        "publications",
                        draft.publications.map((entry, entryIndex) =>
                          entryIndex === index
                            ? { ...entry, paperUrl: event.target.value }
                            : entry,
                        ),
                      )
                    }
                  />
                </label>
              </div>
            ))}
          </article>

          <article className={styles.managePanel}>
            <p className={styles.cardLabel}>Contact & Footer</p>
            <label className={styles.formField}>
              <span>Contact Title</span>
              <textarea
                value={draft.contactTitle}
                onChange={(event) => updateField("contactTitle", event.target.value)}
                rows={3}
              />
            </label>
            <label className={styles.formField}>
              <span>Contact Items</span>
              <textarea
                value={draft.contactItems
                  .map((item) => `${item.label}|${item.value}|${item.href ?? ""}`)
                  .join("\n")}
                onChange={(event) =>
                  updateField(
                    "contactItems",
                    splitLines(event.target.value).map((line) => {
                      const [label, value, href] = line.split("|");
                      return {
                        label: label ?? "",
                        value: value ?? "",
                        href: href || undefined,
                      };
                    }),
                  )
                }
                rows={5}
              />
            </label>
            <label className={styles.formField}>
              <span>Footer Role</span>
              <input
                value={draft.footerRole}
                onChange={(event) => updateField("footerRole", event.target.value)}
              />
            </label>
            <label className={styles.formField}>
              <span>Copyright</span>
              <input
                value={draft.footerCopyright}
                onChange={(event) => updateField("footerCopyright", event.target.value)}
              />
            </label>
          </article>
        </div>

        <div className={styles.manageActions}>
          <button type="button" className={styles.primaryButton} onClick={handleSave}>
            Save Changes
          </button>
          <button type="button" className={styles.secondaryButton} onClick={handleReset}>
            Reset to Default
          </button>
        </div>
      </section>
    </SiteShell>
  );
}
