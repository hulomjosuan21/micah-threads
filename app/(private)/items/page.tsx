import { Metadata } from "next";
import ItemsPage from "./ItemsPage";

export const metadata: Metadata = {
  title: "Items",
  description:
    "Helping you manage your items with ease. View, track, and update your items all in one place. Stay organized and efficient with our comprehensive item management system.",
};

export default function Page() {
  return <ItemsPage />;
}
