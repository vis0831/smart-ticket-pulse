import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, UserRole } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0],
      email,
      role,
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    // Mock signup - in real app, this would call an API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
