import * as React from "react";
import {
  XIcon,
  CheckIcon,
  CreditCardIcon,
  LockIcon,
  StarIcon,
  ClockIcon,
  BookOpenIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";

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

interface PurchaseDialogProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (courseId: string, paymentMethod: string) => void;
}

export function PurchaseDialog({
  course,
  isOpen,
  onClose,
  onPurchase,
}: PurchaseDialogProps) {
  const [paymentMethod, setPaymentMethod] = React.useState("credit-card");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [cardholderName, setCardholderName] = React.useState("");
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Debug logging
  console.log("PurchaseDialog render:", {
    course,
    isOpen,
    onClose,
    onPurchase,
  });

  if (!isOpen || !course) {
    console.log("PurchaseDialog not showing:", { isOpen, hasCourse: !!course });
    return null;
  }

  console.log("PurchaseDialog is showing for course:", course.title);

  const hasDiscount = course.originalPrice && course.discount;
  const finalPrice = hasDiscount ? course.price : course.price;

  const handlePurchase = async () => {
    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    if (
      paymentMethod === "credit-card" &&
      (!cardNumber || !expiryDate || !cvv || !cardholderName)
    ) {
      alert("Please fill in all credit card details");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onPurchase(course.id, paymentMethod);
    onClose();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
            <p className="text-muted-foreground">
              Get instant access to your course
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XIcon className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Course Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>by {course.instructor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpenIcon className="h-4 w-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  {hasDiscount ? (
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-green-600">
                        ${course.price}
                      </div>
                      <div className="text-sm text-muted-foreground line-through">
                        ${course.originalPrice}
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Save ${course.originalPrice! - course.price}
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">${course.price}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant={
                  paymentMethod === "credit-card" ? "default" : "outline"
                }
                className="h-auto p-4 justify-start"
                onClick={() => setPaymentMethod("credit-card")}
              >
                <CreditCardIcon className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Credit Card</div>
                  <div className="text-sm text-muted-foreground">
                    Pay with Visa, Mastercard, or Amex
                  </div>
                </div>
              </Button>
              <Button
                variant={paymentMethod === "paypal" ? "default" : "outline"}
                className="h-auto p-4 justify-start"
                onClick={() => setPaymentMethod("paypal")}
              >
                <LockIcon className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">PayPal</div>
                  <div className="text-sm text-muted-foreground">
                    Pay with your PayPal account
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Credit Card Form */}
          {paymentMethod === "credit-card" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Credit Card Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="cardholder">Cardholder Name</Label>
                  <Input
                    id="cardholder"
                    placeholder="John Doe"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="cardnumber">Card Number</Label>
                  <Input
                    id="cardnumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength={19}
                  />
                </div>
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) =>
                      setExpiryDate(formatExpiryDate(e.target.value))
                    }
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>

          {/* Purchase Button */}
          <Button
            onClick={handlePurchase}
            disabled={!acceptTerms || isProcessing}
            className="w-full h-12 text-lg"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <LockIcon className="h-5 w-5" />
                <span>Complete Purchase - ${finalPrice}</span>
              </div>
            )}
          </Button>

          {/* Security Notice */}
          <div className="text-center text-sm text-muted-foreground">
            <LockIcon className="h-4 w-4 inline mr-1" />
            Your payment information is encrypted and secure
          </div>
        </div>
      </div>
    </div>
  );
}
