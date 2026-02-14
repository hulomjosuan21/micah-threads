import DashboardPage from "./DashboardPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Helping you manage your dashboard with ease. View, track, and update your dashboard all in one place. Stay organized and efficient with our comprehensive dashboard management system.",
};
export default function Page() {
  return <DashboardPage />;
}
