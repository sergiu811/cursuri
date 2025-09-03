import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { CourseCard } from "~/components/course-card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { PurchaseDialog } from "~/components/purchase-dialog";
import { PurchaseSuccess } from "~/components/purchase-success";
import { SearchIcon, FilterIcon, BookOpenIcon, StarIcon } from "lucide-react";
import { useState } from "react";

import coursesData from "../dashboard/courses.json";

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
  originalPrice?: number;
  discount?: number;
  students?: number;
  level?: string;
}

export default function LibraryPage() {
  const availableCourses = coursesData.availableCourses;
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [purchasedCourseTitle, setPurchasedCourseTitle] = useState("");

  // Debug logging
  console.log("LibraryPage render state:", {
    selectedCourse: selectedCourse?.title,
    isPurchaseDialogOpen,
    isSuccessVisible,
    availableCoursesCount: availableCourses.length,
  });

  const handlePurchaseCourse = (courseId: string) => {
    console.log("Purchase button clicked for course:", courseId);
    const course = availableCourses.find((c) => c.id === courseId);
    console.log("Found course:", course);
    if (course) {
      setSelectedCourse(course);
      setIsPurchaseDialogOpen(true);
      console.log("Opening purchase dialog for:", course.title);
    }
  };

  const handlePurchaseComplete = (courseId: string, paymentMethod: string) => {
    // TODO: Implement actual purchase logic
    console.log(`Course ${courseId} purchased using ${paymentMethod}`);

    // Here you would typically:
    // 1. Send purchase data to backend
    // 2. Update user's course list
    // 3. Send confirmation email
    // 4. Redirect to course or show success message

    const course = availableCourses.find((c) => c.id === courseId);
    if (course) {
      setPurchasedCourseTitle(course.title);
      setIsSuccessVisible(true);
    }
  };

  const handleViewCourse = () => {
    setIsSuccessVisible(false);
    // TODO: Navigate to the purchased course
    console.log("Navigate to purchased course");
  };

  const handleSearch = (searchTerm: string) => {
    // TODO: Implement search functionality
    console.log("Search:", searchTerm);
  };

  const handleCategoryFilter = (category: string) => {
    // TODO: Implement category filtering
    console.log("Filter by category:", category);
  };

  const handleLevelFilter = (level: string) => {
    // TODO: Implement level filtering
    console.log("Filter by level:", level);
  };

  const handleSort = (sortBy: string) => {
    // TODO: Implement sorting
    console.log("Sort by:", sortBy);
  };

  // Get unique categories and levels for filters
  const categories = [
    ...new Set(availableCourses.map((course) => course.category)),
  ];
  const levels = [...new Set(availableCourses.map((course) => course.level))];

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Header */}
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Course Library
                  </h1>
                  <p className="text-muted-foreground">
                    Discover and purchase new courses to expand your skills
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <BookOpenIcon className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Total Courses
                      </span>
                    </div>
                    <p className="text-2xl font-bold">
                      {availableCourses.length}
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Avg Rating
                      </span>
                    </div>
                    <p className="text-2xl font-bold">
                      {(
                        availableCourses.reduce(
                          (acc, course) => acc + course.rating,
                          0
                        ) / availableCourses.length
                      ).toFixed(1)}
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <BookOpenIcon className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Categories
                      </span>
                    </div>
                    <p className="text-2xl font-bold">{categories.length}</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <BookOpenIcon className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Total Students
                      </span>
                    </div>
                    <p className="text-2xl font-bold">
                      {availableCourses
                        .reduce(
                          (acc, course) => acc + (course.students || 0),
                          0
                        )
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search courses..."
                      className="pl-10"
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select onValueChange={handleCategoryFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={handleLevelFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level.toLowerCase()}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={handleSort}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="px-4 lg:px-6">
                {availableCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto h-24 w-24 text-muted-foreground mb-4">
                      <BookOpenIcon className="h-full w-full" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      No courses available
                    </h3>
                    <p className="text-muted-foreground">
                      Check back later for new courses
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        variant="available"
                        onPurchase={handlePurchaseCourse}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Purchase Dialog */}
      <PurchaseDialog
        course={selectedCourse}
        isOpen={isPurchaseDialogOpen}
        onClose={() => {
          setIsPurchaseDialogOpen(false);
          setSelectedCourse(null);
        }}
        onPurchase={handlePurchaseComplete}
      />

      {/* Purchase Success Dialog */}
      <PurchaseSuccess
        courseTitle={purchasedCourseTitle}
        isVisible={isSuccessVisible}
        onClose={() => setIsSuccessVisible(false)}
        onViewCourse={handleViewCourse}
      />
    </SidebarProvider>
  );
}
