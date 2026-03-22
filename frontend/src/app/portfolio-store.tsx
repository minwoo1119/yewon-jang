"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

const STORAGE_KEY = "portfolio-data";

export const defaultPortfolioData: PortfolioData = {
  heroEyebrow: "Research Portfolio",
  name: "Yewon Jang",
  heroRole: "Graduate Researcher, Mechanical Engineering",
  heroDescription:
    "Research in materials, advanced manufacturing, and mechanical systems with an emphasis on reliable experiments and practical engineering applications.",
  profileLinks: [
    { label: "Google Scholar", href: "https://scholar.google.com" },
    { label: "ORCID", href: "https://orcid.org" },
  ],
  aboutTitle: "재료, 소재, 기계 시스템을 연결하는 실험 중심 연구를 수행합니다.",
  philosophy:
    "재료 특성, 공정 조건, 구조적 거동 사이의 관계를 정량적으로 해석하는 데 관심이 있습니다. 기초 물성 이해와 실제 기계 시스템 적용 사이의 간극을 줄이는 연구를 지향합니다.",
  interests: [
    "Structural and functional materials for engineering systems",
    "Mechanical behavior, durability, and failure analysis",
    "Manufacturing processes, testing, and performance evaluation",
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
        "Conducting research on materials performance, structural reliability, and process-aware mechanical design.",
    },
    {
      year: "2022 - 2024",
      title: "Research Assistant",
      subtitle: "Department of Mechanical Engineering, Institution Name",
      description:
        "Supported specimen preparation, mechanical testing, and analysis for projects in materials processing and structural evaluation.",
    },
    {
      year: "2018 - 2022",
      title: "B.S. in Mechanical Engineering",
      subtitle: "Institution Name",
      description:
        "Built a foundation in solid mechanics, thermofluids, materials science, and engineering design.",
    },
  ],
  projectsTitle: "진행 중인 연구 프로그램과 구현 중심 프로젝트를 포함합니다.",
  projects: [
    {
      label: "Materials Research",
      title: "Fatigue and Durability Assessment of Structural Materials",
      description:
        "Evaluating cyclic loading behavior and long-term durability of candidate materials for mechanically demanding applications.",
    },
    {
      label: "Manufacturing Study",
      title: "Process Optimization for High-Performance Components",
      description:
        "Studying how forming or additive manufacturing parameters affect microstructure, dimensional stability, and final performance.",
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

type PortfolioContextValue = {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  resetData: () => void;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(() => {
    if (typeof window === "undefined") {
      return defaultPortfolioData;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return defaultPortfolioData;
    }

    try {
      return JSON.parse(saved) as PortfolioData;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return defaultPortfolioData;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const value = useMemo(
    () => ({
      data,
      setData,
      resetData: () => {
        setData(defaultPortfolioData);
        window.localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [data],
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
