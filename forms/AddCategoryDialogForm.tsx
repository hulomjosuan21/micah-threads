"use client";

import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "@/components/patterns/p-file-upload-5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategoryOptions from "@/hooks/useCategory-option";
import { Plus, Sparkles, Loader2 } from "lucide-react";
import { ProductFormValues, productSchema } from "@/validators/item-validator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertAction } from "@/components/reui/alert";
import { supabaseUploadFile } from "@/lib/supabase/utils/file-upload";
import { createClient } from "@/lib/supabase/client";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import addItem from "@/actions/addItem";
import { Item } from "@/types/item";
import { toast } from "sonner";
import { ToastResponse } from "@/types";
import {
  createCategorySchema,
  NewCategoryFormValues,
} from "@/validators/category-schema";
import { Spinner } from "@/components/ui/spinner";
import { addCategory } from "@/actions/addCategory";
import queryClient from "@/lib/queryClient";

export default function AddCategoryDialogForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { confirm, isOpen: isConfirmOpen } = useConfirm();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      label: "",
    },
  });

  const addCategoryMutation = useMutation({
    mutationFn: (data: NewCategoryFormValues) => addCategory(data),
    onSuccess: async ({ title, description }) => {
      toast.success(title, {
        description: (
          <span className="text-muted-foreground">{description}</span>
        ),
      });
      await queryClient.invalidateQueries({
        queryKey: ["categories-with-item-count"],
      });
      reset();
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to add category");
    },
  });

  const onSubmit: SubmitHandler<NewCategoryFormValues> = async (data) => {
    const ok = await confirm({
      title: "Confirm Category Creation",
      message: `Are you sure you want to create the category "${data.label}"?`,
    });

    if (!ok) {
      return;
    }
    addCategoryMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus size={16} /> Add Category
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "hide-close-button p-0",
          isConfirmOpen &&
            "pointer-events-none opacity-0 transition-opacity duration-200",
        )}
        aria-describedby={undefined}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="px-6 py-4 border-b shrink-0">
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>

          <div className="px-6 py-6 space-y-6">
            <FieldSet>
              <FieldGroup className="">
                <Field>
                  <FieldLabel htmlFor="label">
                    Label<span className="text-red-400">*</span>
                  </FieldLabel>
                  <Input
                    id="label"
                    {...register("label")}
                    placeholder="e.g. Flowers"
                  />
                  {errors.label && (
                    <FieldError>{errors.label.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
          <DialogFooter className="px-6 py-4 border-t shrink-0">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting || addCategoryMutation.isPending}
            >
              {(isSubmitting || addCategoryMutation.isPending) && <Spinner />}
              {isSubmitting || addCategoryMutation.isPending
                ? "Adding..."
                : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
