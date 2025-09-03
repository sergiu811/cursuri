import { LoginForm } from "~/components/login-form";
import { ProtectedRoute } from "~/components/protected-route";

export default function Page() {
  return (
    <ProtectedRoute requireAuth={false}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
