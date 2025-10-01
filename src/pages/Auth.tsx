import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";
import { toast } from "sonner";
import { Headset } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();
  const [role, setRole] = useState<UserRole>("employee");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate(user.role === "admin" ? "/admin" : "/dashboard", { replace: true });
    return null;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password, role);
      toast.success("Login successful!");
      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signup(name, email, password, role);
      toast.success("Account created successfully!");
      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <Headset className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Smart Helpdesk</CardTitle>
          <CardDescription>Login or create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-role">I am a</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="employee" id="employee-login" />
                      <Label htmlFor="employee-login" className="font-normal cursor-pointer">
                        Employee
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="admin-login" />
                      <Label htmlFor="admin-login" className="font-normal cursor-pointer">
                        Administrator
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" name="email" type="email" placeholder="name@company.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" name="password" type="password" required />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-role">I am a</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="employee" id="employee-signup" />
                      <Label htmlFor="employee-signup" className="font-normal cursor-pointer">
                        Employee
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="admin-signup" />
                      <Label htmlFor="admin-signup" className="font-normal cursor-pointer">
                        Administrator
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input id="signup-name" name="name" placeholder="John Doe" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="email" type="email" placeholder="name@company.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" name="password" type="password" required />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
