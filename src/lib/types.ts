export type UserRole = "employee" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: string;
  subCategory: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  assignedTeam?: string;
  slaDue?: string;
}

export interface KBArticle {
  id: string;
  title: string;
  category: string;
  tags: string[];
  content: string;
  status: "draft" | "published";
  updatedAt: string;
  views?: number;
}

export interface NotificationRule {
  id: string;
  name: string;
  event: string;
  condition: string;
  channel: string[];
  recipients: string;
  active: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  suggestions?: {
    label: string;
    action: string;
    category?: string;
    subCategory?: string;
    articleId?: string;
  }[];
}
