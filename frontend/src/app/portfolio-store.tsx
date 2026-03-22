"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "ko" | "en";

export type LinkItem = {
  label: string;
  href: string;
};

export type ResearchItem = {
  label: string;
  title: string;
  description: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
};

export type ProjectItem = {
  label: string;
  title: string;
  description: string;
  imageUrl?: string;
};

export type PublicationItem = {
  year: string;
  type: string;
  role: string;
  title: string;
  citation: string;
  doi: string;
  paperUrl: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

export type PortfolioData = {
  heroEyebrow: string;
  name: string;
  heroRole: string;
  heroDescription: string;
  heroImageUrl?: string;
  profileLinks: LinkItem[];
  aboutTitle: string;
  philosophy: string;
  interests: string[];
  recentResearchTitle: string;
  recentResearch: ResearchItem[];
  skillsTitle: string;
  skills: string[];
  backgroundTitle: string;
  backgroundItems: TimelineItem[];
  projectsTitle: string;
  projects: ProjectItem[];
  publicationsTitle: string;
  publications: PublicationItem[];
  contactTitle: string;
  contactItems: ContactItem[];
  footerRole: string;
  footerCopyright: string;
};

export type PortfolioContent = Record<Locale, PortfolioData>;

const STORAGE_KEY = "portfolio-content";
const LOCALE_KEY = "portfolio-locale";

const koData: PortfolioData = {
  heroEyebrow: "Research Portfolio",
  name: "Yewon Jang",
  heroRole: "Graduate Researcher, Mechanical Engineering",
  heroDescription:
    "재료, 첨단 제조, 기계 시스템을 중심으로 신뢰성 있는 실험과 실제 공학 적용을 연결하는 연구를 수행합니다.",
  heroImageUrl: "",
  profileLinks: [
    { label: "Google Scholar", href: "https://scholar.google.com" },
    { label: "ORCID", href: "https://orcid.org" },
  ],
  aboutTitle: "재료, 소재, 기계 시스템을 연결하는 실험 중심 연구를 수행합니다.",
  philosophy:
    "재료 특성, 공정 조건, 구조적 거동 사이의 관계를 정량적으로 해석하는 데 관심이 있습니다. 기초 물성 이해와 실제 기계 시스템 적용 사이의 간극을 줄이는 연구를 지향합니다.",
  interests: [
    "구조 및 기능성 공학 재료",
    "기계적 거동, 내구성, 파손 해석",
    "제조 공정, 실험, 성능 평가",
  ],
  recentResearchTitle: "최근 연구 주제와 진행 중인 질문을 홈 화면에서 먼저 보여줍니다.",
  recentResearch: [
    {
      label: "Current Study",
      title: "Lightweight Material Design for Structural Reliability",
      description:
        "경량화와 강도 확보를 동시에 만족시키기 위한 소재 조성 및 구조 설계 전략을 검토하고 있습니다.",
    },
    {
      label: "Ongoing Question",
      title: "Process-Property Relationships in Advanced Manufacturing",
      description:
        "가공 조건 변화가 미세조직과 기계적 성능에 어떤 영향을 미치는지 실험 기반으로 분석하고 있습니다.",
    },
  ],
  skillsTitle: "기계공학 연구 수행에 필요한 실험, 해석, 설계 역량입니다.",
  skills: [
    "Materials Characterization",
    "Mechanical Testing",
    "CAD Modeling",
    "Finite Element Analysis",
    "Failure Analysis",
    "Experimental Design",
    "Data Analysis",
    "Advanced Manufacturing",
  ],
  backgroundTitle: "학력과 연구 경력을 간결한 타임라인으로 정리했습니다.",
  backgroundItems: [
    {
      year: "2024 - Present",
      title: "M.S. in Mechanical Engineering",
      subtitle: "Institution Name, Materials and Mechanics Laboratory",
      description:
        "재료 성능, 구조 신뢰성, 공정 기반 기계 설계에 관한 연구를 수행하고 있습니다.",
    },
    {
      year: "2022 - 2024",
      title: "Research Assistant",
      subtitle: "Department of Mechanical Engineering, Institution Name",
      description:
        "재료 가공 및 구조 평가 프로젝트에서 시편 준비, 기계적 시험, 데이터 분석을 지원했습니다.",
    },
    {
      year: "2018 - 2022",
      title: "B.S. in Mechanical Engineering",
      subtitle: "Institution Name",
      description:
        "고체역학, 열유체, 재료과학, 공학 설계의 기초를 다졌습니다.",
    },
  ],
  projectsTitle: "진행 중인 연구 프로그램과 구현 중심 프로젝트를 포함합니다.",
  projects: [
    {
      label: "Materials Research",
      title: "Fatigue and Durability Assessment of Structural Materials",
      description:
        "기계적 하중이 큰 환경에 적용되는 재료의 반복 하중 거동과 장기 내구성을 평가합니다.",
      imageUrl: "",
    },
    {
      label: "Manufacturing Study",
      title: "Process Optimization for High-Performance Components",
      description:
        "성형 및 적층 제조 조건이 미세조직, 치수 안정성, 최종 성능에 미치는 영향을 분석합니다.",
      imageUrl: "",
    },
  ],
  publicationsTitle: "연도별로 정리한 주요 논문과 연구 산출물입니다.",
  publications: [
    {
      year: "2026",
      type: "Journal Article",
      role: "First Author",
      title: "Mechanical Reliability Evaluation of Lightweight Composite Structures",
      citation:
        "Yewon Jang, Co-author Name. Journal of Materials Processing and Mechanical Design.",
      doi: "https://doi.org/10.0000/example-2026",
      paperUrl: "https://example.com/paper-2026",
    },
    {
      year: "2025",
      type: "Conference Paper",
      role: "Co-Author",
      title: "Effects of Processing Parameters on the Mechanical Properties of Engineered Alloys",
      citation:
        "Co-author Name, Yewon Jang. Proceedings of the Korean Society of Mechanical Engineers Annual Meeting.",
      doi: "https://doi.org/10.0000/example-2025",
      paperUrl: "https://example.com/paper-2025",
    },
  ],
  contactTitle: "재료, 소재, 기계공학 관련 공동 연구와 학술 협업을 환영합니다.",
  contactItems: [
    {
      label: "Email",
      value: "contact@example.com",
      href: "mailto:contact@example.com",
    },
    {
      label: "Affiliation",
      value: "Department of Mechanical Engineering / Lab / Institution Name",
    },
    {
      label: "Office",
      value: "Seoul, Republic of Korea",
    },
  ],
  footerRole: "Mechanical Engineering Portfolio",
  footerCopyright: "© 2026 Yewon Jang",
};

const enData: PortfolioData = {
  heroEyebrow: "Research Portfolio",
  name: "Yewon Jang",
  heroRole: "Graduate Researcher, Mechanical Engineering",
  heroDescription:
    "Research in materials, advanced manufacturing, and mechanical systems with an emphasis on reliable experiments and practical engineering applications.",
  heroImageUrl: "",
  profileLinks: [
    { label: "Google Scholar", href: "https://scholar.google.com" },
    { label: "ORCID", href: "https://orcid.org" },
  ],
  aboutTitle:
    "I conduct experiment-driven research connecting materials, processing, and mechanical systems.",
  philosophy:
    "My work focuses on quantitatively understanding the relationships among material properties, process conditions, and structural behavior. I aim to bridge fundamental materials insight and practical mechanical applications.",
  interests: [
    "Structural and functional materials for engineering systems",
    "Mechanical behavior, durability, and failure analysis",
    "Manufacturing processes, testing, and performance evaluation",
  ],
  recentResearchTitle:
    "The home page highlights recent research topics and current questions.",
  recentResearch: [
    {
      label: "Current Study",
      title: "Lightweight Material Design for Structural Reliability",
      description:
        "Investigating material composition and structural design strategies that support both lightweighting and mechanical strength.",
    },
    {
      label: "Ongoing Question",
      title: "Process-Property Relationships in Advanced Manufacturing",
      description:
        "Analyzing how process conditions influence microstructure and mechanical performance in advanced manufacturing workflows.",
    },
  ],
  skillsTitle:
    "Core experimental, analytical, and design capabilities for mechanical engineering research.",
  skills: [
    "Materials Characterization",
    "Mechanical Testing",
    "CAD Modeling",
    "Finite Element Analysis",
    "Failure Analysis",
    "Experimental Design",
    "Data Analysis",
    "Advanced Manufacturing",
  ],
  backgroundTitle:
    "Education and research experience are organized as a concise timeline.",
  backgroundItems: [
    {
      year: "2024 - Present",
      title: "M.S. in Mechanical Engineering",
      subtitle: "Institution Name, Materials and Mechanics Laboratory",
      description:
        "Conducting research on material performance, structural reliability, and process-aware mechanical design.",
    },
    {
      year: "2022 - 2024",
      title: "Research Assistant",
      subtitle: "Department of Mechanical Engineering, Institution Name",
      description:
        "Supported specimen preparation, mechanical testing, and data analysis for materials processing and structural evaluation projects.",
    },
    {
      year: "2018 - 2022",
      title: "B.S. in Mechanical Engineering",
      subtitle: "Institution Name",
      description:
        "Built a foundation in solid mechanics, thermofluids, materials science, and engineering design.",
    },
  ],
  projectsTitle:
    "This section includes ongoing research programs and implementation-focused projects.",
  projects: [
    {
      label: "Materials Research",
      title: "Fatigue and Durability Assessment of Structural Materials",
      description:
        "Evaluating cyclic loading behavior and long-term durability of candidate materials for mechanically demanding applications.",
      imageUrl: "",
    },
    {
      label: "Manufacturing Study",
      title: "Process Optimization for High-Performance Components",
      description:
        "Studying how forming or additive manufacturing parameters affect microstructure, dimensional stability, and final performance.",
      imageUrl: "",
    },
  ],
  publicationsTitle:
    "Selected papers and research outputs are organized by year.",
  publications: [
    {
      year: "2026",
      type: "Journal Article",
      role: "First Author",
      title: "Mechanical Reliability Evaluation of Lightweight Composite Structures",
      citation:
        "Yewon Jang, Co-author Name. Journal of Materials Processing and Mechanical Design.",
      doi: "https://doi.org/10.0000/example-2026",
      paperUrl: "https://example.com/paper-2026",
    },
    {
      year: "2025",
      type: "Conference Paper",
      role: "Co-Author",
      title: "Effects of Processing Parameters on the Mechanical Properties of Engineered Alloys",
      citation:
        "Co-author Name, Yewon Jang. Proceedings of the Korean Society of Mechanical Engineers Annual Meeting.",
      doi: "https://doi.org/10.0000/example-2025",
      paperUrl: "https://example.com/paper-2025",
    },
  ],
  contactTitle:
    "Open to collaboration and academic partnerships in materials and mechanical engineering.",
  contactItems: [
    {
      label: "Email",
      value: "contact@example.com",
      href: "mailto:contact@example.com",
    },
    {
      label: "Affiliation",
      value: "Department of Mechanical Engineering / Lab / Institution Name",
    },
    {
      label: "Office",
      value: "Seoul, Republic of Korea",
    },
  ],
  footerRole: "Mechanical Engineering Portfolio",
  footerCopyright: "© 2026 Yewon Jang",
};

export const defaultPortfolioContent: PortfolioContent = {
  ko: koData,
  en: enData,
};

type PortfolioContextValue = {
  content: PortfolioContent;
  data: PortfolioData;
  locale: Locale;
  setContent: (content: PortfolioContent) => void;
  setLocale: (locale: Locale) => void;
  resetContent: () => void;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(() => {
    if (typeof window === "undefined") {
      return defaultPortfolioContent;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultPortfolioContent;

    try {
      return JSON.parse(saved) as PortfolioContent;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return defaultPortfolioContent;
    }
  });

  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "ko";
    }

    const saved = window.localStorage.getItem(LOCALE_KEY);
    return saved === "en" ? "en" : "ko";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      content,
      data: content[locale],
      locale,
      setContent,
      setLocale,
      resetContent: () => {
        setContent(defaultPortfolioContent);
        window.localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [content, locale],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }

  return context;
}
