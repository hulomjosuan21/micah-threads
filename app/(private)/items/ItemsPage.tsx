"use client";
import AppContent from "@/components/layout/app-content";

import AddItemDialogForm from "@/forms/AddItemDialogForm";

export default function ItemsPage() {
  return (
    <AppContent
      title={"Items"}
      description={"Your current listed items"}
      actions={
        <>
          <AddItemDialogForm />
        </>
      }
    >
      <pre>
        <code></code>
      </pre>
    </AppContent>
  );
}
