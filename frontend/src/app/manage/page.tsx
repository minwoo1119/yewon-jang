"use client";

import { useEffect, useId, useState } from "react";
import SiteShell from "../components/site-shell";
import styles from "../page.module.css";
import {
  defaultPortfolioContent,
  type Locale,
  usePortfolio,
  type ContactItem,
  type LinkItem,
  type PortfolioData,
  type ProjectItem,
  type PublicationItem,
  type ResearchItem,
  type TimelineItem,
} from "../portfolio-store";
import { loginAdmin, uploadImage } from "../portfolio-api";

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

type ImageUploadFieldProps = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);

    try {
      const response = await uploadImage(file);
      onChange(response.publicUrl);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.formField}>
      <span>{label}</span>
      <div
        className={styles.uploadField}
        onDragOver={(event) => event.preventDefault()}
        onDrop={async (event) => {
          event.preventDefault();
          await handleFile(event.dataTransfer.files?.[0]);
        }}
      >
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className={styles.uploadInput}
          onChange={async (event) => {
            await handleFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
        <label htmlFor={inputId} className={styles.uploadDropzone}>
          {value ? (
            <div className={styles.uploadPreviewWrap}>
              <div
                className={styles.uploadPreview}
                style={{ backgroundImage: `url(${value})` }}
              />
              <div className={styles.uploadCopy}>
                <strong>{isUploading ? "Uploading..." : "Image selected"}</strong>
                <span>
                  {isUploading
                    ? "잠시만 기다려주세요."
                    : "Click or drag another file to replace it."}
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.uploadCopy}>
              <strong>{isUploading ? "Uploading..." : "Drop an image here"}</strong>
              <span>
                {isUploading
                  ? "잠시만 기다려주세요."
                  : "or click to browse from your device."}
              </span>
            </div>
          )}
        </label>
        {uploadError ? <p className={styles.formHint}>{uploadError}</p> : null}
        {value ? (
          <button
            type="button"
            className={styles.ghostButton}
            disabled={isUploading}
            onClick={() => onChange("")}
          >
            이미지 제거
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function ManagePage() {
  const { content, locale, setContent, resetContent, isLoading, error } = usePortfolio();
  const [draft, setDraft] = useState(content);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeSection, setActiveSection] = useState<ManageSection>("basic");
  const [editingLocale, setEditingLocale] = useState<Locale>(locale);
  const [skillInput, setSkillInput] = useState<Record<Locale, string>>({
    ko: "",
    en: "",
  });

  const current = draft[editingLocale];

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setIsUnlocked(window.sessionStorage.getItem("portfolio-admin-auth") === "true");
  }, []);

  const updateField = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [editingLocale]: {
        ...currentDraft[editingLocale],
        [key]: value,
      },
    }));
  };

  const updateArrayItem = <T,>(
    key: keyof PortfolioData,
    index: number,
    updater: (item: T) => T,
  ) => {
    setDraft((currentDraft) => {
      const localeData = currentDraft[editingLocale];
      const items = localeData[key] as T[];
      return {
        ...currentDraft,
        [editingLocale]: {
          ...localeData,
          [key]: items.map((item, itemIndex) =>
            itemIndex === index ? updater(item) : item,
          ),
        },
      };
    });
  };

  const addArrayItem = <T,>(key: keyof PortfolioData, item: T) => {
    setDraft((currentDraft) => {
      const localeData = currentDraft[editingLocale];
      return {
        ...currentDraft,
        [editingLocale]: {
          ...localeData,
          [key]: [...((localeData[key] as T[]) ?? []), item],
        },
      };
    });
  };

  const removeArrayItem = <T,>(key: keyof PortfolioData, index: number) => {
    setDraft((currentDraft) => {
      const localeData = currentDraft[editingLocale];
      return {
        ...currentDraft,
        [editingLocale]: {
          ...localeData,
          [key]: (localeData[key] as T[]).filter((_, itemIndex) => itemIndex !== index),
        },
      };
    });
  };

  const handleUnlock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password.trim()) return;

    setIsAuthenticating(true);
    setAuthError(null);

    try {
      await loginAdmin(password);
      setDraft(content);
      setIsUnlocked(true);
      window.sessionStorage.setItem("portfolio-admin-auth", "true");
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "로그인에 실패했습니다.",
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await setContent(draft);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "저장에 실패했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setDraft(defaultPortfolioContent);
    setIsResetting(true);
    setSaveError(null);

    try {
      await resetContent();
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "초기화에 실패했습니다.",
      );
    } finally {
      setIsResetting(false);
    }
  };

  const addSkill = () => {
    const value = skillInput[editingLocale].trim();
    if (!value) return;

    updateField("skills", [...current.skills, value]);
    setSkillInput((state) => ({ ...state, [editingLocale]: "" }));
  };

  if (!isUnlocked) {
    return (
      <SiteShell>
        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Portfolio Management</p>
            <h2>관리 페이지 접근을 위해 암호를 입력하세요.</h2>
          </div>

          <form className={styles.authInline} onSubmit={handleUnlock}>
            <div className={styles.authIntro}>
              <p className={styles.cardLabel}>Access</p>
              <p className={styles.formHint}>
                서버의 관리자 비밀번호 검증 API에 연결되어 있습니다.
              </p>
            </div>

            <label className={styles.authField}>
              <span>Access Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
              />
            </label>

            <button type="submit" className={styles.authButton}>
              {isAuthenticating ? "Checking..." : "Continue"}
            </button>
          </form>
          {authError ? <p className={styles.formHint}>{authError}</p> : null}
          {error ? <p className={styles.formHint}>{error}</p> : null}
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
        {isLoading ? (
          <p className={styles.formHint}>포트폴리오 데이터를 불러오는 중입니다.</p>
        ) : null}
        {error ? <p className={styles.formHint}>{error}</p> : null}
        {saveError ? <p className={styles.formHint}>{saveError}</p> : null}

        <div className={styles.manageLanguageTabs}>
          <button
            type="button"
            className={
              editingLocale === "ko" ? styles.manageTabActive : styles.manageTab
            }
            onClick={() => setEditingLocale("ko")}
          >
            한국어
          </button>
          <button
            type="button"
            className={
              editingLocale === "en" ? styles.manageTabActive : styles.manageTab
            }
            onClick={() => setEditingLocale("en")}
          >
            English
          </button>
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
                  value={current.heroEyebrow}
                  onChange={(event) => updateField("heroEyebrow", event.target.value)}
                />
              </label>
              <label className={styles.formField}>
                <span>Name</span>
                <input
                  value={current.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </label>
              <label className={styles.formField}>
                <span>Role</span>
                <input
                  value={current.heroRole}
                  onChange={(event) => updateField("heroRole", event.target.value)}
                />
              </label>
              <label className={styles.formField}>
                <span>Hero Description</span>
                <textarea
                  value={current.heroDescription}
                  onChange={(event) => updateField("heroDescription", event.target.value)}
                  rows={4}
                />
              </label>
              <ImageUploadField
                label="Profile Image"
                value={current.heroImageUrl}
                onChange={(value) => updateField("heroImageUrl", value)}
              />
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
              {current.profileLinks.map((item, index) => (
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
                  value={current.aboutTitle}
                  onChange={(event) => updateField("aboutTitle", event.target.value)}
                  rows={3}
                />
              </label>
              <label className={styles.formField}>
                <span>Research Philosophy</span>
                <textarea
                  value={current.philosophy}
                  onChange={(event) => updateField("philosophy", event.target.value)}
                  rows={5}
                />
              </label>
              <label className={styles.formField}>
                <span>Interests</span>
                <textarea
                  value={current.interests.join("\n")}
                  onChange={(event) =>
                    updateField(
                      "interests",
                      event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    )
                  }
                  rows={5}
                />
              </label>
              <label className={styles.formField}>
                <span>Skills Title</span>
                <textarea
                  value={current.skillsTitle}
                  onChange={(event) => updateField("skillsTitle", event.target.value)}
                  rows={3}
                />
              </label>
              <div className={styles.formField}>
                <span>Skills</span>
                <div className={styles.skillComposer}>
                  <div className={styles.skillTokenList}>
                    {current.skills.map((skill, index) => (
                      <button
                        key={`${skill}-${index}`}
                        type="button"
                        className={styles.skillToken}
                        onClick={() =>
                          updateField(
                            "skills",
                            current.skills.filter((_, skillIndex) => skillIndex !== index),
                          )
                        }
                      >
                        <span>{skill}</span>
                        <span className={styles.skillTokenClose} aria-hidden="true">
                          ×
                        </span>
                      </button>
                    ))}
                  </div>
                  <input
                    value={skillInput[editingLocale]}
                    onChange={(event) =>
                      setSkillInput((state) => ({
                        ...state,
                        [editingLocale]: event.target.value,
                      }))
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addSkill();
                      }
                    }}
                    placeholder="Type a skill and press Enter"
                  />
                </div>
              </div>
            </article>

            <article className={styles.managePanel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.cardLabel}>최근 연구 카드</p>
                  <p className={styles.formHint}>{current.recentResearchTitle}</p>
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
                value={current.recentResearchTitle}
                  onChange={(event) =>
                    updateField("recentResearchTitle", event.target.value)
                  }
                  rows={3}
                />
              </label>
              {current.recentResearch.map((item, index) => (
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
                  value={current.backgroundTitle}
                  onChange={(event) => updateField("backgroundTitle", event.target.value)}
                  rows={3}
                />
              </label>
              {current.backgroundItems.map((item, index) => (
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
                      imageUrl: "",
                    })
                  }
                >
                  프로젝트 추가
                </button>
              </div>
              <label className={styles.formField}>
                <span>Section Title</span>
                <textarea
                  value={current.projectsTitle}
                  onChange={(event) => updateField("projectsTitle", event.target.value)}
                  rows={3}
                />
              </label>
              {current.projects.map((item, index) => (
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
                  <ImageUploadField
                    label="Project Image"
                    value={item.imageUrl}
                    onChange={(value) =>
                      updateArrayItem<ProjectItem>("projects", index, (current) => ({
                        ...current,
                        imageUrl: value,
                      }))
                    }
                  />
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
                  value={current.publicationsTitle}
                  onChange={(event) =>
                    updateField("publicationsTitle", event.target.value)
                  }
                  rows={3}
                />
              </label>
              {current.publications.map((item, index) => (
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
                  value={current.contactTitle}
                  onChange={(event) => updateField("contactTitle", event.target.value)}
                  rows={3}
                />
              </label>
              {current.contactItems.map((item, index) => (
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
                  value={current.footerRole}
                  onChange={(event) => updateField("footerRole", event.target.value)}
                />
              </label>
              <label className={styles.formField}>
                <span>Copyright</span>
                <input
                  value={current.footerCopyright}
                  onChange={(event) => updateField("footerCopyright", event.target.value)}
                />
              </label>
            </article>
          </div>
        )}

        <div className={styles.manageActions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => void handleSave()}
            disabled={isSaving || isResetting || isLoading}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => void handleReset()}
            disabled={isSaving || isResetting}
          >
            {isResetting ? "Resetting..." : "Reset to Default"}
          </button>
        </div>
      </section>
    </SiteShell>
  );
}
