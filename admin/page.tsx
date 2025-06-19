"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, BarChart3, Settings, Plus, Edit, Trash2, Github, Download } from "lucide-react"

interface Exam {
  id: string
  title: string
  description: string
  questions: number
  attempts: number
  avgScore: number
  status: "active" | "draft" | "archived"
  createdAt: string
}

const mockExams: Exam[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Basic JavaScript concepts and syntax",
    questions: 25,
    attempts: 142,
    avgScore: 78,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "React Components",
    description: "Understanding React component lifecycle",
    questions: 18,
    attempts: 89,
    avgScore: 82,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Database Design",
    description: "SQL and database normalization",
    questions: 30,
    attempts: 0,
    avgScore: 0,
    status: "draft",
    createdAt: "2024-01-20",
  },
]

export default function AdminPage() {
  const [exams, setExams] = useState<Exam[]>(mockExams)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Exam Administration</h1>
        <p className="text-gray-600">Manage your exam question banks, monitor performance, and sync with GitHub</p>
      </div>

      <Tabs defaultValue="exams" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="exams" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Exams
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="github" className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exams" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex-1 max-w-sm">
              <Input placeholder="Search exams..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Exam
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredExams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {exam.title}
                        <Badge className={getStatusColor(exam.status)}>{exam.status}</Badge>
                      </CardTitle>
                      <CardDescription>{exam.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-900">{exam.questions}</div>
                      <div className="text-gray-600">Questions</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{exam.attempts}</div>
                      <div className="text-gray-600">Attempts</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{exam.avgScore}%</div>
                      <div className="text-gray-600">Avg Score</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{exam.createdAt}</div>
                      <div className="text-gray-600">Created</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{exams.length}</div>
                <p className="text-xs text-gray-600">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{exams.reduce((sum, exam) => sum + exam.attempts, 0)}</div>
                <p className="text-xs text-gray-600">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(exams.reduce((sum, exam) => sum + exam.avgScore, 0) / exams.length)}%
                </div>
                <p className="text-xs text-gray-600">+3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{exams.filter((exam) => exam.status === "active").length}</div>
                <p className="text-xs text-gray-600">Ready for students</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exam Performance</CardTitle>
              <CardDescription>Overview of exam attempts and average scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{exam.title}</div>
                      <div className="text-sm text-gray-600">{exam.attempts} attempts</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{exam.avgScore}%</div>
                      <div className="text-sm text-gray-600">avg score</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="github" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="w-5 h-5" />
                GitHub Integration
              </CardTitle>
              <CardDescription>Sync your exam questions with GitHub repositories for version control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Repository Status</div>
                  <div className="text-sm text-gray-600">Connected to: exam-questions-repo</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Pull Latest Changes
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  Push Local Changes
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Recent Commits</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">Added JavaScript fundamentals questions</div>
                      <div className="text-xs text-gray-600">2 hours ago</div>
                    </div>
                    <Badge variant="outline">main</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">Updated React component questions</div>
                      <div className="text-xs text-gray-600">1 day ago</div>
                    </div>
                    <Badge variant="outline">main</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your exam engine preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Default Time Limit (minutes)</label>
                  <Input type="number" defaultValue="30" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Questions per Page</label>
                  <Input type="number" defaultValue="1" className="mt-1" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub Repository URL</label>
                <Input
                  placeholder="https://github.com/username/exam-questions"
                  defaultValue="https://github.com/username/exam-questions"
                />
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
