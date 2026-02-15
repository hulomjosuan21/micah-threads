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
import { Item } from "@/types/item";
import { toast } from "sonner";
import { ToastResponse } from "@/types";
import addItem from "@/actions/item-actions";

export default function AddItemDialogForm() {
  const { options, isLoading: isCatsLoading } = useCategoryOptions();
  const [isVariant, setIsVariant] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { confirm, isOpen: isConfirmOpen } = useConfirm();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      itemName: "",
      variantLabel: "",
      description: "",
      itemCode: "",
      price: 0,
      stock: 0,
      categoryId: "",
      images: [],
    },
  });

  const itemName = watch("itemName");

  useEffect(() => {
    if (!isVariant && itemName && itemName.length >= 3) {
      const prefix = itemName.substring(0, 3).toUpperCase();
      setValue("itemCode", `${prefix}-1`, { shouldValidate: true });
    }
  }, [itemName, isVariant, setValue]);

  const resetForm = () => {
    reset();
    setIsOpen(false);
  };

  const addItemMutation = useMutation({
    mutationFn: (item: Omit<Item, "productId" | "createdAt">) => addItem(item),
    onSuccess: async (response: ToastResponse) => {
      const { title, description } = response;
      toast.success(title, {
        description: (
          <span className="text-muted-foreground">{description}</span>
        ),
      });
      resetForm();
    },
    onError: (error) => {
      console.error("Error adding item:", error);
      toast.error("Failed to add item. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const ok = await confirm({
      title: "Confirm Item Creation",
      message: `Are you sure you want to create the item "${data.itemName}"?`,
    });

    if (!ok) return;
    const supabase = createClient();
    const uploadedPaths = await Promise.all(
      (data.images ?? [])
        .filter((f) => f?.file instanceof File)
        .map((f) => supabaseUploadFile(supabase, f.file, "items")),
    );

    const payload: Omit<Item, "productId" | "createdAt"> = {
      itemName: data.itemName,
      variantLabel: data.variantLabel ?? null,
      description: data.description ?? null,
      itemCode: data.itemCode,
      price: Number(data.price),
      stock: Number(data.stock),
      categoryId: data.categoryId,
      imagesPaths: uploadedPaths as string[],
    };
    addItemMutation.mutate(payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus size={16} /> Add Item
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "h-[85svh] flex flex-col p-0 overflow-hidden hide-close-button",
          isConfirmOpen &&
            "pointer-events-none opacity-0 transition-opacity duration-200",
        )}
        aria-describedby={undefined}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 min-h-0"
        >
          <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 min-h-0">
            <div className="px-6 py-6 space-y-6">
              <FieldSet>
                <FieldGroup>
                  <FieldLabel>Item Images</FieldLabel>
                  <FileUpload
                    maxFiles={3}
                    onFilesChange={(files) =>
                      setValue("images", files, { shouldValidate: true })
                    }
                  />
                  {errors.images && (
                    <FieldError>{errors.images.message as string}</FieldError>
                  )}
                </FieldGroup>

                <Alert className="max-w-md">
                  <AlertTitle>Is this a variant?</AlertTitle>
                  <AlertDescription>
                    Toggle to select an existing SKU series.
                  </AlertDescription>
                  <AlertAction>
                    <Switch
                      checked={isVariant}
                      onCheckedChange={setIsVariant}
                    />
                  </AlertAction>
                </Alert>

                <FieldGroup className="">
                  <Field>
                    <FieldLabel htmlFor="itemName">Item Name*</FieldLabel>
                    <Input
                      id="itemName"
                      {...register("itemName")}
                      placeholder="e.g. Medium Crochet Bouquet"
                    />
                    {errors.itemName && (
                      <FieldError>{errors.itemName.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="variantLabel">
                      Variant Label
                    </FieldLabel>
                    <Input
                      id="variantLabel"
                      {...register("variantLabel")}
                      placeholder="e.g. Matte Black"
                    />
                  </Field>
                </FieldGroup>

                <FieldGroup className="">
                  <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                      id="description"
                      {...register("description")}
                      placeholder="e.g. A beautiful handmade bouquet perfect for any occasion."
                    />
                  </Field>
                </FieldGroup>

                <FieldGroup className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="itemCode">
                      Item Code / SKU<span className="text-red-400">*</span>
                    </FieldLabel>
                    {isVariant ? (
                      <Select
                        onValueChange={(val) =>
                          setValue("itemCode", `${val}-2`, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <SelectTrigger id="itemCode">
                          <SelectValue placeholder="Select Base SKU" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ONC">ONC (Onic Mouse)</SelectItem>
                          <SelectItem value="LOG">LOG (Logitech G)</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="relative">
                        <Input
                          id="itemCode"
                          {...register("itemCode")}
                          readOnly
                          placeholder="SKU-12345"
                        />
                        <Sparkles className="absolute right-3 top-2.5 size-4 text-primary opacity-50" />
                      </div>
                    )}
                    {errors.itemCode && (
                      <FieldError>{errors.itemCode.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="price">
                      Price<span className="text-red-400">*</span>
                    </FieldLabel>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register("price")}
                      placeholder="0.00"
                    />
                    {errors.price && (
                      <FieldError>{errors.price.message}</FieldError>
                    )}
                  </Field>
                </FieldGroup>

                <FieldGroup className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="stock">
                      Stock<span className="text-red-400">*</span>
                    </FieldLabel>
                    <Input
                      id="stock"
                      type="number"
                      {...register("stock")}
                      placeholder="0"
                    />
                    {errors.stock && (
                      <FieldError>{errors.stock.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="category">
                      Category<span className="text-red-400">*</span>
                    </FieldLabel>
                    <Select
                      onValueChange={(val) =>
                        setValue("categoryId", val, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger id="category" disabled={isCatsLoading}>
                        <SelectValue
                          placeholder={
                            isCatsLoading ? "Loading..." : "Select Category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {options.map((option) => (
                            <SelectItem
                              key={option.categoryId}
                              value={option.categoryId}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.categoryId && (
                      <FieldError>{errors.categoryId.message}</FieldError>
                    )}
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
          </ScrollArea>

          <DialogFooter className="px-6 py-4 border-t shrink-0">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting || addItemMutation.isPending}
            >
              {(isSubmitting || addItemMutation.isPending) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting || addItemMutation.isPending
                ? "Adding..."
                : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
