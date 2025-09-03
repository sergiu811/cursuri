import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { LessonDialog } from "~/components/lesson-dialog";
import {
  PlayIcon,
  ClockIcon,
  BookOpenIcon,
  StarIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  CircleIcon,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import coursesData from "../dashboard/courses.json";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

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
  description?: string;
}

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);

  useEffect(() => {
    if (courseId) {
      const foundCourse = coursesData.purchasedCourses.find(
        (c) => c.id === courseId
      );
      if (foundCourse) {
        setCourse(foundCourse);
        // Generate sample lessons based on course data
        const generatedLessons: Lesson[] = Array.from(
          { length: foundCourse.lessons },
          (_, index) => ({
            id: `${courseId}-${index + 1}`,
            title: `Lesson ${index + 1}: ${getLessonTitle(
              index,
              foundCourse.title
            )}`,
            duration: `${Math.floor(Math.random() * 20) + 10} min`,
            completed:
              index <
              Math.floor(
                ((foundCourse.progress || 0) / 100) * foundCourse.lessons
              ),
          })
        );
        setLessons(generatedLessons);
      } else {
        // If course not found, redirect to courses page
        navigate("/courses");
      }
    }
  }, [courseId, navigate]);

  const getLessonTitle = (index: number, courseTitle: string) => {
    const lessonTitles = {
      "React Fundamentals": [
        "Introduction to React",
        "JSX Basics",
        "Components and Props",
        "State and Lifecycle",
        "Event Handling",
        "Conditional Rendering",
        "Lists and Keys",
        "Forms and Controlled Components",
        "Hooks Introduction",
        "useState Hook",
        "useEffect Hook",
        "Custom Hooks",
        "Context API",
        "Error Boundaries",
        "Performance Optimization",
        "Testing Basics",
        "Deployment",
        "Advanced Patterns",
        "State Management",
        "Routing",
        "API Integration",
        "Authentication",
        "Real-world Project",
        "Final Project",
      ],
      "Advanced TypeScript": [
        "TypeScript Fundamentals Review",
        "Advanced Types",
        "Generics Deep Dive",
        "Utility Types",
        "Decorators",
        "Advanced Interfaces",
        "Type Guards",
        "Discriminated Unions",
        "Conditional Types",
        "Template Literal Types",
        "Mapped Types",
        "Infer Keyword",
        "Advanced Patterns",
        "Performance Optimization",
        "Testing with TypeScript",
        "Build Tools",
        "Module Systems",
        "Declaration Files",
        "Advanced Generics",
        "Type Inference",
        "Branded Types",
        "Exotic Types",
        "Advanced Decorators",
        "Metaprogramming",
        "Compiler API",
        "Performance Tips",
        "Best Practices",
        "Real-world Examples",
        "Advanced Projects",
        "TypeScript with React",
        "TypeScript with Node.js",
        "TypeScript with Angular",
        "TypeScript with Vue",
        "TypeScript with Express",
        "TypeScript with GraphQL",
        "TypeScript with Testing",
        "TypeScript with Build Tools",
      ],
    };

    const titles = lessonTitles[courseTitle as keyof typeof lessonTitles];
    if (titles && titles[index]) {
      return titles[index];
    }
    return `Lesson ${index + 1}`;
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsLessonDialogOpen(true);
  };

  const handleLessonComplete = (lessonId: string) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      )
    );

    // Update course progress
    if (course) {
      const completedLessons = lessons.filter((l) => l.completed).length + 1;
      const newProgress = Math.round((completedLessons / lessons.length) * 100);
      setCourse((prev) => (prev ? { ...prev, progress: newProgress } : null));
    }
  };

  const handleNextLesson = () => {
    if (selectedLesson) {
      const currentIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
      if (currentIndex < lessons.length - 1) {
        const nextLesson = lessons[currentIndex + 1];
        setSelectedLesson(nextLesson);
      }
    }
  };

  const handlePreviousLesson = () => {
    if (selectedLesson) {
      const currentIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
      if (currentIndex > 0) {
        const previousLesson = lessons[currentIndex - 1];
        setSelectedLesson(previousLesson);
      }
    }
  };

  const handleContinueLearning = () => {
    const nextIncompleteLesson = lessons.find((lesson) => !lesson.completed);
    if (nextIncompleteLesson) {
      handleLessonClick(nextIncompleteLesson);
    }
  };

  if (!course) {
    return (
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading course...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  const currentLessonIndex = selectedLesson
    ? lessons.findIndex((l) => l.id === selectedLesson.id)
    : -1;
  const hasNext = currentLessonIndex < lessons.length - 1;
  const hasPrevious = currentLessonIndex > 0;

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
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/courses")}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Courses
                  </Button>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                      {course.title}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-4">
                      by {course.instructor}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpenIcon className="h-4 w-4" />
                        <span>
                          {lessons.filter((l) => l.completed).length} /{" "}
                          {lessons.length} lessons completed
                        </span>
                      </div>
                    </div>
                    {course.description && (
                      <p className="text-muted-foreground leading-relaxed max-w-3xl">
                        {course.description}
                      </p>
                    )}
                  </div>

                  <div className="lg:w-80">
                    <Card>
                      <CardHeader>
                        <h3 className="font-semibold">Course Progress</h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress || 0}%</span>
                          </div>
                          <Progress
                            value={course.progress || 0}
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Lessons Completed</span>
                            <span>
                              {lessons.filter((l) => l.completed).length} /{" "}
                              {lessons.length}
                            </span>
                          </div>
                        </div>

                        <Button
                          onClick={handleContinueLearning}
                          className="w-full flex items-center gap-2"
                          disabled={course.progress === 100}
                        >
                          <PlayIcon className="h-4 w-4" />
                          {course.progress === 100
                            ? "Course Completed!"
                            : "Continue Learning"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="px-4 lg:px-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Course Content</h2>

                  <div className="grid gap-3">
                    {lessons.map((lesson, index) => (
                      <Card
                        key={lesson.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          lesson.completed ? "bg-green-50 border-green-200" : ""
                        }`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                {lesson.completed ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                ) : (
                                  <CircleIcon className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <h3
                                  className={`font-medium ${
                                    lesson.completed
                                      ? "text-green-800"
                                      : "text-foreground"
                                  }`}
                                >
                                  {lesson.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {lesson.completed && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-800"
                                >
                                  Completed
                                </Badge>
                              )}
                              <PlayIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Dialog */}
        <LessonDialog
          lesson={selectedLesson}
          isOpen={isLessonDialogOpen}
          onClose={() => setIsLessonDialogOpen(false)}
          onComplete={handleLessonComplete}
          onNext={handleNextLesson}
          onPrevious={handlePreviousLesson}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          courseTitle={course.title}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
