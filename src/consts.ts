// Central site configuration. Mirrors the params that lived in the old
// Hugo hugo.toml so the look and metadata stay identical.

export interface MenuItem {
  name: string;
  url: string;
}

export interface SocialLink {
  title: string;
  icon: string;
  url: string;
}

export const SITE_TITLE = "";

// Name shown in the browser tab and used for page <title>s.
export const SITE_NAME = "shrenikm";
export const SITE_DESCRIPTION = "Posts for when I feel like it";
export const BASE_URL = "https://shrenikm.com";

// Google Analytics (GA4) measurement ID. Public by design; empty disables it.
export const GA_MEASUREMENT_ID = "G-E2P4DFRG5B";

export const AUTHOR = {
  name: "Shrenik Muralidhar",
  email: "shrenik95@gmail.com",
  github: "shrenikm",
  linkedin: "shrenik95",
};

export const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const MAIN_MENU: MenuItem[] = [
  { name: "Posts", url: "/" },
  { name: "About", url: "/pages/about/" },
  { name: "Tags", url: "/tags/" },
];

// Heart / like button. Points at the self hosted Cloudflare Worker that stores
// per post like counts. An empty string disables the button: it renders nothing
// until the worker is deployed and this URL is filled in.
export const HEART_API_URL = "https://heart-worker.shrenikm.workers.dev";

// giscus comments (https://giscus.app). Comments live in this site's GitHub
// repository Discussions, so there is nothing to self host. Fill in the four
// values from the giscus configurator. An empty repo or repoId disables
// comments (they render nothing) until configured.
export const GISCUS = {
  repo: "shrenikm/shrenikm.github.io",
  repoId: "MDEwOlJlcG9zaXRvcnkxNjUxNTI0MzQ=",
  category: "Announcements",
  categoryId: "DIC_kwDOCdgGss4C-Ln8",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    title: "GitHub",
    icon: "fab fa-github",
    url: `https://github.com/${AUTHOR.github}`,
  },
  {
    title: "LinkedIn",
    icon: "fab fa-linkedin-in",
    url: `https://linkedin.com/in/${AUTHOR.linkedin}`,
  },
  {
    title: "Email",
    icon: "fas fa-envelope",
    url: `mailto:${AUTHOR.email}`,
  },
  {
    title: "RSS",
    icon: "fas fa-rss",
    url: "/rss.xml",
  },
];
