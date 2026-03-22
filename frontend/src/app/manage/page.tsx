"use client";

import { useState } from "react";
import SiteShell from "../components/site-shell";
import styles from "../page.module.css";
import {
  defaultPortfolioData,
  usePortfolio,
  type ContactItem,
  type LinkItem,
  type PortfolioData,
  type ProjectItem,
  type PublicationItem,
  type ResearchItem,
  type TimelineItem,
} from "../portfolio-store";

type ManageSection =
  | "basic"
  | "home"
  | "background"
  | "projects"
  | "publications"
  | "contact";

const sections: { id: ManageSection; label: string }[] = [
  { id: "basic", label: "기본 정보" },
  { id: "home", label: "홈 화면" },
  { id: "background", label: "학력·경력" },
  { id: "projects", label: "프로젝트" },
  { id: "publications", label: "논문" },
  { id: "contact", label: "연락처·푸터" },
];

export default function ManagePage() {
  const { data, setData, resetData } = usePortfolio();
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeSection, setActiveSection] = useState<ManageSection>("basic");

  const updateField = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const updateArrayItem = <T,>(
    key: keyof PortfolioData,
    index: number,
    updater: (item: T) => T,
  ) => {
    setDraft((current) => {
      const items = current[key] as T[];
      return {
        ...current,
        [key]: items.map((item, itemIndex) =>
          itemIndex === index ? updater(item) : item,
        ),
      };
    });
  };

  const addArrayItem = <T,>(key: keyof PortfolioData, item: T) => {
    setDraft((current) => ({
      ...current,
      [key]: [...((current[key] as T[]) ?? []), item],
    }));
  };

  const removeArrayItem = <T,>(key: keyof PortfolioData, index: number) => {
    setDraft((current) => ({
      ...current,
      [key]: (current[key] as T[]).filter((_, itemIndex) => itemIndex !== index),
    }));
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
          <h2>섹션별로 내용을 나눠서 수정할 수 있도록 정리했습니다.</h2>
        </div>

        <div className={styles.manageTabs}>
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={
                activeSection === section.id
                  ? styles.manageTabActive
                  : styles.manageTab
              }
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>

        {activeSection === "basic" && (
          <div className={styles.manageLayout}>
            <article className={styles.managePanel}>
              <p className={styles.cardLabel}>기본 정보</p>
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
            </article>

            <article className={styles.managePanel}>
              <div className={styles.panelHeader}>
                <p className={styles.cardLabel}>외부 링크</p>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() =>
                    addArrayItem<LinkItem>("profileLinks", { label: "", href: "" })
                  }
                >
                  링크 추가
                </button>
              </div>
              {draft.profileLinks.map((item, index) => (
                <div key={`${item.label}-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>링크 {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => removeArrayItem<LinkItem>("profileLinks", index)}
                    >
                      삭제
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>Label</span>
                    <input
                      value={item.label}
                      onChange={(event) =>
                        updateArrayItem<LinkItem>("profileLinks", index, (current) => ({
                          ...current,
                          label: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>URL</span>
                    <input
                      value={item.href}
                      onChange={(event) =>
                        updateArrayItem<LinkItem>("profileLinks", index, (current) => ({
                          ...current,
                          href: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
              ))}
            </article>
          </div>
        )}

        {activeSection === "home" && (
          <div className={styles.manageLayout}>
            <article className={styles.managePanel}>
              <p className={styles.cardLabel}>소개 섹션</p>
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
                  rows={5}
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
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.cardLabel}>최근 연구 카드</p>
                  <p className={styles.formHint}>{draft.recentResearchTitle}</p>
                </div>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() =>
                    addArrayItem<ResearchItem>("recentResearch", {
                      label: "",
                      title: "",
                      description: "",
                    })
                  }
                >
                  카드 추가
                </button>
              </div>
              <label className={styles.formField}>
                <span>Recent Research Title</span>
                <textarea
                  value={draft.recentResearchTitle}
                  onChange={(event) =>
                    updateField("recentResearchTitle", event.target.value)
                  }
                  rows={3}
                />
              </label>
              {draft.recentResearch.map((item, index) => (
                <div key={`${item.title}-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>카드 {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() =>
                        removeArrayItem<ResearchItem>("recentResearch", index)
                      }
                    >
                      삭제
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>Label</span>
                    <input
                      value={item.label}
                      onChange={(event) =>
                        updateArrayItem<ResearchItem>("recentResearch", index, (current) => ({
                          ...current,
                          label: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Title</span>
                    <input
                      value={item.title}
                      onChange={(event) =>
                        updateArrayItem<ResearchItem>("recentResearch", index, (current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Description</span>
                    <textarea
                      value={item.description}
                      onChange={(event) =>
                        updateArrayItem<ResearchItem>("recentResearch", index, (current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      rows={4}
                    />
                  </label>
                </div>
              ))}
            </article>
          </div>
        )}

        {activeSection === "background" && (
          <div className={styles.manageLayout}>
            <article className={styles.managePanel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.cardLabel}>학력·경력</p>
                </div>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() =>
                    addArrayItem<TimelineItem>("backgroundItems", {
                      year: "",
                      title: "",
                      subtitle: "",
                      description: "",
                    })
                  }
                >
                  항목 추가
                </button>
              </div>
              <label className={styles.formField}>
                <span>Section Title</span>
                <textarea
                  value={draft.backgroundTitle}
                  onChange={(event) => updateField("backgroundTitle", event.target.value)}
                  rows={3}
                />
              </label>
              {draft.backgroundItems.map((item, index) => (
                <div key={`${item.year}-${item.title}-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>이력 {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() =>
                        removeArrayItem<TimelineItem>("backgroundItems", index)
                      }
                    >
                      삭제
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>Period</span>
                    <input
                      value={item.year}
                      onChange={(event) =>
                        updateArrayItem<TimelineItem>("backgroundItems", index, (current) => ({
                          ...current,
                          year: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Title</span>
                    <input
                      value={item.title}
                      onChange={(event) =>
                        updateArrayItem<TimelineItem>("backgroundItems", index, (current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Subtitle</span>
                    <input
                      value={item.subtitle}
                      onChange={(event) =>
                        updateArrayItem<TimelineItem>("backgroundItems", index, (current) => ({
                          ...current,
                          subtitle: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Description</span>
                    <textarea
                      value={item.description}
                      onChange={(event) =>
                        updateArrayItem<TimelineItem>("backgroundItems", index, (current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      rows={4}
                    />
                  </label>
                </div>
              ))}
            </article>
          </div>
        )}

        {activeSection === "projects" && (
          <div className={styles.manageLayout}>
            <article className={styles.managePanel}>
              <div className={styles.panelHeader}>
                <p className={styles.cardLabel}>프로젝트</p>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() =>
                    addArrayItem<ProjectItem>("projects", {
                      label: "",
                      title: "",
                      description: "",
                    })
                  }
                >
                  프로젝트 추가
                </button>
              </div>
              <label className={styles.formField}>
                <span>Section Title</span>
                <textarea
                  value={draft.projectsTitle}
                  onChange={(event) => updateField("projectsTitle", event.target.value)}
                  rows={3}
                />
              </label>
              {draft.projects.map((item, index) => (
                <div key={`${item.label}-${item.title}-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>프로젝트 {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => removeArrayItem<ProjectItem>("projects", index)}
                    >
                      삭제
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>Label</span>
                    <input
                      value={item.label}
                      onChange={(event) =>
                        updateArrayItem<ProjectItem>("projects", index, (current) => ({
                          ...current,
                          label: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Title</span>
                    <input
                      value={item.title}
                      onChange={(event) =>
                        updateArrayItem<ProjectItem>("projects", index, (current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Description</span>
                    <textarea
                      value={item.description}
                      onChange={(event) =>
                        updateArrayItem<ProjectItem>("projects", index, (current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      rows={4}
                    />
                  </label>
                </div>
              ))}
            </article>
          </div>
        )}

        {activeSection === "publications" && (
          <div className={styles.manageLayout}>
            <article className={styles.managePanel}>
              <div className={styles.panelHeader}>
                <p className={styles.cardLabel}>논문</p>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() =>
                    addArrayItem<PublicationItem>("publications", {
                      year: "",
                      type: "",
                      role: "",
                      title: "",
                      citation: "",
                      doi: "",
                      paperUrl: "",
                    })
                  }
                >
                  논문 추가
                </button>
              </div>
              <label className={styles.formField}>
                <span>Section Title</span>
                <textarea
                  value={draft.publicationsTitle}
                  onChange={(event) =>
                    updateField("publicationsTitle", event.target.value)
                  }
                  rows={3}
                />
              </label>
              {draft.publications.map((item, index) => (
                <div key={`${item.year}-${item.title}-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>논문 {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() =>
                        removeArrayItem<PublicationItem>("publications", index)
                      }
                    >
                      삭제
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>Year</span>
                    <input
                      value={item.year}
                      onChange={(event) =>
                        updateArrayItem<PublicationItem>("publications", index, (current) => ({
                          ...current,
                          year: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Type</span>
                    <input
                      value={item.type}
                      onChange={(event) =>
                        updateArrayItem<PublicationItem>("publications", index, (current) => ({
                          ...current,
                          type: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Role</span>
                    <input
                      value={item.role}
                      onChange={(event) =>
                        updateArrayItem<PublicationItem>("publications", index, (current) => ({
                          ...current,
                          role: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Title</span>
                    <input
                      value={item.title}
                      onChange={(event) =>
                        updateArrayItem<PublicationItem>("publications", index, (current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Citation</span>
                    <textarea
                      value={item.citation}
                      onChange={(event) =>
                        updateArrayItem<PublicationItem>("publications", index, (current) => ({
                          ...current,
                          citation: event.target.value,
                        }))
                      }
                      rows={3}
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>DOI URL</span>
                    <input
                      value={item.doi}
                      onChange={(event) =>
                        updateArrayItem<PublicationItem>("publications", index, (current) => ({
                          ...current,
                          doi: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Paper URL</span>
                    <input
                      value={item.paperUrl}
                      onChange={(event) =>
                        updateArrayItem<PublicationItem>("publications", index, (current) => ({
                          ...current,
                          paperUrl: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
              ))}
            </article>
          </div>
        )}

        {activeSection === "contact" && (
          <div className={styles.manageLayout}>
            <article className={styles.managePanel}>
              <div className={styles.panelHeader}>
                <p className={styles.cardLabel}>연락처</p>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() =>
                    addArrayItem<ContactItem>("contactItems", {
                      label: "",
                      value: "",
                      href: "",
                    })
                  }
                >
                  연락처 추가
                </button>
              </div>
              <label className={styles.formField}>
                <span>Contact Title</span>
                <textarea
                  value={draft.contactTitle}
                  onChange={(event) => updateField("contactTitle", event.target.value)}
                  rows={3}
                />
              </label>
              {draft.contactItems.map((item, index) => (
                <div key={`${item.label}-${item.value}-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>연락처 {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => removeArrayItem<ContactItem>("contactItems", index)}
                    >
                      삭제
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>Label</span>
                    <input
                      value={item.label}
                      onChange={(event) =>
                        updateArrayItem<ContactItem>("contactItems", index, (current) => ({
                          ...current,
                          label: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Value</span>
                    <input
                      value={item.value}
                      onChange={(event) =>
                        updateArrayItem<ContactItem>("contactItems", index, (current) => ({
                          ...current,
                          value: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.formField}>
                    <span>Href</span>
                    <input
                      value={item.href ?? ""}
                      onChange={(event) =>
                        updateArrayItem<ContactItem>("contactItems", index, (current) => ({
                          ...current,
                          href: event.target.value || undefined,
                        }))
                      }
                    />
                  </label>
                </div>
              ))}
            </article>

            <article className={styles.managePanel}>
              <p className={styles.cardLabel}>푸터</p>
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
        )}

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
