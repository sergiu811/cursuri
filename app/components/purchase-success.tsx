import * as React from "react";
import { CheckCircleIcon, BookOpenIcon, XIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

interface PurchaseSuccessProps {
  courseTitle: string;
  isVisible: boolean;
  onClose: () => void;
  onViewCourse: () => void;
}

export function PurchaseSuccess({
  courseTitle,
  isVisible,
  onClose,
  onViewCourse,
}: PurchaseSuccessProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-background rounded-lg shadow-xl p-6">
        <div className="text-center space-y-4">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Purchase Successful!
            </h3>
            <p className="text-gray-600">
              You've successfully purchased{" "}
              <span className="font-medium text-gray-900">"{courseTitle}"</span>
            </p>
          </div>

          {/* Course Icon */}
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpenIcon className="w-6 h-6 text-blue-600" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Button onClick={onViewCourse} className="w-full">
              <BookOpenIcon className="w-4 h-4 mr-2" />
              Start Learning Now
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link to="/courses">View My Courses</Link>
            </Button>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
