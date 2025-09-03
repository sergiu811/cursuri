import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";
import { XIcon, PlusIcon, ImageIcon } from "lucide-react";

interface CourseFormData {
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  lessons: number;
  rating: number;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  students?: number;
  level: string;
  description: string;
}

interface AddCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (course: Omit<CourseFormData, "id">) => void;
}

export function AddCourseDialog({
  isOpen,
  onClose,
  onAdd,
}: AddCourseDialogProps) {
  const [formData, setFormData] = React.useState<CourseFormData>({
    title: "",
    instructor: "",
    thumbnail: "",
    duration: "",
    lessons: 0,
    rating: 0,
    category: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    students: 0,
    level: "Beginner",
    description: "",
  });

  const [hasDiscount, setHasDiscount] = React.useState(false);
  const [isPublished, setIsPublished] = React.useState(false);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof CourseFormData, string>>
  >({});

  const categories = [
    "Frontend Development",
    "Backend Development",
    "Mobile Development",
    "Data Science",
    "Design",
    "Programming Languages",
    "DevOps",
    "Cybersecurity",
    "Database",
    "Development Tools",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const handleInputChange = (
    field: keyof CourseFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CourseFormData, string>> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.instructor.trim())
      newErrors.instructor = "Instructor is required";
    if (!formData.thumbnail.trim())
      newErrors.thumbnail = "Thumbnail URL is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (formData.lessons <= 0)
      newErrors.lessons = "Number of lessons must be greater than 0";
    if (formData.rating < 0 || formData.rating > 5)
      newErrors.rating = "Rating must be between 0 and 5";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (
      hasDiscount &&
      formData.originalPrice &&
      formData.originalPrice <= formData.price
    ) {
      newErrors.originalPrice =
        "Original price must be greater than sale price";
    }
    if (hasDiscount && formData.discount && formData.discount <= 0) {
      newErrors.discount = "Discount must be greater than 0";
    }
    if (
      isPublished &&
      formData.students !== undefined &&
      formData.students < 0
    ) {
      newErrors.students = "Students count cannot be negative";
    }
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const courseData = {
      ...formData,
      rating: Number(formData.rating),
      lessons: Number(formData.lessons),
      price: Number(formData.price),
      originalPrice: hasDiscount ? Number(formData.originalPrice) : undefined,
      discount: hasDiscount ? Number(formData.discount) : undefined,
      students: isPublished ? Number(formData.students) : undefined,
    };

    onAdd(courseData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      instructor: "",
      thumbnail: "",
      duration: "",
      lessons: 0,
      rating: 0,
      category: "",
      price: 0,
      originalPrice: 0,
      discount: 0,
      students: 0,
      level: "Beginner",
      description: "",
    });
    setHasDiscount(false);
    setIsPublished(false);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="!w-[98vw] !max-w-none overflow-y-auto"
      >
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-2xl font-bold">
                Add New Course
              </SheetTitle>
              <p className="text-muted-foreground">
                Create a new course for your learning platform
              </p>
            </div>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter course title"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor *</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) =>
                    handleInputChange("instructor", e.target.value)
                  }
                  placeholder="Enter instructor name"
                  className={errors.instructor ? "border-red-500" : ""}
                />
                {errors.instructor && (
                  <p className="text-sm text-red-500">{errors.instructor}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter course description"
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL *</Label>
              <div className="flex gap-2">
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    handleInputChange("thumbnail", e.target.value)
                  }
                  placeholder="Enter image URL"
                  className={errors.thumbnail ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="px-3"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
              {errors.thumbnail && (
                <p className="text-sm text-red-500">{errors.thumbnail}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Course Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Course Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => handleInputChange("level", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lessons">Number of Lessons *</Label>
                <Input
                  id="lessons"
                  type="number"
                  min="1"
                  value={formData.lessons}
                  onChange={(e) =>
                    handleInputChange("lessons", parseInt(e.target.value) || 0)
                  }
                  className={errors.lessons ? "border-red-500" : ""}
                />
                {errors.lessons && (
                  <p className="text-sm text-red-500">{errors.lessons}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  placeholder="e.g., 8 hours"
                  className={errors.duration ? "border-red-500" : ""}
                />
                {errors.duration && (
                  <p className="text-sm text-red-500">{errors.duration}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) =>
                    handleInputChange("rating", parseFloat(e.target.value) || 0)
                  }
                  className={errors.rating ? "border-red-500" : ""}
                />
                {errors.rating && (
                  <p className="text-sm text-red-500">{errors.rating}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pricing</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    handleInputChange("price", parseFloat(e.target.value) || 0)
                  }
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasDiscount"
                    checked={hasDiscount}
                    onCheckedChange={(checked) =>
                      setHasDiscount(checked as boolean)
                    }
                  />
                  <Label htmlFor="hasDiscount">Enable Discount</Label>
                </div>
              </div>
            </div>

            {hasDiscount && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price ($)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      handleInputChange(
                        "originalPrice",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className={errors.originalPrice ? "border-red-500" : ""}
                  />
                  {errors.originalPrice && (
                    <p className="text-sm text-red-500">
                      {errors.originalPrice}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) =>
                      handleInputChange(
                        "discount",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className={errors.discount ? "border-red-500" : ""}
                  />
                  {errors.discount && (
                    <p className="text-sm text-red-500">{errors.discount}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Publication Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Publication Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPublished"
                  checked={isPublished}
                  onCheckedChange={(checked) =>
                    setIsPublished(checked as boolean)
                  }
                />
                <Label htmlFor="isPublished">Publish Course</Label>
              </div>

              {isPublished && (
                <div className="space-y-2">
                  <Label htmlFor="students">Initial Student Count</Label>
                  <Input
                    id="students"
                    type="number"
                    min="0"
                    value={formData.students}
                    onChange={(e) =>
                      handleInputChange(
                        "students",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className={errors.students ? "border-red-500" : ""}
                  />
                  {errors.students && (
                    <p className="text-sm text-red-500">{errors.students}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Course
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
