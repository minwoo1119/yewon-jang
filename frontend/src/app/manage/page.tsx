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

const manageCopy = {
  ko: {
    authTitle: "관리 페이지 접근을 위해 비밀번호를 입력하세요.",
    authLead: "콘텐츠와 이미지를 수정하는 관리자 전용 화면입니다.",
    accessPassword: "접근 비밀번호",
    enterPassword: "비밀번호를 입력하세요",
    checking: "확인 중...",
    enterDashboard: "관리 페이지 열기",
    heading: "섹션별로 내용을 나눠서 수정할 수 있도록 정리했습니다.",
    loading: "포트폴리오 데이터를 불러오는 중입니다.",
    loginFailed: "비밀번호가 올바르지 않습니다. 한/영 입력 상태를 확인해 주세요.",
    saveFailed: "저장에 실패했습니다.",
    resetFailed: "초기화에 실패했습니다.",
    uploadFailed: "이미지 업로드에 실패했습니다.",
    languageKo: "한국어",
    languageEn: "영어",
    sections: {
      basic: "기본 정보",
      home: "홈 화면",
      background: "학력·경력",
      projects: "프로젝트",
      publications: "논문",
      contact: "연락처·푸터",
    } satisfies Record<ManageSection, string>,
    basicInfo: "기본 정보",
    externalLinks: "외부 링크",
    addLink: "링크 추가",
    linkItem: "링크",
    aboutSection: "소개 섹션",
    recentResearchCards: "최근 연구 카드",
    addCard: "카드 추가",
    cardItem: "카드",
    backgroundSection: "학력·경력",
    addItem: "항목 추가",
    timelineItem: "이력",
    projectsSection: "프로젝트",
    addProject: "프로젝트 추가",
    projectItem: "프로젝트",
    publicationsSection: "논문",
    addPublication: "논문 추가",
    publicationItem: "논문",
    contactSection: "연락처",
    addContact: "연락처 추가",
    contactItem: "연락처",
    footer: "푸터",
    remove: "삭제",
    eyebrow: "상단 문구",
    name: "이름",
    role: "역할",
    heroDescription: "대표 소개문",
    profileImage: "프로필 이미지",
    label: "라벨",
    url: "URL",
    aboutTitle: "소개 제목",
    researchPhilosophy: "연구 방향",
    interests: "관심 분야",
    skillsTitle: "역량 제목",
    skills: "역량",
    skillsPlaceholder: "역량을 입력하고 Enter를 누르세요",
    recentResearchTitle: "최근 연구 섹션 제목",
    title: "제목",
    description: "설명",
    sectionTitle: "섹션 제목",
    period: "기간",
    subtitle: "부제",
    projectImage: "프로젝트 이미지",
    year: "연도",
    type: "유형",
    citation: "인용 정보",
    doiUrl: "DOI URL",
    paperUrl: "논문 URL",
    contactTitle: "연락처 섹션 제목",
    primaryEmail: "대표 이메일",
    value: "값",
    href: "링크",
    footerName: "푸터 이름",
    footerRole: "푸터 역할",
    copyright: "저작권 문구",
    saveChanges: "변경사항 저장",
    saving: "저장 중...",
    resetDefault: "기본값으로 초기화",
    resetting: "초기화 중...",
    imageSelected: "이미지 선택됨",
    uploading: "업로드 중...",
    uploadingHint: "잠시만 기다려주세요.",
    replaceImage: "클릭하거나 다른 파일을 드래그해서 교체할 수 있습니다.",
    dropImage: "이미지를 여기로 끌어오세요",
    browseImage: "또는 클릭해서 파일을 선택하세요.",
    removeImage: "이미지 제거",
  },
  en: {
    authTitle: "Enter the password to access the admin page.",
    authLead: "This is the admin screen for editing content and images.",
    accessPassword: "Access Password",
    enterPassword: "Enter password",
    checking: "Checking...",
    enterDashboard: "Enter Dashboard",
    heading: "섹션별로 내용을 나눠서 수정할 수 있도록 정리했습니다.",
    loading: "Loading portfolio data.",
    loginFailed: "Incorrect password. Check your keyboard language and try again.",
    saveFailed: "Failed to save changes.",
    resetFailed: "Failed to reset content.",
    uploadFailed: "Failed to upload image.",
    languageKo: "Korean",
    languageEn: "English",
    sections: {
      basic: "기본 정보",
      home: "홈 화면",
      background: "학력·경력",
      projects: "프로젝트",
      publications: "논문",
      contact: "연락처·푸터",
    } satisfies Record<ManageSection, string>,
    basicInfo: "기본 정보",
    externalLinks: "외부 링크",
    addLink: "Add Link",
    linkItem: "Link",
    aboutSection: "소개 섹션",
    recentResearchCards: "최근 연구 카드",
    addCard: "Add Card",
    cardItem: "Card",
    backgroundSection: "학력·경력",
    addItem: "Add Item",
    timelineItem: "Entry",
    projectsSection: "프로젝트",
    addProject: "Add Project",
    projectItem: "Project",
    publicationsSection: "논문",
    addPublication: "Add Publication",
    publicationItem: "Publication",
    contactSection: "연락처",
    addContact: "Add Contact",
    contactItem: "Contact",
    footer: "푸터",
    remove: "Remove",
    eyebrow: "Eyebrow",
    name: "Name",
    role: "Role",
    heroDescription: "Hero Description",
    profileImage: "Profile Image",
    label: "Label",
    url: "URL",
    aboutTitle: "About Title",
    researchPhilosophy: "Research Philosophy",
    interests: "Interests",
    skillsTitle: "Skills Title",
    skills: "Skills",
    skillsPlaceholder: "Type a skill and press Enter",
    recentResearchTitle: "Recent Research Title",
    title: "Title",
    description: "Description",
    sectionTitle: "Section Title",
    period: "Period",
    subtitle: "Subtitle",
    projectImage: "Project Image",
    year: "Year",
    type: "Type",
    citation: "Citation",
    doiUrl: "DOI URL",
    paperUrl: "Paper URL",
    contactTitle: "Contact Section Title",
    primaryEmail: "Primary Email",
    value: "Value",
    href: "Href",
    footerName: "Footer Name",
    footerRole: "Footer Role",
    copyright: "Copyright",
    saveChanges: "Save Changes",
    saving: "Saving...",
    resetDefault: "Reset to Default",
    resetting: "Resetting...",
    imageSelected: "Image selected",
    uploading: "Uploading...",
    uploadingHint: "Please wait a moment.",
    replaceImage: "Click or drag another file to replace it.",
    dropImage: "Drop an image here",
    browseImage: "or click to browse from your device.",
    removeImage: "Remove Image",
  },
};

