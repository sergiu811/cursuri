import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  XIcon,
  TrashIcon,
  AlertTriangleIcon,
  UsersIcon,
  StarIcon,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  lessons: number;
  rating: number;
  category: string;
  price: number;
  students?: number;
  level?: string;
}

interface DeleteCourseDialogProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (courseId: string) => void;
}

export function DeleteCourseDialog({
  course,
  isOpen,
  onClose,
  onDelete,
}: DeleteCourseDialogProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!course) return;

    setIsDeleting(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onDelete(course.id);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!course) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold text-red-600">
              Delete Course
            </SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Warning Message */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangleIcon className="h-5 w-5" />
              <span className="font-medium">Warning</span>
            </div>
            <p className="text-sm text-red-700 mt-2">
              This action cannot be undone. Deleting this course will remove it
              permanently and all associated data will be lost.
            </p>
          </div>

          {/* Course Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-16 w-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    by {course.instructor}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="h-3 w-3" />
                      <span>{course.students || 0} students</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="outline">{course.category}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Lessons:</span>
                  <span>{course.lessons}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">${course.price}</span>
                </div>
                {course.level && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Level:</span>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Impact Summary */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-2">Impact Summary</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Course will be permanently removed</li>
              <li>• {course.students || 0} students will lose access</li>
              <li>• All course content will be deleted</li>
              <li>• Progress data will be lost</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <TrashIcon className="h-4 w-4" />
                  Delete Course
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
