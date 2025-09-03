import { AppSidebar } from "~/components/app-sidebar";
import { ChartAreaInteractive } from "~/components/chart-area-interactive";
import { DataTable } from "~/components/data-table";
import { SectionCards } from "~/components/section-cards";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { CourseCard } from "~/components/course-card";
import { Button } from "~/components/ui/button";
import { BookOpenIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";
import { ProtectedRoute } from "~/components/protected-route";

import data from "../dashboard/data.json";
import coursesData from "../dashboard/courses.json";

export default function Page() {
  const recentCourses = coursesData.purchasedCourses.slice(0, 3);

  const handleContinueCourse = (courseId: string) => {
    // TODO: Implement course continuation logic
    console.log("Continue course:", courseId);
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />

                {/* Recent Courses Section */}
                <div className="px-4 lg:px-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Recent Courses</h2>
                    <Button variant="outline" asChild>
                      <Link to="/courses" className="flex items-center gap-2">
                        View All Courses
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        variant="purchased"
                        onContinue={handleContinueCourse}
                      />
                    ))}
                  </div>
                </div>

                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
