"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus } from "@prisma/client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { TaskCard } from "./task-card";
import { TaskForm } from "./task-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const columns: { id: TaskStatus; title: string; color: string }[] = [
  { id: "TODO", title: "To Do", color: "bg-yellow-500" },
  { id: "IN_PROGRESS", title: "In Progress", color: "bg-blue-500" },
  { id: "DONE", title: "Done", color: "bg-green-500" },
];

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    const taskId = draggableId;

    // Optimistic update
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Update in backend
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Error updating task:", error);
      fetchTasks(); // Revert on error
    }
  };

  const handleCreateTask = async (data: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: string;
    dueDate: string;
  }) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateTask = async (data: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: string;
    dueDate: string;
  }) => {
    if (!editingTask) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/tasks/${editingTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    try {
      await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
    } catch (error) {
      console.error("Error deleting task:", error);
      fetchTasks();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Drag and drop to change status
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h3 className="font-semibold">{column.title}</h3>
                <span className="text-muted-foreground text-sm">
                  ({tasks.filter((t) => t.status === column.id).length})
                </span>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-[200px] transition-colors rounded-lg p-2 ${
                      snapshot.isDraggingOver ? "bg-muted" : ""
                    }`}
                  >
                    {tasks
                      .filter((task) => task.status === column.id)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onEdit={setEditingTask}
                                onDelete={handleDeleteTask}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onClose={() => setShowForm(false)}
          isLoading={isSaving}
        />
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={handleUpdateTask}
          onClose={() => setEditingTask(null)}
          isLoading={isSaving}
        />
      )}
    </>
  );
}
