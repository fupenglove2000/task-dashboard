"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsChartsProps {
  stats: {
    todo: number;
    inProgress: number;
    done: number;
    byPriority: {
      low: number;
      medium: number;
      high: number;
    };
    recentCompleted: {
      date: string;
      count: number;
    }[];
  };
}

const STATUS_COLORS = ["#eab308", "#3b82f6", "#22c55e"];
const PRIORITY_COLORS = ["#22c55e", "#eab308", "#ef4444"];

export function StatsCharts({ stats }: StatsChartsProps) {
  const statusData = [
    { name: "To Do", value: stats.todo },
    { name: "In Progress", value: stats.inProgress },
    { name: "Done", value: stats.done },
  ];

  const priorityData = [
    { name: "Low", value: stats.byPriority.low },
    { name: "Medium", value: stats.byPriority.medium },
    { name: "High", value: stats.byPriority.high },
  ];

  const trendData = stats.recentCompleted.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    completed: item.count,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Task Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {statusData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-1 text-xs">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: STATUS_COLORS[index] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Priority Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">By Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {priorityData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Completion Trend */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-base">7-Day Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
