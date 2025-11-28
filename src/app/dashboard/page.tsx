import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCharts } from "@/components/charts/stats-charts";
import { CheckCircle, Clock, ListTodo, TrendingUp } from "lucide-react";

async function getStats(userId: string) {
  const [total, todoCount, inProgressCount, doneCount] = await Promise.all([
    prisma.task.count({ where: { userId } }),
    prisma.task.count({ where: { userId, status: "TODO" } }),
    prisma.task.count({ where: { userId, status: "IN_PROGRESS" } }),
    prisma.task.count({ where: { userId, status: "DONE" } }),
  ]);

  const completionRate = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const [lowPriority, mediumPriority, highPriority] = await Promise.all([
    prisma.task.count({ where: { userId, priority: "LOW" } }),
    prisma.task.count({ where: { userId, priority: "MEDIUM" } }),
    prisma.task.count({ where: { userId, priority: "HIGH" } }),
  ]);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentTasks = await prisma.task.findMany({
    where: {
      userId,
      status: "DONE",
      updatedAt: { gte: sevenDaysAgo },
    },
    select: { updatedAt: true },
  });

  const completedByDate: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    completedByDate[dateStr] = 0;
  }

  recentTasks.forEach((task: { updatedAt: Date }) => {
    const dateStr = task.updatedAt.toISOString().split("T")[0];
    if (completedByDate[dateStr] !== undefined) {
      completedByDate[dateStr]++;
    }
  });

  const recentCompleted = Object.entries(completedByDate).map(
    ([date, count]) => ({ date, count })
  );

  return {
    total,
    todo: todoCount,
    inProgress: inProgressCount,
    done: doneCount,
    completionRate,
    byPriority: { low: lowPriority, medium: mediumPriority, high: highPriority },
    recentCompleted,
  };
}

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getStats(session!.user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name?.split(" ")[0]}!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon={<ListTodo className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="To Do"
          value={stats.todo}
          icon={<Clock className="h-4 w-4 text-yellow-500" />}
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
        />
        <StatsCard
          title="Completed"
          value={stats.done}
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          description={`${stats.completionRate}% completion rate`}
        />
      </div>

      <StatsCharts stats={stats} />
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
