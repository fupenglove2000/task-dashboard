"use client";

import { Task } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trash2, GripVertical } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  isDragging?: boolean;
}

const priorityColors = {
  LOW: "success",
  MEDIUM: "warning",
  HIGH: "destructive",
} as const;

const priorityLabels = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export function TaskCard({ task, onEdit, onDelete, isDragging }: TaskCardProps) {
  return (
    <Card
      className={`p-3 cursor-pointer hover:shadow-md transition-shadow ${
        isDragging ? "shadow-lg rotate-2" : ""
      }`}
      onClick={() => onEdit(task)}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0 cursor-grab" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm truncate">{task.title}</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
            >
              <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>

          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant={priorityColors[task.priority]} className="text-xs">
              {priorityLabels[task.priority]}
            </Badge>

            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(task.dueDate)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
