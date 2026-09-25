import { ProfileData, Project, Achievement, SkillCategory } from '../types/portfolio';

export const initialProfileData: ProfileData = {
  name: 'Vinay Bahire',
  handle: '@BahireVinay',
  title: 'Systems Engineer @ TCS',
  location: 'Pune, India',
  availability: 'Open to Technology & Data Analytics Collaborations',
  avatarUrl: 'https://avatars.githubusercontent.com/BahireVinay',
  bioHeadline: 'Engineering clean relational queries, Python exploratory analysis, and intuitive Power BI analytical reports.',
  bioNarrative: [
    'Information Technology graduate from the International Institute of Information Technology (I²IT), Pune (CGPA: 7.30).',
    'Passionate about writing clean SQL queries, developing Python scripts for exploratory data analysis, and building interactive Power BI dashboards that turn everyday business numbers into intuitive visual insights.'
  ],
  email: 'vinaybahire111@gmail.com',
  socials: {
    github: 'https://github.com/BahireVinay',
    linkedin: 'https://linkedin.com/in/vinay-bahire',
    twitter: 'https://twitter.com',
  },
  metrics: [
    { label: 'Undergrad CGPA', value: '7.30', context: 'I²IT Pune' },
    { label: 'Higher Secondary', value: '90.2%', context: 'Distinction (HSC)' },
    { label: 'Secondary School', value: '91.2%', context: 'Distinction (SSC)' },
    { label: 'Location', value: 'Pune', context: 'India' }
  ],
  pillars: [
    {
      index: '01',
      title: 'Database & SQL Analysis',
      description: 'Writing relational queries, managing joins and subqueries, and exploring dataset structures across relational databases.'
    },
    {
      index: '02',
      title: 'Python Scripting & Data Wrangling',
      description: 'Using Python and standard data libraries to clean messy records, manipulate data structures, and automate routine data tasks.'
    },
    {
      index: '03',
      title: 'Business Intelligence & Reporting',
      description: 'Constructing Power BI dashboards, building relational data models, and designing intuitive charts for executive review.'
    }
  ],
  education: [
    {
      institution: 'International Institute of Information Technology (I²IT), Pune',
      degree: 'Bachelor of Engineering (B.E.) in Information Technology',
      period: '2022 – 2026',
      grade: 'CGPA: 7.30 / 10.0',
      details: 'Coursework covering Database Management Systems, Data Structures, Computer Networks, and Operating Systems.'
    },
    {
      institution: 'Narayana Junior College, Hyderabad',
      degree: 'Higher Secondary Certificate (HSC) — Science & Mathematics',
      period: 'Completed 2022',
      grade: '90.2%',
      details: 'Strong quantitative background across mathematics, physics, and chemistry.'
    },
    {
      institution: 'Sri Sri Ravishankar English School, Latur',
      degree: 'Secondary School Certificate (SSC)',
      period: 'Completed 2020',
      grade: '91.2%',
      details: 'Graduated with distinction and consistent academic honors.'
    }
  ],
  certifications: [
    {
      name: 'SQL for Data Science',
      issuer: 'University of California, Davis (Coursera)',
      status: 'Verified Credential'
    },
    {
      name: 'Preparing for Microsoft PL-300: Power BI Data Analyst',
      issuer: 'Microsoft',
      status: 'Active Candidate'
    },
    {
      name: 'Python for Data Analysis & Programming',
      issuer: 'Coursera / Online Learning',
      status: 'Completed'
    },
    {
      name: 'Data Science Virtual Internship',
      issuer: 'AICTE',
      status: 'Completed'
    }
  ]
};