type ImageUploadFieldProps = {
  label: string;
  value?: string;
  locale: Locale;
  onChange: (value: string) => void;
};

function isEmailContactItem(item: ContactItem) {
  const normalizedLabel = item.label.trim().toLowerCase();
  const normalizedValue = item.value.trim().toLowerCase();
  const normalizedHref = item.href?.trim().toLowerCase();

  return (
    normalizedLabel === "email" ||
    normalizedLabel === "e-mail" ||
    normalizedLabel === "이메일" ||
    normalizedHref?.startsWith("mailto:") ||
    normalizedValue.includes("@")
  );
}

function ImageUploadField({
  label,
  value,
  locale,
  onChange,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const copy = manageCopy[locale];

  const handleFile = async (file?: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);

    try {
      const response = await uploadImage(file);
      onChange(response.publicUrl);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : copy.uploadFailed);
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
                <strong>{isUploading ? copy.uploading : copy.imageSelected}</strong>
                <span>{isUploading ? copy.uploadingHint : copy.replaceImage}</span>
              </div>
            </div>
          ) : (
            <div className={styles.uploadCopy}>
              <strong>{isUploading ? copy.uploading : copy.dropImage}</strong>
              <span>{isUploading ? copy.uploadingHint : copy.browseImage}</span>
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
            {copy.removeImage}
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
  const copy = manageCopy[editingLocale];
  const authCopy = manageCopy[locale];
  const sections: { id: ManageSection; label: string }[] = [
    { id: "basic", label: copy.sections.basic },
    { id: "home", label: copy.sections.home },
    { id: "background", label: copy.sections.background },
    { id: "projects", label: copy.sections.projects },
    { id: "publications", label: copy.sections.publications },
    { id: "contact", label: copy.sections.contact },
  ];

  useEffect(() => {
    setDraft(content);
  }, [content]);

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
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : authCopy.loginFailed);
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
      setSaveError(error instanceof Error ? error.message : copy.saveFailed);
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
      setSaveError(error instanceof Error ? error.message : copy.resetFailed);
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

  const footerEmailItem = current.contactItems.find(isEmailContactItem) ?? null;
  const nonEmailContactItems = current.contactItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !isEmailContactItem(item));

  const updateFooterEmail = (value: string) => {
    const trimmedValue = value.trim();
    const existingIndex = current.contactItems.findIndex(isEmailContactItem);
    const nextItems = [...current.contactItems];

    if (!trimmedValue) {
      if (existingIndex !== -1) {
        nextItems.splice(existingIndex, 1);
      }

      updateField("contactItems", nextItems);
      return;
    }

    const nextEmailItem: ContactItem = {
      label: editingLocale === "ko" ? "이메일" : "Email",
      value: trimmedValue,
      href: `mailto:${trimmedValue}`,
    };

    if (existingIndex === -1) {
      nextItems.unshift(nextEmailItem);
    } else {
      nextItems[existingIndex] = {
        ...nextItems[existingIndex],
        ...nextEmailItem,
      };
    }

    updateField("contactItems", nextItems);
  };

  if (!isUnlocked) {
    return (
      <SiteShell>
        <section className={styles.section}>
          <div className={styles.authGate}>
            <div className={styles.authHeading}>
              <p className={styles.authKicker}>Portfolio Management</p>
              <h2>{authCopy.authTitle}</h2>
              <p className={styles.authLead}>{authCopy.authLead}</p>
            </div>
            <form className={styles.authPanel} onSubmit={handleUnlock}>
              <label className={styles.authField}>
                <span>{authCopy.accessPassword}</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={authCopy.enterPassword}
                />
              </label>

              <button type="submit" className={styles.authButton}>
                {isAuthenticating ? authCopy.checking : authCopy.enterDashboard}
              </button>
            </form>

            {authError ? <p className={styles.formHint}>{authError}</p> : null}
            {error ? <p className={styles.formHint}>{error}</p> : null}
          </div>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Portfolio Management</p>
          <h2>{copy.heading}</h2>
        </div>
        {isLoading ? <p className={styles.formHint}>{copy.loading}</p> : null}
        {error ? <p className={styles.formHint}>{error}</p> : null}
        {saveError ? <p className={styles.formHint}>{saveError}</p> : null}

        <div className={styles.manageLanguageTabs}>
          <button
            type="button"
            className={editingLocale === "ko" ? styles.manageTabActive : styles.manageTab}
            onClick={() => setEditingLocale("ko")}
          >
            {copy.languageKo}
          </button>
          <button
            type="button"
            className={editingLocale === "en" ? styles.manageTabActive : styles.manageTab}
            onClick={() => setEditingLocale("en")}
          >
            {copy.languageEn}
          </button>
        </div>

        <div className={styles.manageTabs}>
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={activeSection === section.id ? styles.manageTabActive : styles.manageTab}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>

        {activeSection === "basic" && (
          <div className={styles.manageLayout}>
            <article className={styles.managePanel}>
              <p className={styles.cardLabel}>{copy.basicInfo}</p>
              <label className={styles.formField}>
                <span>{copy.eyebrow}</span>
                <input
                  value={current.heroEyebrow}
                  onChange={(event) => updateField("heroEyebrow", event.target.value)}
                />
              </label>
              <label className={styles.formField}>
                <span>{copy.name}</span>
                <input
                  value={current.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </label>
              <label className={styles.formField}>
                <span>{copy.role}</span>
                <input
                  value={current.heroRole}
                  onChange={(event) => updateField("heroRole", event.target.value)}
                />
              </label>
              <label className={styles.formField}>
                <span>{copy.heroDescription}</span>
                <textarea
                  value={current.heroDescription}
                  onChange={(event) => updateField("heroDescription", event.target.value)}
                  rows={4}
                />
              </label>
              <ImageUploadField
                label={copy.profileImage}
                locale={editingLocale}
                value={current.heroImageUrl}
                onChange={(value) => updateField("heroImageUrl", value)}
              />
            </article>

            <article className={styles.managePanel}>
              <div className={styles.panelHeader}>
                <p className={styles.cardLabel}>{copy.externalLinks}</p>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => addArrayItem<LinkItem>("profileLinks", { label: "", href: "" })}
                >
                  {copy.addLink}
                </button>
              </div>
              {current.profileLinks.map((item, index) => (
                <div key={`profile-link-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>{copy.linkItem} {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => removeArrayItem<LinkItem>("profileLinks", index)}
                    >
                      {copy.remove}
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>{copy.label}</span>
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
                    <span>{copy.url}</span>
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
              <p className={styles.cardLabel}>{copy.aboutSection}</p>
              <label className={styles.formField}>
                <span>{copy.aboutTitle}</span>
                <textarea
                  value={current.aboutTitle}
                  onChange={(event) => updateField("aboutTitle", event.target.value)}
                  rows={3}
                />
              </label>
              <label className={styles.formField}>
                <span>{copy.researchPhilosophy}</span>
                <textarea
                  value={current.philosophy}
                  onChange={(event) => updateField("philosophy", event.target.value)}
                  rows={5}
                />
              </label>
              <label className={styles.formField}>
                <span>{copy.interests}</span>
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
                <span>{copy.skillsTitle}</span>
                <textarea
                  value={current.skillsTitle}
                  onChange={(event) => updateField("skillsTitle", event.target.value)}
                  rows={3}
                />
              </label>
              <div className={styles.formField}>
                <span>{copy.skills}</span>
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
                    placeholder={copy.skillsPlaceholder}
                  />
                </div>
              </div>
            </article>

            <article className={styles.managePanel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.cardLabel}>{copy.recentResearchCards}</p>
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
                  {copy.addCard}
                </button>
              </div>
              <label className={styles.formField}>
                <span>{copy.recentResearchTitle}</span>
                <textarea
                  value={current.recentResearchTitle}
                  onChange={(event) => updateField("recentResearchTitle", event.target.value)}
                  rows={3}
                />
              </label>
              {current.recentResearch.map((item, index) => (
                <div key={`recent-research-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>{copy.cardItem} {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => removeArrayItem<ResearchItem>("recentResearch", index)}
                    >
                      {copy.remove}
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>{copy.label}</span>
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
                    <span>{copy.title}</span>
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
                    <span>{copy.description}</span>
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
                <p className={styles.cardLabel}>{copy.backgroundSection}</p>
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
                  {copy.addItem}
                </button>
              </div>
              <label className={styles.formField}>
                <span>{copy.sectionTitle}</span>
                <textarea
                  value={current.backgroundTitle}
                  onChange={(event) => updateField("backgroundTitle", event.target.value)}
                  rows={3}
                />
              </label>
              {current.backgroundItems.map((item, index) => (
                <div key={`background-item-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>{copy.timelineItem} {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => removeArrayItem<TimelineItem>("backgroundItems", index)}
                    >
                      {copy.remove}
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>{copy.period}</span>
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
                    <span>{copy.title}</span>
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
                    <span>{copy.subtitle}</span>
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
                    <span>{copy.description}</span>
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
                <p className={styles.cardLabel}>{copy.projectsSection}</p>
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
                  {copy.addProject}
                </button>
              </div>
              <label className={styles.formField}>
                <span>{copy.sectionTitle}</span>
                <textarea
                  value={current.projectsTitle}
                  onChange={(event) => updateField("projectsTitle", event.target.value)}
                  rows={3}
                />
              </label>
              {current.projects.map((item, index) => (
                <div key={`project-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>{copy.projectItem} {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => removeArrayItem<ProjectItem>("projects", index)}
                    >
                      {copy.remove}
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>{copy.label}</span>
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
                    <span>{copy.title}</span>
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
                    label={copy.projectImage}
                    locale={editingLocale}
                    value={item.imageUrl}
                    onChange={(value) =>
                      updateArrayItem<ProjectItem>("projects", index, (current) => ({
                        ...current,
                        imageUrl: value,
                      }))
                    }
                  />
                  <label className={styles.formField}>
                    <span>{copy.description}</span>
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
                <p className={styles.cardLabel}>{copy.publicationsSection}</p>
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
                  {copy.addPublication}
                </button>
              </div>
              <label className={styles.formField}>
                <span>{copy.sectionTitle}</span>
                <textarea
                  value={current.publicationsTitle}
                  onChange={(event) => updateField("publicationsTitle", event.target.value)}
                  rows={3}
                />
              </label>
              {current.publications.map((item, index) => (
                <div key={`publication-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>{copy.publicationItem} {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() =>
                        removeArrayItem<PublicationItem>("publications", index)
                      }
                    >
                      {copy.remove}
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>{copy.year}</span>
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
                    <span>{copy.type}</span>
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
                    <span>{copy.role}</span>
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
                    <span>{copy.title}</span>
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
                    <span>{copy.citation}</span>
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
                    <span>{copy.doiUrl}</span>
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
                    <span>{copy.paperUrl}</span>
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
                <p className={styles.cardLabel}>{copy.contactSection}</p>
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
                  {copy.addContact}
                </button>
              </div>
              <label className={styles.formField}>
                <span>{copy.contactTitle}</span>
                <textarea
                  value={current.contactTitle}
                  onChange={(event) => updateField("contactTitle", event.target.value)}
                  rows={3}
                />
              </label>
              <label className={styles.formField}>
                <span>{copy.primaryEmail}</span>
                <input
                  value={footerEmailItem?.value ?? ""}
                  onChange={(event) => updateFooterEmail(event.target.value)}
                  placeholder="name@example.com"
                />
              </label>
              {nonEmailContactItems.map(({ item, index }) => (
                <div key={`contact-item-${index}`} className={styles.formGroup}>
                  <div className={styles.itemHeader}>
                    <p className={styles.itemIndex}>{copy.contactItem} {index + 1}</p>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => removeArrayItem<ContactItem>("contactItems", index)}
                    >
                      {copy.remove}
                    </button>
                  </div>
                  <label className={styles.formField}>
                    <span>{copy.label}</span>
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
                    <span>{copy.value}</span>
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
                    <span>{copy.href}</span>
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
              <p className={styles.cardLabel}>{copy.footer}</p>
              <label className={styles.formField}>
                <span>{copy.footerName}</span>
                <input
                  value={current.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </label>
              <label className={styles.formField}>
                <span>{copy.footerRole}</span>
                <input
                  value={current.footerRole}
                  onChange={(event) => updateField("footerRole", event.target.value)}
                />
              </label>
              <label className={styles.formField}>
                <span>{copy.copyright}</span>
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
            {isSaving ? copy.saving : copy.saveChanges}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => void handleReset()}
            disabled={isSaving || isResetting}
          >
            {isResetting ? copy.resetting : copy.resetDefault}
          </button>
        </div>
      </section>
    </SiteShell>
  );
}
