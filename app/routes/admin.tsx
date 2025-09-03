import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  PencilIcon,
  Trash2Icon,
  EyeIcon,
  UsersIcon,
  StarIcon,
  ClockIcon,
  BookOpenIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { AddCourseDialog } from "~/components/add-course-dialog";
import { EditCourseDialog } from "~/components/edit-course-dialog";
import { DeleteCourseDialog } from "~/components/delete-course-dialog";
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
  progress?: number;
  lastAccessed?: string;
  originalPrice?: number;
  discount?: number;
  students?: number;
  level?: string;
  description?: string;
}

interface CoursePurchaseStats {
  courseId: string;
  title: string;
  instructor: string;
  students: number;
  revenue: number;
  rating: number;
}

interface AdminStats {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  mostPurchasedCourses: CoursePurchaseStats[];
}

export default function AdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [stats, setStats] = useState<AdminStats>({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    averageRating: 0,
    mostPurchasedCourses: [],
  });

  useEffect(() => {
    // Combine purchased and available courses for admin view
    const allCourses = [
      ...coursesData.purchasedCourses,
      ...coursesData.availableCourses,
    ];
    setCourses(allCourses);
    setFilteredCourses(allCourses);

    // Calculate admin stats
    calculateStats(allCourses);
  }, []);

  useEffect(() => {
    filterAndSortCourses();
  }, [courses, searchTerm, categoryFilter, statusFilter, sortBy]);

  const calculateStats = (courseList: Course[]) => {
    const totalCourses = courseList.length;
    const totalStudents = courseList.reduce(
      (sum, course) => sum + (course.students || 0),
      0
    );
    const totalRevenue = courseList.reduce((sum, course) => {
      const price = course.originalPrice || course.price;
      const students = course.students || 0;
      return sum + price * students;
    }, 0);
    const averageRating =
      courseList.reduce((sum, course) => sum + course.rating, 0) / totalCourses;

    // Calculate most purchased courses (top 5 by student count)
    const mostPurchasedCourses = courseList
      .filter((course) => course.students && course.students > 0)
      .map((course) => ({
        courseId: course.id,
        title: course.title,
        instructor: course.instructor,
        students: course.students || 0,
        revenue:
          (course.originalPrice || course.price) * (course.students || 0),
        rating: course.rating,
      }))
      .sort((a, b) => b.students - a.students)
      .slice(0, 5);

    setStats({
      totalCourses,
      totalStudents,
      totalRevenue,
      averageRating: Math.round(averageRating * 10) / 10,
      mostPurchasedCourses,
    });
  };

  const filterAndSortCourses = () => {
    let filtered = [...courses];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (course) => course.category === categoryFilter
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      if (statusFilter === "published") {
        filtered = filtered.filter((course) => course.students !== undefined);
      } else if (statusFilter === "draft") {
        filtered = filtered.filter((course) => course.students === undefined);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "instructor":
          return a.instructor.localeCompare(b.instructor);
        case "category":
          return a.category.localeCompare(b.category);
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "students":
          return (b.students || 0) - (a.students || 0);
        case "recent":
          return (
            new Date(b.lastAccessed || "1970-01-01").getTime() -
            new Date(a.lastAccessed || "1970-01-01").getTime()
          );
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  };

  const handleAddCourse = (newCourse: Omit<Course, "id">) => {
    const courseWithId = {
      ...newCourse,
      id: Date.now().toString(), // Simple ID generation
    };
    setCourses((prev) => [...prev, courseWithId]);
    setIsAddDialogOpen(false);
  };

  const handleEditCourse = (updatedCourse: Course) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
    setIsEditDialogOpen(false);
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
    setIsDeleteDialogOpen(false);
    setSelectedCourse(null);
  };

  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };

  const getCategoryOptions = () => {
    const categories = Array.from(
      new Set(courses.map((course) => course.category))
    );
    return categories.sort();
  };

  const getStatusBadge = (course: Course) => {
    if (course.students !== undefined) {
      return <Badge className="bg-green-100 text-green-800">Published</Badge>;
    }
    return <Badge variant="secondary">Draft</Badge>;
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Header */}
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Admin Panel
                  </h1>
                  <p className="text-muted-foreground">
                    Manage courses, view analytics, and control your learning
                    platform
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Courses
                      </CardTitle>
                      <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {stats.totalCourses}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Students
                      </CardTitle>
                      <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {stats.totalStudents.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
                      </CardTitle>
                      <span className="text-sm font-medium">$</span>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ${stats.totalRevenue.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Average Rating
                      </CardTitle>
                      <StarIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {stats.averageRating}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Most Purchased Courses */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUpIcon className="h-5 w-5" />
                      Most Purchased Courses
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Top 5 courses by student enrollment
                    </p>
                  </CardHeader>
                  <CardContent>
                    {stats.mostPurchasedCourses.length > 0 ? (
                      <div className="space-y-4">
                        {stats.mostPurchasedCourses.map((course, index) => (
                          <div
                            key={course.courseId}
                            className="flex items-center justify-between p-4 rounded-lg border bg-muted/30"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm">
                                  {course.title}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  by {course.instructor}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                              <div className="text-center">
                                <div className="font-semibold text-primary">
                                  {course.students.toLocaleString()}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Students
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-green-600">
                                  ${course.revenue.toLocaleString()}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Revenue
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-yellow-600">
                                  {course.rating}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Rating
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <BookOpenIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No course purchase data available</p>
                        <p className="text-sm">
                          Courses will appear here once students enroll
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Actions and Filters */}
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add New Course
                  </Button>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search courses..."
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {getCategoryOptions().map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="instructor">Instructor</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="recent">Recently Updated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Courses Table */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      All Courses ({filteredCourses.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Instructor</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCourses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <img
                                  src={course.thumbnail}
                                  alt={course.title}
                                  className="h-12 w-16 object-cover rounded"
                                />
                                <div>
                                  <div className="font-medium">
                                    {course.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <ClockIcon className="h-3 w-3" />
                                    {course.duration}
                                    <BookOpenIcon className="h-3 w-3" />
                                    {course.lessons} lessons
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {course.instructor}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{course.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {course.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${course.originalPrice}
                                  </span>
                                )}
                                <span className="font-medium">
                                  ${course.price}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{course.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {course.students
                                ? course.students.toLocaleString()
                                : "-"}
                            </TableCell>
                            <TableCell>{getStatusBadge(course)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditDialog(course)}
                                  className="h-8 w-8 p-0"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openDeleteDialog(course)}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2Icon className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Add Course Dialog */}
        <AddCourseDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddCourse}
        />

        {/* Edit Course Dialog */}
        <EditCourseDialog
          course={selectedCourse}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onEdit={handleEditCourse}
        />

        {/* Delete Course Dialog */}
        <DeleteCourseDialog
          course={selectedCourse}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={handleDeleteCourse}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
