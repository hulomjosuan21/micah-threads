"use client";
import AppContent from "@/components/layout/app-content";
import CategorySection from "./components/CategorySection";

export default function DashboardPage() {
  return (
    <AppContent
      title={"Dashboard"}
      description={"Your current dashboard overview"}
      actions={<></>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div></div>
        <div></div>
        <CategorySection />
        <div></div>
      </div>
    </AppContent>
  );
}
