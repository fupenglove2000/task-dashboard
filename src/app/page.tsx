import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  CheckCircle,
  BarChart3,
  Zap,
  ArrowRight,
  Kanban,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Kanban className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Organize Your Work,
          <br />
          <span className="text-primary">Achieve More</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          TaskFlow is a modern task management platform that helps you and your
          team stay organized, track progress, and deliver results faster.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button size="lg" className="gap-2">
              Start Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to manage tasks
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Kanban className="h-8 w-8" />}
            title="Kanban Board"
            description="Visualize your workflow with drag-and-drop kanban boards. Move tasks through stages effortlessly."
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8" />}
            title="Analytics"
            description="Track your productivity with beautiful charts and insights. Know where your time goes."
          />
          <FeatureCard
            icon={<CheckCircle className="h-8 w-8" />}
            title="Task Management"
            description="Create, organize, and prioritize tasks with ease. Set due dates and never miss a deadline."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Fast & Modern"
            description="Built with the latest technology for a smooth, responsive experience on any device."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500K+</div>
              <div className="text-muted-foreground">Tasks Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Join thousands of users who are already managing their tasks more
          efficiently with TaskFlow.
        </p>
        <Link href="/login">
          <Button size="lg" className="gap-2">
            Get Started for Free <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Kanban className="h-5 w-5 text-primary" />
              <span className="font-semibold">TaskFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
