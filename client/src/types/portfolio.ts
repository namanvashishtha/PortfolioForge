export interface ComponentProps {
  [key: string]: any;
}

export interface PortfolioComponent {
  id: string;
  type: string;
  props: ComponentProps;
  children?: PortfolioComponent[];
}

export interface PortfolioLayout {
  components: PortfolioComponent[];
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
}

export interface Portfolio {
  id: number;
  userId: string;
  name: string;
  layout: PortfolioLayout;
  isPublished: boolean;
  publishedUrl?: string;
  siteName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComponentDefinition {
  type: string;
  name: string;
  icon: string;
  category: 'layout' | 'content';
  defaultProps: ComponentProps;
  description: string;
}
