"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import queryClient from "@/lib/queryClient";
import { Spinner } from "@/components/ui/spinner";

import {
  createCategorySchema,
  NewCategoryFormValues,
} from "@/validators/category-schema";
import { updateCategory } from "@/actions/category-actions";

interface UpdateCategoryDialogFormProps {
  categoryId: string;
  defaultLabel: string;
  trigger?: React.ReactNode;
}

export default function UpdateCategoryDialogForm({
  categoryId,
  defaultLabel,
  trigger,
}: UpdateCategoryDialogFormProps) {
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
      label: defaultLabel,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ label: defaultLabel });
    }
  }, [isOpen, defaultLabel, reset]);

  const updateCategoryMutation = useMutation({
    mutationFn: (data: NewCategoryFormValues) =>
      updateCategory(categoryId, data),
    onSuccess: async () => {
      toast.success("Category updated successfully!");

      await queryClient.invalidateQueries({
        queryKey: ["categories-with-item-count"],
      });

      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to update category");
    },
  });

  const onSubmit: SubmitHandler<NewCategoryFormValues> = async (data) => {
    if (data.label === defaultLabel) {
      toast.error("No changes detected");
      return;
    }
    const ok = await confirm({
      title: "Confirm Category Update",
      message: `Are you sure you want to update this category to "${data.label}"?`,
    });

    if (!ok) return;

    updateCategoryMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" variant="outline">
            Edit
          </Button>
        )}
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
            <DialogTitle>Update Category</DialogTitle>
          </DialogHeader>

          <div className="px-6 py-6 space-y-6">
            <FieldSet>
              <FieldGroup>
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
              <Button
                variant="outline"
                type="button"
                disabled={isSubmitting || updateCategoryMutation.isPending}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isSubmitting || updateCategoryMutation.isPending}
            >
              {(isSubmitting || updateCategoryMutation.isPending) && (
                <Spinner />
              )}
              {isSubmitting || updateCategoryMutation.isPending
                ? "Updating..."
                : "Update Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
