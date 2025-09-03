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
import {
  SearchIcon,
  FilterIcon,
  SortAscIcon,
  BookOpenIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

import coursesData from "../dashboard/courses.json";

export default function CoursesPage() {
  const purchasedCourses = coursesData.purchasedCourses;
  const navigate = useNavigate();

  const handleContinueCourse = (courseId: string) => {
    // Navigate to the course detail page
    navigate(`/course/${courseId}`);
  };

  const handleSearch = (searchTerm: string) => {
    // TODO: Implement search functionality
    console.log("Search:", searchTerm);
  };

  const handleCategoryFilter = (category: string) => {
    // TODO: Implement category filtering
    console.log("Filter by category:", category);
  };

  const handleSort = (sortBy: string) => {
    // TODO: Implement sorting
    console.log("Sort by:", sortBy);
  };

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
                    My Courses
                  </h1>
                  <p className="text-muted-foreground">
                    Continue learning from where you left off
                  </p>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search your courses..."
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
                        <SelectItem value="frontend">
                          Frontend Development
                        </SelectItem>
                        <SelectItem value="backend">
                          Backend Development
                        </SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="programming">
                          Programming Languages
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Select onValueChange={handleSort}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">
                          Recently Accessed
                        </SelectItem>
                        <SelectItem value="progress">Progress</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="px-4 lg:px-6">
                {purchasedCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto h-24 w-24 text-muted-foreground mb-4">
                      <BookOpenIcon className="h-full w-full" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      No courses yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start your learning journey by purchasing your first
                      course
                    </p>
                    <Button asChild>
                      <Link to="/library">Browse Course Library</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        variant="purchased"
                        onContinue={handleContinueCourse}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
