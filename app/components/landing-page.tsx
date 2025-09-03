import React from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  BookOpenIcon,
  GraduationCapIcon,
  UsersIcon,
  StarIcon,
  PlayIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldIcon,
  BarChartIcon,
  GlobeIcon,
  ClockIcon,
  AwardIcon,
} from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  const features = [
    {
      icon: BookOpenIcon,
      title: "Comprehensive Course Library",
      description:
        "Access hundreds of courses across programming, design, business, and more.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: GraduationCapIcon,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals and certified experts in their fields.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: UsersIcon,
      title: "Community Learning",
      description:
        "Join a community of learners, share progress, and collaborate on projects.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: StarIcon,
      title: "Certification",
      description:
        "Earn certificates upon completion to showcase your new skills.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: PlayIcon,
      title: "Interactive Content",
      description: "Engage with video lessons, quizzes, and hands-on projects.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: ShieldIcon,
      title: "Secure Platform",
      description:
        "Your data and progress are protected with enterprise-grade security.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Active Students", icon: UsersIcon },
    { number: "500+", label: "Expert Courses", icon: BookOpenIcon },
    { number: "50+", label: "Categories", icon: BarChartIcon },
    { number: "95%", label: "Success Rate", icon: AwardIcon },
  ];

  const popularCategories = [
    "Frontend Development",
    "Backend Development",
    "Data Science",
    "Mobile Development",
    "UI/UX Design",
    "DevOps",
    "Cybersecurity",
    "Machine Learning",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCapIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  LearnHub
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Get Started
              </Button>

              {/* Development Bypass Button */}
              {import.meta.env.DEV && (
                <Button
                  onClick={() => {
                    // Create a demo user and bypass authentication
                    const demoUser = {
                      id: "dev-user",
                      name: "Developer",
                      email: "dev@learnhub.com",
                      avatar:
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                    };

                    // Store in localStorage and redirect
                    localStorage.setItem(
                      "learnhub_user",
                      JSON.stringify(demoUser)
                    );
                    window.location.href = "/dashboard";
                  }}
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-600 hover:bg-orange-600"
                >
                  🚀 Dev
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master New Skills with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Expert-Led Courses
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of learners worldwide and transform your career
              with our comprehensive online learning platform. From programming
              to design, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
              >
                Start Learning Today
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3 border-2"
              >
                <PlayIcon className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>

              {/* Development Bypass Button */}
              {import.meta.env.DEV && (
                <Button
                  onClick={() => {
                    // Create a demo user and bypass authentication
                    const demoUser = {
                      id: "dev-user",
                      name: "Developer",
                      email: "dev@learnhub.com",
                    };

                    // Store in localStorage and redirect
                    localStorage.setItem(
                      "learnhub_user",
                      JSON.stringify(demoUser)
                    );
                    window.location.href = "/dashboard";
                  }}
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  🚀 Dev Bypass
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LearnHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to provide the best learning experience
              with cutting-edge features and proven methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Popular Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover courses in high-demand fields and start building the
              skills that matter most.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularCategories.map((category, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer border-2 hover:border-blue-200"
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpenIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners who have already taken the first step
            towards their goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetStarted}
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Your Journey
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Browse Courses
            </Button>

            {/* Development Bypass Button */}
            {import.meta.env.DEV && (
              <Button
                onClick={() => {
                  // Create a demo user and bypass authentication
                  const demoUser = {
                    id: "dev-user",
                    name: "Developer",
                    email: "dev@learnhub.com",
                    avatar:
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=5&h=150&fit=crop&crop=face",
                  };

                  // Store in localStorage and redirect
                  localStorage.setItem(
                    "learnhub_user",
                    JSON.stringify(demoUser)
                  );
                  window.location.href = "/dashboard";
                }}
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-orange-600"
              >
                🚀 Dev Bypass
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCapIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LearnHub</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with quality education and
                cutting-edge technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/courses" className="hover:text-white">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/library" className="hover:text-white">
                    Library
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
