"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ExtractedQuestion {
  id: string
  question: string
  options?: string[]
  correctAnswer?: string
  type: "multiple-choice" | "text" | "true-false"
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [extractedQuestions, setExtractedQuestions] = useState<ExtractedQuestion[]>([])
  const [examTitle, setExamTitle] = useState("")
  const [examDescription, setExamDescription] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    }
  }

  const processPDF = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate PDF processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 500)

    // Simulate API call to process PDF
    setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)

      // Mock extracted questions
      const mockQuestions: ExtractedQuestion[] = [
        {
          id: "1",
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: "Paris",
          type: "multiple-choice",
        },
        {
          id: "2",
          question: "Explain the concept of object-oriented programming.",
          type: "text",
        },
        {
          id: "3",
          question: "JavaScript is a compiled language.",
          options: ["True", "False"],
          correctAnswer: "False",
          type: "true-false",
        },
      ]

      setExtractedQuestions(mockQuestions)
      setIsProcessing(false)
    }, 3000)
  }

  const saveToGitHub = async () => {
    // This would integrate with GitHub API to save questions
    console.log("Saving to GitHub:", {
      title: examTitle,
      description: examDescription,
      questions: extractedQuestions,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload PDF Questions</h1>
          <p className="text-gray-600">
            Upload your PDF file containing exam questions and we'll extract them automatically
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload PDF File
                </CardTitle>
                <CardDescription>Select a PDF file containing your exam questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pdf-file">PDF File</Label>
                  <Input id="pdf-file" type="file" accept=".pdf" onChange={handleFileUpload} className="mt-1" />
                </div>

                {file && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700">{file.name}</span>
                  </div>
                )}

                <Button onClick={processPDF} disabled={!file || isProcessing} className="w-full">
                  {isProcessing ? "Processing..." : "Extract Questions"}
                </Button>

                {isProcessing && (
                  <div className="space-y-2">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-gray-600 text-center">Processing PDF... {progress}%</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {extractedQuestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Exam Details</CardTitle>
                  <CardDescription>Add details for your extracted exam</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="exam-title">Exam Title</Label>
                    <Input
                      id="exam-title"
                      value={examTitle}
                      onChange={(e) => setExamTitle(e.target.value)}
                      placeholder="Enter exam title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exam-description">Description</Label>
                    <Textarea
                      id="exam-description"
                      value={examDescription}
                      onChange={(e) => setExamDescription(e.target.value)}
                      placeholder="Enter exam description"
                      rows={3}
                    />
                  </div>
                  <Button onClick={saveToGitHub} className="w-full">
                    Save to GitHub Repository
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            {extractedQuestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Extracted Questions ({extractedQuestions.length})
                  </CardTitle>
                  <CardDescription>Review the questions extracted from your PDF</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {extractedQuestions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">Question {index + 1}</h4>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{question.type}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{question.question}</p>

                        {question.options && (
                          <div className="space-y-1">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`text-xs p-2 rounded ${
                                  option === question.correctAnswer ? "bg-green-100 text-green-800" : "bg-gray-100"
                                }`}
                              >
                                {String.fromCharCode(65 + optIndex)}. {option}
                                {option === question.correctAnswer && <CheckCircle className="w-3 h-3 inline ml-1" />}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
