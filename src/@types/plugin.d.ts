interface ILanguage {
  createdAt: string;
  updatedAt: string;
  plugin_id: string;
  language: string;
  id: number;
}

interface IScreenshot {
  screenshot_url: string;
  createdAt: string;
  updatedAt: string;
  plugin_id: string;
  id: number;
}

interface ITag {
  createdAt: string;
  updatedAt: string;
  slug: string;
  tag: string;
  id: number;
}

interface IReview {
  profile_url: string | null;
  created_at: string | null;
  createdAt: string | null;
  review: string | null;
  author: string | null;
  plugin: string | null;
  id: string | number;
  rating: number;
}

interface IFeature {
  premium_version: string;
  free_version: string;
  feature: string;
  id: string;
}

interface IFAQ {
  title: 'string';
  value: 'string';
}
interface ICategory {
  description: string;
  createdAt: string;
  updatedAt: string;
  icon_path: string;
  category: string;
  plugin: string;
  slug: string;
  id: number;
}

interface IMorePlugins {
  active_installations: number;
  category_name: string;
  review_count: number;
  short_title: string;
  plugin_name: string;
  plugin_slug: string;
  plugin_id: string;
  relevance: number;
  rating: number;
  logo: string;
}

interface IKeyBenefits {
  points: string[];
  name: string;
}

interface IChangelog {
  release_date: string;
  version: string;
  changes: string;
}

interface IPricing {
  features: { feature_name: string; description: string }[] | string[];
  billing_cycle: string;
  price: number;
  name: string;
}

// eslint-disable-next-line no-unused-vars
interface IPlugin {
  more_plugins_like_this: {
    metadata?: {
      totalCount: number;
    };
    data?: IMorePlugins[];
  };
  external_integration_capabilities: {
    descriptions: string[];
    summary: string;
  };
  types_of_support_provided: {
    types: string[];
    summary: string;
  };
  contributors: { author_name: string; slug: string }[];
  rating_by_stars: {
    [rating: string]: number;
  };
  ratings_user_sentiment_analysis: string | null;
  main_benefits: string[] | string | null;

  key_benefits: IKeyBenefits[] | null;
  link_to_learning_resources: string;
  total_reviews_count: number | null;
  wp_repository_link: string | null;
  installation_instructions: string;
  plugin_compatibilities: string[];
  customer_support: string | null;
  changelog: IChangelog[] | null;
  additional_information: string;
  official_website_link: string;
  active_installations: number;
  php_version_required: string;
  wp_version_required: string;
  documentations_link: string;
  learning_resources: string;
  screenshots: IScreenshot[];
  category: ICategory | null;
  price_page: string | null;
  download_button: string;
  languages: ILanguage[];
  price_list: IPricing[];
  free_features: string;
  rating: number | null;
  category_name: string;
  features: IFeature[];
  last_updated: string;
  tested_up_to: string;
  pro_features: string;
  plugin_name: string;
  short_title: string;
  plugin_slug: string;
  cover_photo: string;
  description: string;
  faq: IFAQ[] | null;
  generated: boolean;
  reviews: IReview[];
  plugin_id: string;
  createdAt: string;
  updatedAt: string;
  demo: string | [];
  overview: string;
  version: string;
  video: string;
  logo: string;
  tags: ITag[];
  slug: string;
  tag: string;
}
interface IDeveloper {
  active_installations: number;
  rating: number | null;
  category: ICategory;
  short_title: string;
  plugin_slug: string;
  plugin_name: string;
  plugin_id: string;
  plugin: string;
  logo: string;
}
export interface IContributor {
  wordpress_origin_story: string;
  contributor: IDeveloper[];
  developer: IDeveloper[];
  user_member_since: any;
  author_name: string;
  job_title: string;
  username: string;
  location: string;
  employer: string;
  website: string;
  avatar: string;
  slug: string;
  bio: string;
}
