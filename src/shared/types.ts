export interface BlogPost {
  title: string;
  img: string;
  tag: string;
  date: { day: string; month: string };
  des: string[];
}

export interface PortfolioProject {
  name: string;
  img: string;
  project: string;
  role: string;
  description: string;
  technologies: string;
  status: string;
  url: string;
}
