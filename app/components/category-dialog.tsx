import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "~/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  courseCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
  color: string;
  icon: string;
  isActive: boolean;
}

interface CategoryDialogProps {
  category?: Category;
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<CategoryFormData, "id">) => void;
  mode: "add" | "edit";
}

const iconOptions = [
  { value: "code", label: "Code" },
  { value: "server", label: "Server" },
  { value: "smartphone", label: "Smartphone" },
  { value: "bar-chart-3", label: "Bar Chart" },
  { value: "palette", label: "Palette" },
  { value: "languages", label: "Languages" },
  { value: "settings", label: "Settings" },
  { value: "shield", label: "Shield" },
  { value: "database", label: "Database" },
  { value: "wrench", label: "Wrench" },
  { value: "book-open", label: "Book" },
  { value: "graduation-cap", label: "Graduation Cap" },
  { value: "users", label: "Users" },
  { value: "globe", label: "Globe" },
  { value: "cpu", label: "CPU" },
  { value: "cloud", label: "Cloud" },
];

const colorOptions = [
  { value: "#3B82F6", label: "Blue" },
  { value: "#10B981", label: "Green" },
  { value: "#8B5CF6", label: "Purple" },
  { value: "#F59E0B", label: "Yellow" },
  { value: "#EF4444", label: "Red" },
  { value: "#06B6D4", label: "Cyan" },
  { value: "#84CC16", label: "Lime" },
  { value: "#DC2626", label: "Red Dark" },
  { value: "#7C3AED", label: "Violet" },
  { value: "#059669", label: "Emerald" },
  { value: "#EA580C", label: "Orange" },
  { value: "#BE185D", label: "Pink" },
];

export function CategoryDialog({
  category,
  isOpen,
  onClose,
  onSave,
  mode,
}: CategoryDialogProps) {
  const [formData, setFormData] = React.useState<CategoryFormData>({
    name: "",
    description: "",
    color: "#3B82F6",
    icon: "code",
    isActive: true,
  });

  const [errors, setErrors] = React.useState<
    Partial<Record<keyof CategoryFormData, string>>
  >({});

  React.useEffect(() => {
    if (category && mode === "edit") {
      setFormData({
        name: category.name,
        description: category.description,
        color: category.color,
        icon: category.icon,
        isActive: category.isActive,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        color: "#3B82F6",
        icon: "code",
        isActive: true,
      });
    }
    setErrors({});
  }, [category, mode, isOpen]);

  const handleInputChange = (
    field: keyof CategoryFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CategoryFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.color) {
      newErrors.color = "Color is required";
    }

    if (!formData.icon) {
      newErrors.icon = "Icon is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>
            {mode === "add" ? "Add New Category" : "Edit Category"}
          </SheetTitle>
          <SheetDescription>
            {mode === "add"
              ? "Create a new category for organizing courses"
              : "Update the category information"}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter category name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter category description"
              rows={3}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Icon and Color Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon *</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => handleInputChange("icon", value)}
              >
                <SelectTrigger className={errors.icon ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4">{icon.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.icon && (
                <p className="text-sm text-red-500">{errors.icon}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color *</Label>
              <Select
                value={formData.color}
                onValueChange={(value) => handleInputChange("color", value)}
              >
                <SelectTrigger className={errors.color ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.value }}
                        />
                        <span>{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.color && (
                <p className="text-sm text-red-500">{errors.color}</p>
              )}
            </div>
          </div>

          {/* Active Status */}
          <div className="space-y-2">
            <Label htmlFor="isActive">Status</Label>
            <Select
              value={formData.isActive ? "active" : "inactive"}
              onValueChange={(value) =>
                handleInputChange("isActive", value === "active")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="p-3 border rounded-lg bg-gray-50">
              <Badge
                style={{ backgroundColor: formData.color, color: "white" }}
                className="mb-2"
              >
                {formData.name || "Category Name"}
              </Badge>
              <p className="text-sm text-gray-600">
                {formData.description ||
                  "Category description will appear here"}
              </p>
            </div>
          </div>

          <SheetFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "add" ? "Create Category" : "Update Category"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
