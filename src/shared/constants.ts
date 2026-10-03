import { BlogPost, PortfolioProject } from "./types";

export const projects: PortfolioProject[] = [
  {
    name: "Healthcare Patient Platform",
    img: "img/projects/health-care-web.png",
    project: "Patient Web Application",
    role: "Frontend Engineering",
    description:
      "A patient-facing healthcare platform for finding doctors, booking appointments, managing profiles, and supporting real-time medical workflows.",
    technologies: "Next.js, React, TypeScript, Redux, Socket.IO",
    status: "Live",
    url: "https://health-care.duckdns.org",
  },
  {
    name: "Healthcare Admin Platform",
    img: "img/projects/health-care-admin.png",
    project: "Operations Dashboard",
    role: "Frontend & Platform Engineering",
    description:
      "An administration platform for doctors, patients, appointments, medical records, billing, content, and configurable role-based access control.",
    technologies: "Meteor, React, TypeScript, MongoDB, MUI",
    status: "Live",
    url: "https://admin.health-care.duckdns.org",
  },
  {
    name: "Green Earth Action Foundation",
    img: "img/projects/geaf-foundation.png",
    project: "Nonprofit Website",
    role: "Frontend Engineering",
    description:
      "A bilingual foundation website presenting climate action, environmental education, advocacy, community projects, news, and ways to get involved.",
    technologies: "Next.js, React, TypeScript, Tailwind CSS",
    status: "Live",
    url: "https://www.geaf.foundation/",
  },
  {
    name: "ElderCare Monitoring System",
    img: "img/projects/eldercare.png",
    project: "Clinical Care Platform",
    role: "Frontend Engineering",
    description:
      "A staff-facing elderly-care platform designed to support caregivers with monitoring tools for graceful aging and specialized nursing care.",
    technologies: "Next.js, React, TypeScript, Redux, MUI",
    status: "Live",
    url: "http://45.77.39.217:3000/",
  },
  {
    name: "Personal Portfolio",
    img: "img/projects/mj-portfolio.png",
    project: "Portfolio Website",
    role: "Design & Development",
    description:
      "A responsive personal portfolio built to present my experience, production work, technical writing, and contact information.",
    technologies: "Next.js, React, TypeScript, CSS",
    status: "Live",
    url: "https://mj-portfolio.duckdns.org",
  },
  {
    name: "Elizah Business Website",
    img: "img/projects/elizah-business.png",
    project: "Business Website",
    role: "Frontend Development",
    description:
      "An earlier responsive business website featuring service pages, language navigation, galleries, articles, team information, contact sections, and carousel-driven content.",
    technologies: "Next.js, React, Responsive CSS, Slick Carousel",
    status: "Archived Demo",
    url: "https://seoproject.vercel.app/",
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: "Building Role-Based Access Control Beyond the Sidebar",
    img: "img/projects/health-care-admin.png",
    tag: "Security & Architecture",
    date: { day: "03", month: "oct" },
    des: [
      "A hidden menu item is not access control. While rebuilding the healthcare administration platform, I replaced its single all-or-nothing admin check with stable permissions that protect routes, publications, methods, dashboard components, and profile tabs.",
      "The central access registry connects each permission ID to its URL, required parent routes, Meteor publications, methods, dashboard cards, and nested tabs. This gives the project one human-readable policy instead of scattering permission rules across unrelated components.",
      "Super administrators always receive full access, while financial, operations, content, and website administrators start with practical defaults that can be edited later. The dashboard and personal profile remain safe routes, and the final super administrator cannot be demoted or deactivated.",
      "The important result is consistency: navigation can explain what a user may do, while the server independently verifies the same permission before returning data or changing it.",
    ],
  },
  {
    title: "Securing Meteor Publications and Methods by Route Context",
    img: "img/projects/health-care-web.png",
    tag: "Meteor & Security",
    date: { day: "02", month: "oct" },
    des: [
      "Once the user interface was permission-aware, the next step was enforcing the same rules at the data boundary. Every protected Meteor publication was mapped to the page or action that legitimately consumes it, so manually subscribing no longer bypasses the interface.",
      "Sensitive methods now authenticate directly inside Meteor.methods with this.userId. Internal business functions no longer receive an administrator ID and pretend to authenticate it later, which makes the trust boundary clear and prevents callers from supplying identity data.",
      "Shared functions required more care. Profile updates, searches, and autocomplete methods are also used by patient, doctor, web, or socket flows. The admin branch now receives an explicit typed route context, while the existing public and self-service behavior remains intact.",
      "This approach keeps authorization close to the network entry point without duplicating the business logic used by the rest of the healthcare system.",
    ],
  },
  {
    title: "Designing a React 19 Permission Editor with MUI Tree View",
    img: "img/projects/eldercare.png",
    tag: "React & UI",
    date: { day: "01", month: "oct" },
    des: [
      "The role editor needed to represent dozens of routes without becoming another maintenance problem. I used MUI X Rich Tree View and generated its hierarchy from the same access registry used by routing and server authorization.",
      "Each route has a stable unique ID, readable label, icon, URL, and dependency information. Parent pages, create and edit actions, dashboard widgets, and doctor or patient tabs remain understandable without exposing implementation details such as publication names to the administrator.",
      "The dashboard is always selected, and the super-administrator tree is fully selected and read-only. Other roles begin with useful defaults, can be edited, and automatically retain mandatory routes needed by the actions they receive.",
      "React 19 also influenced the implementation. Selection is derived from loaded role data instead of synchronously copying server state inside an effect, avoiding cascading renders while keeping the form controlled and predictable.",
    ],
  },
  {
    title: "Turning a Portfolio Template into a Real Engineering Portfolio",
    img: "img/projects/mj-portfolio.png",
    tag: "Next.js & UX",
    date: { day: "30", month: "sep" },
    des: [
      "A polished template is only a starting point. This portfolio originally contained fictional projects, stock images, demo links, and generic blog posts, so the design looked complete without describing any real engineering work.",
      "I replaced the demo cards with typed project data, live links, accurate responsibilities, verified technology stacks, and screenshots captured from the deployed applications. The detail panel now focuses on the problem, my role, the implementation, and the live result instead of invented clients and budgets.",
      "The single-page navigation also needed a subtle rendering fix. Refreshing a hash URL such as #about initially displayed Home because the server could not see the fragment. The initial navigation state now remains unresolved until a layout-timed hash check selects the correct section before paint.",
      "The result is still the visual design I liked, but the content now supports it with real projects and technical decisions that I can discuss in detail.",
    ],
  },
];

export const navItems = [
  { id: "home", name: "Home", dkMenuName: "Home", icon: "fa fa-home" },
  { id: "about", name: "About me", dkMenuName: "About", icon: "fa fa-user" },
  {
    id: "work",
    name: "my Portfolio",
    dkMenuName: "Portfolio",
    icon: "fa fa-briefcase",
  },
  {
    id: "contact",
    name: "get in touch",
    dkMenuName: "Contact",
    icon: "fa fa-envelope-open",
  },
  { id: "blog", name: "my Blog", dkMenuName: "Blog", icon: "fa fa-comments" },
];

export const typewriterWords = [
  "Majid Vezvaee",
  "a web developer",
  "an engineer",
  "a freelancer",
];

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const INVALID_NAME_KEYS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "=",
  "{",
  "}",
  "[",
  "]",
  "|",
  "\\",
  ":",
  ";",
  '"',
  "<",
  ">",
  ",",
  "?",
  "/",
  "~",
  "`",
  ".",
];
