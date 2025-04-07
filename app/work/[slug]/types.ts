export interface MediaAsset {
  _id: string;
  url: string;
  originalFilename: string;
  mimeType: string;
}

export interface MediaItem {
  asset: MediaAsset;
}

export interface WorkProps {
  core?: {
    producerName?: string;
    clientName?: string;
    projectTitle?: string;
    projectCategory?: string;
    projectChallenge?: string;
    projectTechStack?: string[];
  };
  brandDevelopment?: {
    purpose?: { title: string; description: string };
    audience?: { title: string; description: string };
    archetypes?: any[]; // Keep any for now
    associations?: { title: string }[];
    mood?: { title: string; description: string }[];
  };
  webDesign?: {
    title: string;
    description: string;
    media: MediaItem;
    link?: string;
  }[];
  webDevelopment?: {
    features?: {
      title: string;
      description: string;
      media?: MediaItem[];
      link?: string;
      microFeatures?: {
        title: string;
        description: string;
        media?: MediaItem[];
        link?: string;
      }[];
    }[];
  };
  mediaContent?: {
    title: string;
    description: string;
    media: MediaItem;
    link?: string;
  }[];
  slug: string | { current: string };
  title: string;
  description: string;
  categories: { slug: string }[];
  coverImage: {
    url?: string;
    asset?: {
      url: string;
    };
  };
}

export interface RelatedWorkProps {
  currentWork?: WorkProps;
  nextWork?: WorkProps | null;
  prevWork?: WorkProps | null;
  primaryCategory?: string;
}

export interface SectionProps {
  work: WorkProps;
  color?: string;
}
