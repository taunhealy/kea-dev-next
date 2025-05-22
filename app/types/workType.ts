export interface Work {
  _type?: string;
  title: string;
  slug: {
    current: string;
  };
  order?: number;
  client?: {
    title: string;
    _id: string;
  };
  categories: {
    title: string;
    slug: {
      current: string;
    };
  }[];
  description: string;
  technologies?: string[];
  completionDate?: string;
  coverImage: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  gallery?: {
    asset: {
      _ref: string;
      url?: string;
    };
  }[];
  projectUrl?: string;
  testimonial?: string;
  workType: {
    title: string;
    slug: {
      current: string;
    };
  };
}
