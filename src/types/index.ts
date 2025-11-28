import { Task, TaskStatus, TaskPriority } from "@prisma/client";

export type { Task, TaskStatus, TaskPriority };

export interface TaskWithUser extends Task {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string | null;
  order?: number;
}

export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  completionRate: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
  };
  recentCompleted: {
    date: string;
    count: number;
  }[];
}
