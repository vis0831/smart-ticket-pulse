import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Database, Users, Mail, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="integrations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="sla">SLA Rules</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Integrations</CardTitle>
                <CardDescription>Configure email, SMS, and Slack notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Mail className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Email (SMTP)</p>
                      <p className="text-sm text-muted-foreground">Send notifications via email</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Zap className="h-8 w-8 text-accent" />
                    <div>
                      <p className="font-medium">Slack</p>
                      <p className="text-sm text-muted-foreground">Send notifications to Slack channels</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ingestion Connectors</CardTitle>
                <CardDescription>Configure ticket sources and imports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Database className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Email Ingestion</p>
                      <p className="text-sm text-muted-foreground">Create tickets from emails</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Zap className="h-8 w-8 text-accent" />
                    <div>
                      <p className="font-medium">Webhook</p>
                      <p className="text-sm text-muted-foreground">Receive tickets via webhook</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users and role assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">User management interface coming soon</p>
                    <Button>Add User</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sla">
            <Card>
              <CardHeader>
                <CardTitle>SLA Rules</CardTitle>
                <CardDescription>Configure service level agreement rules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <Database className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">SLA rules configuration coming soon</p>
                    <Button>Create SLA Rule</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>View system activity and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <Database className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Audit logs viewer coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
