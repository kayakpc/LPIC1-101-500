"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"

interface Question {
  id: string
  question: string
  options?: string[]
  correctAnswer?: string
  type: "multiple-choice" | "text" | "true-false"
}

const mockExam = {
  title: "JavaScript Fundamentals",
  description: "Test your knowledge of JavaScript basics",
  timeLimit: 30, // minutes
  questions: [
    {
      id: "1",
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var x = 5;", "variable x = 5;", "v x = 5;", "declare x = 5;"],
      correctAnswer: "var x = 5;",
      type: "multiple-choice" as const,
    },
    {
      id: "2",
      question: "Explain the difference between let, const, and var in JavaScript.",
      type: "text" as const,
    },
    {
      id: "3",
      question: "JavaScript is case-sensitive.",
      options: ["True", "False"],
      correctAnswer: "True",
      type: "true-false" as const,
    },
  ],
}

export default function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(mockExam.timeLimit * 60) // in seconds
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const question = mockExam.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockExam.questions.length) * 100

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < mockExam.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const submitExam = () => {
    // Calculate score
    let correctAnswers = 0
    mockExam.questions.forEach((q) => {
      if (q.correctAnswer && answers[q.id] === q.correctAnswer) {
        correctAnswers++
      }
    })
    setScore((correctAnswers / mockExam.questions.length) * 100)
    setIsSubmitted(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Exam Completed!</CardTitle>
              <CardDescription>Here are your results</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-blue-600">{Math.round(score)}%</div>
              <div className="space-y-2">
                <p className="text-lg">
                  You scored {Math.round(score)}% on {mockExam.title}
                </p>
                <p className="text-gray-600">
                  {Object.keys(answers).length} of {mockExam.questions.length} questions answered
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={() => window.location.reload()}>Retake Exam</Button>
                <Button variant="outline">View Detailed Results</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">{mockExam.title}</h1>
              <p className="text-gray-600">{mockExam.description}</p>
            </div>
            <div className="flex items-center gap-2 text-orange-600">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Question {currentQuestion + 1} of {mockExam.questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>

        {/* Question */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{question.question}</CardTitle>
            <CardDescription>
              {question.type === "multiple-choice" && "Select the correct answer"}
              {question.type === "true-false" && "Select True or False"}
              {question.type === "text" && "Provide your answer in the text area below"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {question.type === "multiple-choice" && question.options && (
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleAnswer(question.id, value)}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {String.fromCharCode(65 + index)}. {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "true-false" && question.options && (
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleAnswer(question.id, value)}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option} id={`tf-${index}`} />
                    <Label htmlFor={`tf-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "text" && (
              <Textarea
                value={answers[question.id] || ""}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                placeholder="Enter your answer here..."
                rows={4}
                className="w-full"
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestion === mockExam.questions.length - 1 ? (
              <Button onClick={submitExam} className="flex items-center gap-2">
                Submit Exam
                <CheckCircle className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={nextQuestion} className="flex items-center gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Overview */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Question Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {mockExam.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 p-0 ${
                    answers[mockExam.questions[index].id] ? "bg-green-100 border-green-300" : ""
                  }`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
