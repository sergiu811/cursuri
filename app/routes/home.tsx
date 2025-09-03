import type { Route } from "./+types/home";
import { LandingPage } from "../components/landing-page";
import { ProtectedRoute } from "../components/protected-route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LearnHub - Master New Skills with Expert-Led Courses" },
    {
      name: "description",
      content:
        "Join thousands of learners worldwide and transform your career with our comprehensive online learning platform. From programming to design, we've got you covered.",
    },
  ];
}

export default function Home() {
  return (
    <ProtectedRoute requireAuth={false}>
      <LandingPage />
    </ProtectedRoute>
  );
}
