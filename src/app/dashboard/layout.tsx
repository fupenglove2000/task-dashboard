import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={session.user} />
      <main className="md:ml-64 min-h-screen">
        <div className="container mx-auto p-6 pt-20 md:pt-6">{children}</div>
      </main>
    </div>
  );
}
