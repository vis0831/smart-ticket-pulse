import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { mockNotificationRules } from "@/lib/mockData";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";

export default function NotificationRules() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Notification Rules</h1>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <p className="text-sm text-muted-foreground">
              Manage automated notification rules for ticket events
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Rule Name</th>
                    <th className="text-left py-3 px-4">Event</th>
                    <th className="text-left py-3 px-4">Condition</th>
                    <th className="text-left py-3 px-4">Channels</th>
                    <th className="text-left py-3 px-4">Recipients</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockNotificationRules.map((rule) => (
                    <tr key={rule.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{rule.name}</td>
                      <td className="py-3 px-4">{rule.event}</td>
                      <td className="py-3 px-4">
                        <code className="text-xs bg-muted px-2 py-1 rounded">{rule.condition}</code>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {rule.channel.map((channel) => (
                            <Badge key={channel} variant="secondary" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{rule.recipients}</td>
                      <td className="py-3 px-4">
                        <Switch checked={rule.active} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
