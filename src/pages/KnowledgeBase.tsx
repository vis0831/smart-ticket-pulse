import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockKBArticles } from "@/lib/mockData";
import { ArrowLeft, Plus, Search, Edit, Trash2, Eye } from "lucide-react";

export default function KnowledgeBase() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = mockKBArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
          </div>
          <Button onClick={() => navigate("/admin/kb/new")}>
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Tags</th>
                    <th className="text-left py-3 px-4">Updated</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Views</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{article.title}</td>
                      <td className="py-3 px-4">{article.category}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(article.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={article.status === "published" ? "default" : "secondary"} className={article.status === "published" ? "bg-success text-success-foreground" : ""}>
                          {article.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span className="text-sm">{article.views}</span>
                        </div>
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
