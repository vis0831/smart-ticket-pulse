import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Chatbot } from "@/components/Chatbot";
import { LogOut, Ticket, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleCreateTicket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Ticket created successfully!");
    e.currentTarget.reset();
    setCategory("");
    setSubCategory("");
  };

  const handleChatbotCreateTicket = (cat: string, subCat: string) => {
    setCategory(cat);
    setSubCategory(subCat);
    toast.info("Category pre-filled from chatbot suggestion");
  };

  const mockUserTickets = [
    {
      id: "TKT-001",
      subject: "VPN Connection Issue",
      status: "open",
      priority: "high",
      createdAt: "2025-01-15",
    },
    {
      id: "TKT-002",
      subject: "Password Reset Request",
      status: "in-progress",
      priority: "medium",
      createdAt: "2025-01-14",
    },
    {
      id: "TKT-003",
      subject: "Laptop Screen Issue",
      status: "resolved",
      priority: "low",
      createdAt: "2025-01-13",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Ticket className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === "open" ? "destructive" : status === "resolved" ? "default" : "secondary";
  };

  const getStatusClassName = (status: string) => {
    return status === "resolved" ? "bg-success text-success-foreground" : "";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Employee Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Create Ticket Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Ticket</CardTitle>
            <CardDescription>Need help? Submit a ticket and our team will assist you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user?.name} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Authentication">Authentication</SelectItem>
                      <SelectItem value="Network">Network</SelectItem>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subcategory">Sub-category</Label>
                  <Select value={subCategory} onValueChange={setSubCategory} required>
                    <SelectTrigger id="subcategory">
                      <SelectValue placeholder="Select sub-category" />
                    </SelectTrigger>
                    <SelectContent>
                      {category === "Authentication" && (
                        <>
                          <SelectItem value="Password Reset">Password Reset</SelectItem>
                          <SelectItem value="2FA Issue">2FA Issue</SelectItem>
                        </>
                      )}
                      {category === "Network" && (
                        <>
                          <SelectItem value="VPN">VPN</SelectItem>
                          <SelectItem value="WiFi">WiFi</SelectItem>
                        </>
                      )}
                      {category === "Hardware" && (
                        <>
                          <SelectItem value="Laptop">Laptop</SelectItem>
                          <SelectItem value="Monitor">Monitor</SelectItem>
                        </>
                      )}
                      {category === "General" && <SelectItem value="Other">Other</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your issue in detail..."
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>My Tickets</CardTitle>
            <CardDescription>Track the status of your submitted tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUserTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(ticket.status)}
                    <div>
                      <p className="font-medium">{ticket.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {ticket.id} • Created {ticket.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={getStatusColor(ticket.status)} className={getStatusClassName(ticket.status)}>{ticket.status}</Badge>
                    <Badge variant="outline">{ticket.priority}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chatbot */}
      <Chatbot onCreateTicket={handleChatbotCreateTicket} />
    </div>
  );
}
