import * as React from "react";
import {
  StarIcon,
  PlayIcon,
  ClockIcon,
  BookOpenIcon,
  UsersIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    thumbnail: string;
    duration: string;
    lessons: number;
    rating: number;
    category: string;
    price: number;
    progress?: number;
    lastAccessed?: string;
    originalPrice?: number;
    discount?: number;
    students?: number;
    level?: string;
    description?: string;
  };
  variant: "purchased" | "available";
  onContinue?: (courseId: string) => void;
  onPurchase?: (courseId: string) => void;
}

export function CourseCard({
  course,
  variant,
  onContinue,
  onPurchase,
}: CourseCardProps) {
  const isPurchased = variant === "purchased";
  const hasDiscount = course.originalPrice && course.discount;
  const [showDescription, setShowDescription] = React.useState(false);

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-48 w-full object-cover"
        />
        {hasDiscount && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            -{course.discount}%
          </Badge>
        )}
        {isPurchased && course.progress && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
            <Progress value={course.progress} className="h-2" />
            <p className="text-xs text-white mt-1">
              {course.progress}% Complete
            </p>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-tight">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              by {course.instructor}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>
        <Badge variant="secondary" className="w-fit">
          {course.category}
        </Badge>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpenIcon className="h-4 w-4" />
              <span>{course.lessons} lessons</span>
            </div>
          </div>
          {!isPurchased && course.students && (
            <div className="flex items-center space-x-1">
              <UsersIcon className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          )}
        </div>
        {!isPurchased && course.level && (
          <Badge variant="outline" className="mt-2">
            {course.level}
          </Badge>
        )}

        {/* Description Section */}
        {course.description && (
          <div className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDescription(!showDescription)}
              className="w-full justify-between p-2 h-auto"
            >
              <span className="text-sm font-medium">View Description</span>
              {showDescription ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </Button>

            {showDescription && (
              <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold">${course.price}</span>
                <span className="text-sm text-muted-foreground line-through">
                  ${course.originalPrice}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">${course.price}</span>
            )}
          </div>

          {isPurchased ? (
            <Button
              onClick={() => onContinue?.(course.id)}
              className="flex items-center space-x-2"
            >
              <PlayIcon className="h-4 w-4" />
              <span>Continue</span>
            </Button>
          ) : (
            <Button
              onClick={() => onPurchase?.(course.id)}
              className="flex items-center space-x-2"
            >
              <span>Purchase</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
