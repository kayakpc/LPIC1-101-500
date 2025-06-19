"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function GitHubSetupPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [repoUrl, setRepoUrl] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const connectToGitHub = async () => {
    setIsConnecting(true)

    // Simulate GitHub connection
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
    }, 2000)
  }

  const disconnectFromGitHub = () => {
    setIsConnected(false)
    setRepoUrl("")
    setAccessToken("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">GitHub Integration Setup</h1>
          <p className="text-gray-600">
            Connect your GitHub repository to sync exam questions and enable version control
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="w-5 h-5" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Connected to GitHub</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <span>Not connected</span>
                      <Badge variant="outline">Inactive</Badge>
                    </>
                  )}
                </div>
                {isConnected && (
                  <Button variant="outline" onClick={disconnectFromGitHub}>
                    Disconnect
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {!isConnected ? (
            <Card>
              <CardHeader>
                <CardTitle>Connect to GitHub</CardTitle>
                <CardDescription>Enter your GitHub repository details to enable synchronization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="repo-url">Repository URL</Label>
                  <Input
                    id="repo-url"
                    placeholder="https://github.com/username/exam-questions"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    The GitHub repository where your exam questions will be stored
                  </p>
                </div>

                <div>
                  <Label htmlFor="access-token">Personal Access Token</Label>
                  <Input
                    id="access-token"
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Generate a token with repo permissions in your GitHub settings
                    <a
                      href="https://github.com/settings/tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 ml-1 text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Create token
                    </a>
                  </p>
                </div>

                <Button
                  onClick={connectToGitHub}
                  disabled={!repoUrl || !accessToken || isConnecting}
                  className="w-full"
                >
                  {isConnecting ? "Connecting..." : "Connect to GitHub"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Repository Information</CardTitle>
                <CardDescription>Your connected GitHub repository details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Repository</Label>
                    <div className="mt-1 p-2 bg-gray-50 rounded border">exam-questions-repo</div>
                  </div>
                  <div>
                    <Label>Branch</Label>
                    <div className="mt-1 p-2 bg-gray-50 rounded border">main</div>
                  </div>
                </div>

                <div>
                  <Label>Last Sync</Label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border">2 hours ago</div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">Sync Now</Button>
                  <Button variant="outline">
                    View Repository
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>How it Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                    1
                  </div>
                  <div>
                    <strong>Upload PDFs:</strong> Upload your exam question PDFs through the upload interface
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                    2
                  </div>
                  <div>
                    <strong>Auto-sync:</strong> Extracted questions are automatically committed to your GitHub
                    repository
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                    3
                  </div>
                  <div>
                    <strong>Version Control:</strong> Track changes, collaborate with team members, and maintain
                    question history
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                    4
                  </div>
                  <div>
                    <strong>Deploy:</strong> Deploy your exam engine with the latest questions from your repository
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
