export type EventType = 'workshop' | 'guest_lecture' | 'hackathon' | 'social';
export type Complexity = 'o1' | 'on' | 'on2';
export type NewsTag = 'update_log' | 'announcement' | 'recap';

export interface Event {
  slug: string;
  type: EventType;
  complexity: Complexity;
  timestamp: string;
  location: string;
  capacity: { current: number; max: number };
  input: string;
  output: string;
  speakers: string[];
  registerUrl: string;
  excerpt: string;
  featured: boolean;
  content: string;
}

export interface NewsItem {
  slug: string;
  timestamp: string;
  tag: NewsTag;
  excerpt: string;
  content: string;
}

export interface PageMeta {
  title: string;
  description: string;
  content: string;
}

export type BoardClass = 'root' | 'daemon' | 'allocator' | 'compiler' | 'scheduler';

export interface BoardMember {
  id: string;
  name: string;
  portrait: string;
  class: BoardClass;
  processName: string;
  roleKey: 'leder' | 'nestleder' | 'okonomi' | 'markeds' | 'bedrift' | 'arrangement';
  order: number;
  metrics: { label: string; value: string }[];
}
