import React, { useEffect } from 'react';
import { ProfileData, Project, Achievement } from '../types/portfolio';
import { X, Printer, Download, Mail, MapPin, Linkedin, Github, CheckCircle, Briefcase } from 'lucide-react';
import { ProfileAvatar } from './ProfileAvatar';

interface ResumeModalProps {
  profile: ProfileData;
  projects: Project[];
  achievements: Achievement[];
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  profile,
  projects,
  achievements,
  isOpen,
  onClose,
  isDark,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = `# ${profile.name}
B.E. in Information Technology (CGPA: 7.30) | Data & Systems
Email: ${profile.email} | LinkedIn: ${profile.socials.linkedin} | GitHub: ${profile.socials.github}
Location: ${profile.location}

---

## Professional Profile
Information Technology graduate from the International Institute of Information Technology (I²IT), Pune (CGPA: 7.30). Practical experience in Python data analysis, SQL query development, and Power BI reporting. Adept at cleaning structured datasets, formulating relational queries, and translating numbers into clear business visual summaries. Certified in SQL for Data Science (UC Davis) and preparing for Microsoft Certified: Power BI Data Analyst (PL-300).

---

## Education
- **International Institute of Information Technology (I²IT), Pune** (2022 – 2026)
  Bachelor of Engineering (B.E.) in Information Technology | CGPA: 7.30 / 10.0
- **Narayana Junior College, Hyderabad** (Completed 2022)
  Higher Secondary Certificate (HSC) — Science & Mathematics | Score: 90.2%
- **Sri Sri Ravishankar English School, Latur** (Completed 2020)
  Secondary School Certificate (SSC) | Score: 91.2% (Distinction)

---

## Experience & Internships
### Graduate Engineering Selection | Campus Recruitment (2026)
- Selected through competitive technical campus placement rounds.
- Focus on enterprise software systems, data engineering, and problem solving.

### Data Science Virtual Intern | AICTE (2025)
- Completed structured practical virtual internship analyzing structured datasets.
- Applied data cleaning techniques, missing value imputation, and exploratory data analysis (EDA).

---

## Technical Competencies
- **Programming & Scripting:** Python (Pandas, data analysis, automation scripts)
- **Database & Queries:** SQL (MySQL), Joins, Subqueries, Aggregations, Grouping, DBMS Foundations
- **Visualization & BI:** Microsoft Power BI, Data Modeling, DAX Measures, Microsoft Excel (Pivot Tables, Lookup Functions)
- **Developer Tools:** GitHub, Git, VS Code, Microsoft Office
- **Professional Attributes:** Problem Solving, Analytical Thinking, Teamwork, Technical Documentation, Adaptability

---

## Selected Projects
### Sales Performance Dashboard (2025)
*Tech: Power BI, Excel, Data Modeling*
- Designed an interactive dashboard analyzing revenue trends and regional performance across product categories.
- Engineered calculated measures in Power BI and connected relational lookup tables to surface business insights.
- Delivered visual summaries that reduced manual reporting effort and improved decision-making speed.

### Relational Data Analysis Project (2024)
*Tech: MySQL, SQL Queries, Joins*
- Performed end-to-end relational exploration across sales and customer transactional datasets.
- Applied multi-table joins, subqueries, and aggregations to derive business-relevant findings.

### Python Exploratory Data Analysis & Scripts (2025)
*Tech: Python, Pandas, Data Cleaning*
- Built data manipulation routines to clean raw datasets, handle null values, and calculate summary statistics.

---

## Certifications
- **SQL for Data Science** — University of California, Davis (Coursera Verified)
- **Preparing for Microsoft PL-300: Power BI Data Analyst** — Microsoft
- **Python for Data Analysis & Programming** — Coursera
- **Data Science Virtual Internship** — AICTE

---

## Academic Honors & Activities
- **Academic Distinction:** Top percentile academic achievement with 91.2% in SSC and 90.2% in HSC.
- **Active Technical Learner:** Consistently practicing SQL queries and Python problem-solving on GitHub.
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vinay_Bahire_Resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/80 animate-in fade-in duration-200"
    >
      <div
        className={`relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
        }`}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 font-semibold">
              Curriculum Vitae · Professional Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Print resume document"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                isDark
                  ? 'border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white'
                  : 'border-zinc-200 hover:border-zinc-300 bg-zinc-100 text-zinc-700 hover:text-black'
              }`}
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadMarkdown}
              aria-label="Download markdown resume"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                isDark
                  ? 'border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white'
                  : 'border-zinc-200 hover:border-zinc-300 bg-zinc-100 text-zinc-700 hover:text-black'
              }`}
              title="Download Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span>MD</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume view"
              className={`p-1.5 rounded-lg border transition-colors ${
                isDark
                  ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                  : 'border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet (No phone number!) */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-7 font-sans text-xs sm:text-sm">
          {/* Header Section with Profile Details & Real Avatar */}
          <div className="border-b border-zinc-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1.5 flex-1">
              <h1 id="resume-title" className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-zinc-100">
                {profile.name}
              </h1>
              <p className="text-sm font-mono text-sky-400 font-semibold flex items-center gap-2">
                <span>B.E. in Information Technology</span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span>Data &amp; Systems</span>
              </p>
              
              {/* Coordinates (Phone number skipped as requested!) */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <a href={`mailto:${profile.email}`} className="hover:text-white underline">{profile.email}</a>
                </span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">linkedin.com/in/vinay-bahire</a>
                </span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span className="flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 text-sky-400" />
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">github.com/BahireVinay</a>
                </span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  Pune, India
                </span>
              </div>
            </div>

            {/* Profile Avatar Frame (Direct image, no upload buttons) */}
            <ProfileAvatar
              avatarUrl={profile.avatarUrl}
              name={profile.name}
              isDark={isDark}
              size="md"
              className="shrink-0"
            />
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-2 font-bold">
              Career Profile
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
              Information Technology graduate from the International Institute of Information Technology (I²IT), Pune (CGPA: 7.30). Practical experience in Python data analysis, SQL query development, and Power BI reporting. Adept at cleaning structured datasets, formulating relational queries, and translating numbers into clear business visual summaries. Certified in SQL for Data Science (UC Davis) and preparing for Microsoft Certified: Power BI Data Analyst (PL-300).
            </p>
          </div>

          {/* Education (CGPA 7.30, NO specialization tags) */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-3 font-bold">
              Education
            </h2>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <span className="font-bold text-zinc-100">International Institute of Information Technology (I²IT), Pune</span>
                  <div className="text-xs text-zinc-400">Bachelor of Engineering (B.E.) in Information Technology</div>
                </div>
                <div className="text-xs font-mono text-zinc-400 sm:text-right">
                  <div>2022 – 2026</div>
                  <div className="text-emerald-400 font-semibold">CGPA: 7.30 / 10.0</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <span className="font-bold text-zinc-200">Narayana Junior College, Hyderabad</span>
                  <div className="text-xs text-zinc-400">Higher Secondary Certificate (HSC) — Science &amp; Mathematics</div>
                </div>
                <div className="text-xs font-mono text-zinc-400 sm:text-right">
                  <div>Completed 2022</div>
                  <div className="text-emerald-400 font-semibold">Score: 90.2%</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <span className="font-bold text-zinc-200">Sri Sri Ravishankar English School, Latur</span>
                  <div className="text-xs text-zinc-400">Secondary School Certificate (SSC)</div>
                </div>
                <div className="text-xs font-mono text-zinc-400 sm:text-right">
                  <div>Completed 2020</div>
                  <div className="text-emerald-400 font-semibold">Score: 91.2% (Distinction)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience & Internships */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-3 font-bold">
              Experience &amp; Internships
            </h2>
            <div className="space-y-3">
              <div className="text-xs sm:text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-zinc-100 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                    Campus Placement Selection
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">Selected &amp; Placed</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Selected through competitive campus placement drive. Focus on enterprise software engineering and data solutions.
                </p>
              </div>

              <div className="text-xs sm:text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-zinc-100">
                    Data Science Virtual Internship — AICTE
                  </span>
                  <span className="text-xs font-mono text-zinc-400">2025</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300">
                  <li>Completed a structured virtual internship focused on data analysis and deriving insights from structured datasets.</li>
                  <li>Applied data cleaning techniques, null imputation, and statistical methods to support data-driven decision-making.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Competencies (Python included, clean without bragging or beginner labels) */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-3 font-bold">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                <span className="font-bold text-zinc-200 block mb-1">Programming &amp; Scripting:</span>
                <span className="text-zinc-400">
                  Python (Pandas, data manipulation, exploratory scripts, basic automation)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                <span className="font-bold text-zinc-200 block mb-1">Database &amp; Analytics:</span>
                <span className="text-zinc-400">
                  SQL (MySQL), Multi-table Joins, Subqueries, Aggregations, Data Cleaning, Exploratory Data Analysis (EDA)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                <span className="font-bold text-zinc-200 block mb-1">Visualization &amp; Reporting:</span>
                <span className="text-zinc-400">
                  Power BI, Data Modeling, DAX Measures, Microsoft Excel (Pivot Tables, Lookup Formulas, Data Summaries)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                <span className="font-bold text-zinc-200 block mb-1">Tools &amp; Foundational Concepts:</span>
                <span className="text-zinc-400">
                  Database Management Systems (DBMS), Relational Schemas, GitHub, Git, VS Code, Technical Communication
                </span>
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-3 font-bold">
              Selected Projects
            </h2>
            <div className="space-y-4">
              <div className="text-xs sm:text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-zinc-100">
                    Sales Performance Dashboard
                  </span>
                  <span className="text-xs font-mono text-zinc-400">2025</span>
                </div>
                <div className="text-xs font-mono text-sky-400 mb-1.5">
                  Technologies: Power BI, Excel, Data Modeling
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300">
                  <li>Designed an interactive dashboard analyzing revenue trends and regional performance across product categories.</li>
                  <li>Engineered KPI metrics and connected lookup tables to surface business insights.</li>
                  <li>Delivered visual summaries that reduced manual reporting effort and improved decision-making speed.</li>
                </ul>
              </div>

              <div className="text-xs sm:text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-zinc-100">
                    SQL Data Analysis Project
                  </span>
                  <span className="text-xs font-mono text-zinc-400">2024</span>
                </div>
                <div className="text-xs font-mono text-sky-400 mb-1.5">
                  Technologies: MySQL, Relational Database Queries
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300">
                  <li>Performed end-to-end analysis of sales and customer datasets using SQL queries.</li>
                  <li>Applied multi-table joins, subqueries, and aggregations to derive business-relevant findings.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-2 font-bold">
              Certifications
            </h2>
            <div className="space-y-1.5 text-xs text-zinc-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <strong>SQL for Data Science</strong> — University of California, Davis (Coursera)
                </span>
                <span className="text-xs font-mono text-emerald-400">Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <strong>Preparing for Microsoft PL-300: Power BI Data Analyst</strong> — Microsoft
                </span>
                <span className="text-xs font-mono text-sky-400">In Preparation</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <strong>Python for Data Analysis &amp; Programming</strong> — Coursera
                </span>
                <span className="text-xs font-mono text-emerald-400">Completed</span>
              </div>
            </div>
          </div>

          {/* Achievements & Activities (No SIH finalist as requested) */}
          <div className="pt-2 border-t border-zinc-800/80">
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-2 font-bold">
              Achievements &amp; Activities
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300">
              <li><strong>Consistent Academic Standing:</strong> High academic performance with 90.2% in HSC and 91.2% in SSC.</li>
              <li><strong>Campus Placement Selection:</strong> Hired at Tata Consultancy Services (TCS) as Systems Engineer.</li>
              <li><strong>Team Collaboration:</strong> Strong communication with experience collaborating in cross-functional technical teams.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
