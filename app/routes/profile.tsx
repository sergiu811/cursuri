import * as React from "react";
import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ShieldIcon,
  BellIcon,
  PaletteIcon,
  GlobeIcon,
  BookOpenIcon,
  TrophyIcon,
  SettingsIcon,
  CameraIcon,
  SaveIcon,
  EditIcon,
  ClockIcon,
  CreditCardIcon,
  PlusIcon,
} from "lucide-react";
import { useSearchParams } from "react-router";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  dateOfBirth?: string;
  timezone: string;
  language: string;
  theme: "light" | "dark" | "system";
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    courseUpdates: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private" | "friends";
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
  preferences: {
    autoPlayVideos: boolean;
    downloadVideos: boolean;
    showSubtitles: boolean;
    playbackSpeed: number;
  };
}

interface LearningStats {
  totalCourses: number;
  completedCourses: number;
  totalLessons: number;
  completedLessons: number;
  totalHours: number;
  certificates: number;
  currentStreak: number;
  longestStreak: number;
}

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  // Add effect to handle URL changes
  React.useEffect(() => {
    const tab = searchParams.get("tab") || "profile";
    setActiveTab(tab);
  }, [searchParams]);

  const [profile, setProfile] = React.useState<UserProfile>({
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Passionate learner and technology enthusiast. Always eager to expand my knowledge and skills.",
    location: "San Francisco, CA",
    dateOfBirth: "1990-05-15",
    timezone: "America/Los_Angeles",
    language: "en",
    theme: "system",
    notifications: {
      email: true,
      push: true,
      sms: false,
      courseUpdates: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      showLocation: true,
    },
    preferences: {
      autoPlayVideos: false,
      downloadVideos: true,
      showSubtitles: true,
      playbackSpeed: 1,
    },
  });

  const [learningStats] = React.useState<LearningStats>({
    totalCourses: 12,
    completedCourses: 8,
    totalLessons: 156,
    completedLessons: 124,
    totalHours: 89,
    certificates: 6,
    currentStreak: 7,
    longestStreak: 23,
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleProfileUpdate = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (
    key: keyof UserProfile["notifications"],
    value: boolean
  ) => {
    setProfile((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));
  };

  const handlePrivacyChange = (
    key: keyof UserProfile["privacy"],
    value: any
  ) => {
    setProfile((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value },
    }));
  };

  const handlePreferenceChange = (
    key: keyof UserProfile["preferences"],
    value: any
  ) => {
    setProfile((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsEditing(false);
    setIsSaving(false);
    // In real app, save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  const getInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;
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
                  <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                  <p className="text-muted-foreground">
                    Manage your account settings and preferences
                  </p>
                </div>
              </div>

              <div className="px-4 lg:px-6">
                <Tabs
                  value={activeTab}
                  key={activeTab}
                  onValueChange={setActiveTab}
                  className="space-y-6"
                >
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="learning">Learning</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Personal Information</CardTitle>
                          {!isEditing ? (
                            <Button
                              onClick={() => setIsEditing(true)}
                              variant="outline"
                              size="sm"
                            >
                              <EditIcon className="h-4 w-4 mr-2" />
                              Edit Profile
                            </Button>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                onClick={handleCancel}
                                variant="outline"
                                size="sm"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                size="sm"
                              >
                                {isSaving ? "Saving..." : "Save Changes"}
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Avatar Section */}
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={profile.avatar} alt="Profile" />
                              <AvatarFallback className="text-2xl">
                                {getInitials()}
                              </AvatarFallback>
                            </Avatar>
                            {isEditing && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute -bottom-2 -right-2 h-8 w-8 p-0"
                              >
                                <CameraIcon className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">
                              {profile.firstName} {profile.lastName}
                            </h3>
                            <p className="text-muted-foreground">
                              {profile.email}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">
                                {profile.privacy.profileVisibility}
                              </Badge>
                              <Badge variant="secondary">
                                {profile.timezone}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={profile.firstName}
                              onChange={(e) =>
                                handleProfileUpdate("firstName", e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={profile.lastName}
                              onChange={(e) =>
                                handleProfileUpdate("lastName", e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profile.email}
                              onChange={(e) =>
                                handleProfileUpdate("email", e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={profile.phone || ""}
                              onChange={(e) =>
                                handleProfileUpdate("phone", e.target.value)
                              }
                              disabled={!isEditing}
                              placeholder="Enter phone number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={profile.location || ""}
                              onChange={(e) =>
                                handleProfileUpdate("location", e.target.value)
                              }
                              disabled={!isEditing}
                              placeholder="Enter location"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                              id="dateOfBirth"
                              type="date"
                              value={profile.dateOfBirth || ""}
                              onChange={(e) =>
                                handleProfileUpdate(
                                  "dateOfBirth",
                                  e.target.value
                                )
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select
                              value={profile.timezone}
                              onValueChange={(value) =>
                                handleProfileUpdate("timezone", value)
                              }
                              disabled={!isEditing}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="America/Los_Angeles">
                                  Pacific Time
                                </SelectItem>
                                <SelectItem value="America/New_York">
                                  Eastern Time
                                </SelectItem>
                                <SelectItem value="Europe/London">
                                  London
                                </SelectItem>
                                <SelectItem value="Asia/Tokyo">
                                  Tokyo
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select
                              value={profile.language}
                              onValueChange={(value) =>
                                handleProfileUpdate("language", value)
                              }
                              disabled={!isEditing}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={profile.bio || ""}
                            onChange={(e) =>
                              handleProfileUpdate("bio", e.target.value)
                            }
                            disabled={!isEditing}
                            placeholder="Tell us about yourself..."
                            rows={4}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Learning Tab */}
                  <TabsContent value="learning" className="space-y-6">
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
                            {learningStats.totalCourses}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {learningStats.completedCourses} completed
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Total Lessons
                          </CardTitle>
                          <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {learningStats.totalLessons}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {learningStats.completedLessons} completed
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Learning Hours
                          </CardTitle>
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {learningStats.totalHours}h
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Total time invested
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Certificates
                          </CardTitle>
                          <TrophyIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {learningStats.certificates}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Achievements earned
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Learning Streak</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">
                              {learningStats.currentStreak}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Current Streak
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                              {learningStats.longestStreak}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Longest Streak
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Billing Tab */}
                  <TabsContent value="billing" className="space-y-6">
                    {/* Current Plan */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCardIcon className="h-5 w-5" />
                          Current Plan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                              <BookOpenIcon className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">
                                Pro Plan
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Unlimited access to all courses and features
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              $19.99
                            </div>
                            <div className="text-sm text-muted-foreground">
                              per month
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Next billing date: January 15, 2025</span>
                          <Button variant="outline" size="sm">
                            Change Plan
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payment Methods */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                              VISA
                            </div>
                            <div>
                              <div className="font-medium">
                                •••• •••• •••• 4242
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Expires 12/26
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Default</Badge>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add Payment Method
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Billing History */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Billing History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                              <div className="font-medium">
                                Pro Plan - Monthly
                              </div>
                              <div className="text-sm text-muted-foreground">
                                December 15, 2024
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">$19.99</div>
                              <Badge variant="secondary">Paid</Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                              <div className="font-medium">
                                Pro Plan - Monthly
                              </div>
                              <div className="text-sm text-muted-foreground">
                                November 15, 2024
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">$19.99</div>
                              <Badge variant="secondary">Paid</Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                              <div className="font-medium">
                                Pro Plan - Monthly
                              </div>
                              <div className="text-sm text-muted-foreground">
                                October 15, 2024
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">$19.99</div>
                              <Badge variant="secondary">Paid</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <Button variant="outline" size="sm">
                            View All Invoices
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Usage & Limits */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Usage & Limits</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 rounded-lg border">
                            <div className="text-2xl font-bold text-primary">
                              ∞
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Courses Access
                            </div>
                          </div>
                          <div className="text-center p-4 rounded-lg border">
                            <div className="text-2xl font-bold text-green-600">
                              ∞
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Video Downloads
                            </div>
                          </div>
                          <div className="text-center p-4 rounded-lg border">
                            <div className="text-2xl font-bold text-blue-600">
                              ∞
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Certificates
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Settings Tab */}
                  <TabsContent value="settings" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BellIcon className="h-5 w-5" />
                          Notification Preferences
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="emailNotif">
                                Email Notifications
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Receive updates via email
                              </p>
                            </div>
                            <Checkbox
                              id="emailNotif"
                              checked={profile.notifications.email}
                              onCheckedChange={(checked) =>
                                handleNotificationChange(
                                  "email",
                                  checked as boolean
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="pushNotif">
                                Push Notifications
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Receive push notifications
                              </p>
                            </div>
                            <Checkbox
                              id="pushNotif"
                              checked={profile.notifications.push}
                              onCheckedChange={(checked) =>
                                handleNotificationChange(
                                  "push",
                                  checked as boolean
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="courseUpdates">
                                Course Updates
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Get notified about course changes
                              </p>
                            </div>
                            <Checkbox
                              id="courseUpdates"
                              checked={profile.notifications.courseUpdates}
                              onCheckedChange={(checked) =>
                                handleNotificationChange(
                                  "courseUpdates",
                                  checked as boolean
                                )
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PaletteIcon className="h-5 w-5" />
                          Appearance & Preferences
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="theme">Theme</Label>
                            <Select
                              value={profile.theme}
                              onValueChange={(
                                value: "light" | "dark" | "system"
                              ) => handleProfileUpdate("theme", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="playbackSpeed">
                              Default Playback Speed
                            </Label>
                            <Select
                              value={profile.preferences.playbackSpeed.toString()}
                              onValueChange={(value) =>
                                handlePreferenceChange(
                                  "playbackSpeed",
                                  parseFloat(value)
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0.5">0.5x</SelectItem>
                                <SelectItem value="0.75">0.75x</SelectItem>
                                <SelectItem value="1">1x (Normal)</SelectItem>
                                <SelectItem value="1.25">1.25x</SelectItem>
                                <SelectItem value="1.5">1.5x</SelectItem>
                                <SelectItem value="2">2x</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="autoPlay">Auto-play Videos</Label>
                              <p className="text-sm text-muted-foreground">
                                Automatically start videos when opening lessons
                              </p>
                            </div>
                            <Checkbox
                              id="autoPlay"
                              checked={profile.preferences.autoPlayVideos}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange(
                                  "autoPlayVideos",
                                  checked as boolean
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="downloadVideos">
                                Download Videos
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Allow video downloads for offline viewing
                              </p>
                            </div>
                            <Checkbox
                              id="downloadVideos"
                              checked={profile.preferences.downloadVideos}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange(
                                  "downloadVideos",
                                  checked as boolean
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="subtitles">Show Subtitles</Label>
                              <p className="text-sm text-muted-foreground">
                                Display subtitles by default
                              </p>
                            </div>
                            <Checkbox
                              id="subtitles"
                              checked={profile.preferences.showSubtitles}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange(
                                  "showSubtitles",
                                  checked as boolean
                                )
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Privacy Tab */}
                  <TabsContent value="privacy" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ShieldIcon className="h-5 w-5" />
                          Privacy Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="profileVisibility">
                              Profile Visibility
                            </Label>
                            <Select
                              value={profile.privacy.profileVisibility}
                              onValueChange={(
                                value: "public" | "private" | "friends"
                              ) =>
                                handlePrivacyChange("profileVisibility", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">
                                  Public - Anyone can see your profile
                                </SelectItem>
                                <SelectItem value="friends">
                                  Friends - Only friends can see your profile
                                </SelectItem>
                                <SelectItem value="private">
                                  Private - Only you can see your profile
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="showEmail">
                                  Show Email Address
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Display your email to other users
                                </p>
                              </div>
                              <Checkbox
                                id="showEmail"
                                checked={profile.privacy.showEmail}
                                onCheckedChange={(checked) =>
                                  handlePrivacyChange(
                                    "showEmail",
                                    checked as boolean
                                  )
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="showPhone">
                                  Show Phone Number
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Display your phone number to other users
                                </p>
                              </div>
                              <Checkbox
                                id="showPhone"
                                checked={profile.privacy.showPhone}
                                onCheckedChange={(checked) =>
                                  handlePrivacyChange(
                                    "showPhone",
                                    checked as boolean
                                  )
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="showLocation">
                                  Show Location
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Display your location to other users
                                </p>
                              </div>
                              <Checkbox
                                id="showLocation"
                                checked={profile.privacy.showLocation}
                                onCheckedChange={(checked) =>
                                  handlePrivacyChange(
                                    "showLocation",
                                    checked as boolean
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Data & Security</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Change Password</Label>
                            <p className="text-sm text-muted-foreground">
                              Update your account password
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Change Password
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Enable 2FA
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Download Data</Label>
                            <p className="text-sm text-muted-foreground">
                              Export your personal data
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
