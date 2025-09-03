import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import {
  PlayIcon,
  PauseIcon,
  SkipForwardIcon,
  SkipBackIcon,
  Volume2Icon,
  SettingsIcon,
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  content?: string;
  videoUrl?: string;
}

interface LessonDialogProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (lessonId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  courseTitle: string;
}

export function LessonDialog({
  lesson,
  isOpen,
  onClose,
  onComplete,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  courseTitle,
}: LessonDialogProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [showSettings, setShowSettings] = React.useState(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);

  // Mock video duration - in real app this would come from the video element
  React.useEffect(() => {
    if (lesson) {
      // Parse duration like "15 min" to seconds
      const minutes = parseInt(lesson.duration.split(" ")[0]);
      setDuration(minutes * 60);
      setCurrentTime(0);
    }
  }, [lesson]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In real app, this would control the video element
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    // In real app, this would seek the video element
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    // In real app, this would change the video volume
  };

  const handleComplete = () => {
    if (lesson) {
      onComplete(lesson.id);
      onClose();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    onNext();
  };

  const handlePrevious = () => {
    onPrevious();
  };

  if (!lesson) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="!w-[98vw] !max-w-none overflow-y-auto"
      >
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <div>
                <SheetTitle className="text-lg font-semibold">
                  {lesson.title}
                </SheetTitle>
                <p className="text-sm text-muted-foreground">{courseTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                {lesson.duration}
              </Badge>
              {lesson.completed && (
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <CheckCircleIcon className="h-3 w-3" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Video Player Section */}
          <div className="relative bg-black rounded-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              {/* Mock video player - in real app this would be a video element */}
              <div className="text-center text-white">
                <div className="mb-4">
                  <PlayIcon className="h-16 w-16 mx-auto text-white/50" />
                </div>
                <p className="text-lg font-medium">Video Player</p>
                <p className="text-sm text-white/70">
                  {lesson.videoUrl || "Video content would be displayed here"}
                </p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="space-y-3">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                        (currentTime / duration) * 100
                      }%, rgba(255,255,255,0.2) ${
                        (currentTime / duration) * 100
                      }%, rgba(255,255,255,0.2) 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-white">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePrevious}
                      disabled={!hasPrevious}
                      className="h-8 w-8 p-0 text-white hover:bg-white/20"
                    >
                      <SkipBackIcon className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePlayPause}
                      className="h-10 w-10 p-0 text-white hover:bg-white/20"
                    >
                      {isPlaying ? (
                        <PauseIcon className="h-5 w-5" />
                      ) : (
                        <PlayIcon className="h-5 w-5" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNext}
                      disabled={!hasNext}
                      className="h-8 w-8 p-0 text-white hover:bg-white/20"
                    >
                      <SkipForwardIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Volume2Icon className="h-4 w-4 text-white" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettings(!showSettings)}
                      className="h-8 w-8 p-0 text-white hover:bg-white/20"
                    >
                      <SettingsIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-3">Playback Settings</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Playback Speed</label>
                  <div className="flex gap-2 mt-1">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <Button
                        key={speed}
                        variant={
                          playbackSpeed === speed ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setPlaybackSpeed(speed)}
                        className="h-8 px-3"
                      >
                        {speed}x
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lesson Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lesson Content</h3>

            {lesson.content ? (
              <div className="prose prose-sm max-w-none">
                <p>{lesson.content}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Lesson Overview</h4>
                  <p className="text-sm text-muted-foreground">
                    This lesson covers the fundamental concepts and practical
                    applications. Follow along with the video and complete the
                    exercises to reinforce your learning.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {lesson.duration}
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Type</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Video Lesson
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={!hasPrevious}
                className="flex items-center gap-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Previous Lesson
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {!lesson.completed && (
                <Button
                  onClick={handleComplete}
                  className="flex items-center gap-2"
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  Mark as Complete
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={!hasNext}
                className="flex items-center gap-2"
              >
                Next Lesson
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