export const initialProjects: Project[] = [
  {
    id: 'sales-performance-dashboard',
    title: 'Sales Performance Dashboard',
    tagline: 'Interactive Power BI and Excel dashboard analyzing revenue trends and product sales',
    category: 'systems',
    categoryLabel: 'Business Intelligence & Reporting',
    year: '2025',
    summary: 'A clean business intelligence dashboard built to track product category revenues, quarterly trends, and regional performance.',
    challenge: 'Scattered sales records made it difficult to compare regional outcomes and evaluate product margins quickly.',
    solution: 'Built relational data tables, linked dimension keys, and crafted interactive visual summaries that speed up reporting and review.',
    architecture: [
      'Relational table relationships with date and product lookup dimensions',
      'Calculated measures in Power BI for YoY growth and category share',
      'Interactive slicers for regional and quarterly filtering',
      'Clean tabular summary cards for key metrics'
    ],
    metrics: [
      { label: 'Reporting Effort', value: 'Reduced' },
      { label: 'Visual Clarity', value: 'Interactive' },
      { label: 'Tooling', value: 'Power BI' }
    ],
    techStack: ['Power BI', 'Excel', 'Data Cleaning', 'Data Modeling'],
    githubUrl: 'https://github.com/BahireVinay',
    liveUrl: 'https://github.com/BahireVinay',
    featured: true,
    bentoSpan: 'col-span-12 lg:col-span-8',
    themeColor: '#38bdf8'
  },
  {
    id: 'sql-data-analysis',
    title: 'Relational Data Analysis & Queries',
    tagline: 'Structured database exploration and insights using MySQL queries and joins',
    category: 'systems',
    categoryLabel: 'Database Management',
    year: '2024',
    summary: 'End-to-end relational exploration of customer and sales transaction records to identify purchasing patterns and revenue numbers.',
    challenge: 'Transactional datasets required multiple table joins and filtering conditions to generate coherent summary tables.',
    solution: 'Designed organized SQL queries utilizing inner/left joins, grouping aggregations, and subqueries to extract targeted insights.',
    architecture: [
      'Multi-table joins linking customer, order, and product records',
      'Aggregations with GROUP BY and HAVING clauses for cohort trends',
      'Data filtering and subqueries for top-performing accounts',
      'Tested and validated on MySQL database environments'
    ],
    metrics: [
      { label: 'Query Coverage', value: 'Multi-table' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Integrity', value: 'Verified' }
    ],
    techStack: ['MySQL', 'Relational Databases', 'Data Analysis', 'VS Code'],
    githubUrl: 'https://github.com/BahireVinay',
    liveUrl: 'https://github.com/BahireVinay',
    featured: true,
    bentoSpan: 'col-span-12 lg:col-span-4',
    themeColor: '#10b981'
  },
  {
    id: 'python-data-wrangling',
    title: 'Python Exploratory Data Analysis & Scripts',
    tagline: 'Data cleaning, feature manipulation, and summary statistics using Python',
    category: 'frontend',
    categoryLabel: 'Python & Scripting',
    year: '2025',
    summary: 'Practical Python analytical routines for loading datasets, handling missing values, calculating summary statistics, and generating charts.',
    challenge: 'Raw CSVs had format discrepancies, null values, and inconsistent text fields needing systematic cleanup.',
    solution: 'Authored Python scripts utilizing standard data libraries to normalize column types, filter outliers, and generate distribution charts.',
    architecture: [
      'Pandas data frames for data ingestion, filtering, and type casting',
      'Null value imputation and duplicate removal routines',
      'Summary statistics computation (mean, median, variance)',
      'Data visualization of distributions and trends'
    ],
    metrics: [
      { label: 'Language', value: 'Python' },
      { label: 'Handling', value: 'Automated' },
      { label: 'Output', value: 'Clean CSV' }
    ],
    techStack: ['Python', 'Data Cleaning', 'Exploratory Data Analysis', 'Pandas'],
    githubUrl: 'https://github.com/BahireVinay',
    liveUrl: 'https://github.com/BahireVinay',
    featured: false,
    bentoSpan: 'col-span-12 lg:col-span-6',
    themeColor: '#f59e0b'
  },
  {
    id: 'aicte-internship',
    title: 'Data Science Virtual Internship',
    tagline: 'Practical data cleaning and exploratory analytics program with AICTE',
    category: 'tools',
    categoryLabel: 'Internship Experience',
    year: '2025',
    summary: 'Structured practical virtual internship conducted under AICTE, applying statistical concepts and data wrangling techniques to real-world datasets.',
    challenge: 'Analyzing structured datasets with varied distributions to extract business-relevant observations.',
    solution: 'Applied data cleaning methods, generated exploratory data summaries, and documented analytical findings clearly.',
    architecture: [
      'Structured dataset exploration and data validation',
      'Implementation of data cleaning workflows',
      'Basic statistical summaries to support decision-making',
      'Formal technical documentation and presentation'
    ],
    metrics: [
      { label: 'Program', value: 'AICTE' },
      { label: 'Status', value: 'Completed' },
      { label: 'Focus', value: 'Practical' }
    ],
    techStack: ['Data Cleaning', 'Exploratory Data Analysis', 'Python', 'Excel'],
    githubUrl: 'https://github.com/BahireVinay',
    liveUrl: 'https://github.com/BahireVinay',
    featured: false,
    bentoSpan: 'col-span-12 lg:col-span-6',
    themeColor: '#8b5cf6'
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-campus',
    year: '2026',
    title: 'Campus Placement Selection',
    issuer: 'Engineering Placement Drive',
    context: 'Successfully selected for technical role through competitive placement rounds.',
    metric: 'Selected & Placed',
    category: 'Award'
  },
  {
    id: 'ach-ucdavis',
    year: '2024',
    title: 'SQL for Data Science Professional Certification',
    issuer: 'University of California, Davis (Coursera)',
    context: 'Completed comprehensive coursework in relational databases, SQL queries, filtering, joins, and data analysis.',
    metric: 'UC Davis Verified',
    category: 'Publication'
  },
  {
    id: 'ach-aicte',
    year: '2025',
    title: 'Data Science Virtual Internship Completion',
    issuer: 'AICTE (All India Council for Technical Education)',
    context: 'Completed practical training in data cleaning techniques, dataset exploration, and decision-support analytics.',
    metric: 'Certified Practical Training',
    category: 'Open Source'
  },
  {
    id: 'ach-academics',
    year: '2020 – 2022',
    title: 'Consistent Academic Distinction',
    issuer: 'State Education Board',
    context: 'Maintained strong academic track record with 91.2% in SSC and 90.2% in HSC across science and mathematics.',
    metric: '91.2% SSC · 90.2% HSC',
    category: 'Award'
  }
];

export const initialSkillCategories: SkillCategory[] = [
  {
    id: 'languages-databases',
    name: 'Programming & Databases',
    summary: 'Core scripting and database management tools used for data manipulation and querying.',
    skills: [
      { name: 'Python', level: 78, years: '2+ yrs', highlight: 'Data analysis, pandas, writing data manipulation scripts, and automation', associatedProjects: ['python-data-wrangling', 'aicte-internship'] },
      { name: 'SQL & MySQL', level: 82, years: '2+ yrs', highlight: 'Writing queries, joins, grouping aggregations, and subqueries on relational schemas', associatedProjects: ['sql-data-analysis', 'sales-performance-dashboard'] },
      { name: 'Database Management Systems (DBMS)', level: 80, years: '2+ yrs', highlight: 'Relational table design, primary/foreign keys, normalization principles, and data integrity', associatedProjects: ['sql-data-analysis'] },
      { name: 'Data Cleaning & Wrangling', level: 82, years: '2+ yrs', highlight: 'Handling missing values, duplicate removal, standardizing formats, and data preparation', associatedProjects: ['python-data-wrangling', 'sales-performance-dashboard'] },
      { name: 'Exploratory Data Analysis (EDA)', level: 79, years: '2+ yrs', highlight: 'Analyzing distributions, summary metrics, correlations, and dataset patterns', associatedProjects: ['aicte-internship', 'python-data-wrangling'] }
    ]
  },
  {
    id: 'bi-visualization',
    name: 'Data Visualization & Reporting',
    summary: 'Transforming tables into clear dashboards and actionable visual reports.',
    skills: [
      { name: 'Power BI', level: 80, years: '2+ yrs', highlight: 'Connecting data sources, creating dashboard layouts, and configuring visual filters', associatedProjects: ['sales-performance-dashboard'] },
      { name: 'DAX Basics & Measures', level: 74, years: '1+ yrs', highlight: 'Writing calculated columns, simple aggregations, and comparative KPI cards', associatedProjects: ['sales-performance-dashboard'] },
      { name: 'Microsoft Excel', level: 82, years: '3+ yrs', highlight: 'Pivot tables, lookup formulas, data organization, and chart generation', associatedProjects: ['sales-performance-dashboard', 'aicte-internship'] },
      { name: 'Data Modeling & Relationships', level: 76, years: '1+ yrs', highlight: 'Connecting dimension and fact tables to support reliable cross-filtering', associatedProjects: ['sales-performance-dashboard'] }
    ]
  },
  {
    id: 'tools-professional',
    name: 'Developer Tools & Professional Skills',
    summary: 'Version control, development environments, and collaborative communication.',
    skills: [
      { name: 'Git & GitHub', level: 76, years: '2+ yrs', highlight: 'Version control, managing repositories, commits, and sharing code', associatedProjects: ['sql-data-analysis', 'python-data-wrangling'] },
      { name: 'VS Code', level: 82, years: '3+ yrs', highlight: 'Code editing, database extensions, script execution, and workspace productivity', associatedProjects: ['sql-data-analysis', 'python-data-wrangling'] },
      { name: 'Problem Solving & Analytical Thinking', level: 84, years: '3+ yrs', highlight: 'Translating problem statements into structured query logic and solutions', associatedProjects: ['sales-performance-dashboard', 'sql-data-analysis'] },
      { name: 'Teamwork & Communication', level: 85, years: '3+ yrs', highlight: 'Clear technical documentation, cross-functional collaboration, and presenting findings', associatedProjects: ['aicte-internship'] },
      { name: 'Adaptability & Continuous Learning', level: 86, years: '3+ yrs', highlight: 'Proactive learner; preparing for Microsoft PL-300 certification and enterprise systems', associatedProjects: ['sales-performance-dashboard'] }
    ]
  }
];
