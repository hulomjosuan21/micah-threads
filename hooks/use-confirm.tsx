import { ConfirmContext } from "@/context/confirm-context";
import { useContext } from "react";

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context)
    throw new Error("useConfirm must be used within ConfirmProvider");
  return context;
};

/* Example of usage:
export function DeleteProductButton() {
  const confirm = useConfirm();

  const handleDelete = async () => {
    const ok = await confirm({
      icon: AlertTriangle, // Pass the icon here
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product? This action cannot be undone.',
      confirmText: 'Delete',
      variant: 'destructive'
    });

    if (ok) {
      // API call logic...
      console.log("Confirmed!");
    }
  };

  return <Button onClick={handleDelete} variant="destructive">Delete Product</Button>;
}
  */
