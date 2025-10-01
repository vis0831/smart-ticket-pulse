import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  LogOut,
  Ticket,
  TrendingUp,
  AlertTriangle,
  Clock,
  Users,
  BookOpen,
  Bell,
  Settings,
  BarChart3,
} from "lucide-react";
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COLORS = ["hsl(217, 91%, 60%)", "hsl(173, 80%, 40%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)"];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  // Mock data for charts
  const ticketsPerDay = [
    { day: "Mon", tickets: 12 },
    { day: "Tue", tickets: 19 },
    { day: "Wed", tickets: 15 },
    { day: "Thu", tickets: 22 },
    { day: "Fri", tickets: 18 },
    { day: "Sat", tickets: 8 },
    { day: "Sun", tickets: 5 },
  ];

  const ticketsByCategory = [
    { name: "Authentication", value: 35 },
    { name: "Network", value: 28 },
    { name: "Hardware", value: 22 },
    { name: "General", value: 15 },
  ];

  const ticketsByTeam = [
    { team: "Security", tickets: 35 },
    { team: "Network", tickets: 28 },
    { team: "Hardware", tickets: 22 },
    { team: "General", tickets: 15 },
  ];

  const recentActivity = [
    { id: 1, action: "Ticket TKT-045 assigned to Network Team", time: "2 min ago" },
    { id: 2, action: "Ticket TKT-044 resolved", time: "15 min ago" },
    { id: 3, action: "SLA breach warning for TKT-038", time: "1 hour ago" },
    { id: 4, action: "New KB article published", time: "2 hours ago" },
    { id: 5, action: "Notification rule activated", time: "3 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/admin/kb")}>
              <BookOpen className="h-4 w-4 mr-2" />
              Knowledge Base
            </Button>
            <Button variant="outline" onClick={() => navigate("/admin/rules")}>
              <Bell className="h-4 w-4 mr-2" />
              Rules
            </Button>
            <Button variant="outline" onClick={() => navigate("/admin/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <div className="text-right">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">↑ 12%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Auto-Resolved</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32%</div>
              <p className="text-xs text-muted-foreground">Chatbot resolution rate</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SLA Breaches</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">8</div>
              <p className="text-xs text-muted-foreground">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2h</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">↓ 0.5h</span> improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tickets Per Day</CardTitle>
              <CardDescription>Last 7 days ticket volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ticketsPerDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="tickets" stroke="hsl(217, 91%, 60%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tickets by Category</CardTitle>
              <CardDescription>Distribution across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ticketsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name}: ${((entry.percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ticketsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tickets by Team</CardTitle>
              <CardDescription>Team workload distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ticketsByTeam}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="team" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tickets" fill="hsl(173, 80%, 40%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Last 10 system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between pb-4 border-b last:border-0">
                    <p className="text-sm">{activity.action}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate("/admin/kb/new")}>
                <BookOpen className="h-4 w-4 mr-2" />
                Create KB Article
              </Button>
              <Button variant="outline" onClick={() => navigate("/admin/rules/new")}>
                <Bell className="h-4 w-4 mr-2" />
                Add Notification Rule
              </Button>
              <Button variant="outline" onClick={() => navigate("/admin/classifier")}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Run Classifier Test
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Teams
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
