"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const { categoryId } = useParams();
  return <div>{categoryId}</div>;
}
