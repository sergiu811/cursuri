import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("login", "routes/login.tsx"),
  route("courses", "routes/courses.tsx"),
  route("course/:courseId", "routes/course-detail.tsx"),
  route("library", "routes/library.tsx"),
  route("admin", "routes/admin.tsx"),
] satisfies RouteConfig;
