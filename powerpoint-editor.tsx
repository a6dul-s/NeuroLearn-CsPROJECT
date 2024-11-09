import React, { useState, useRef, useEffect } from 'react';
import { Upload, MessageSquare, FileText, Video, Type, Image, Send, Download, Sparkles, Brain } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PowerPointEditor = () => {
  const [step, setStep] = useState('upload');
  const [file, setFile] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m NeuroLearn, your AI presentation assistant. Please upload your PowerPoint file to get started! 🚀',
      timestamp: new Date().toISOString()
    }
  ]);
  const [showFontDialog, setShowFontDialog] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showDownload, setShowDownload] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (message) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: message,
      timestamp: new Date().toISOString()
    }]);
    setIsTyping(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setStep('chat');
      setMessages(prev => [...prev, 
        { 
          role: 'user', 
          content: `Uploaded: ${file.name}`,
          timestamp: new Date().toISOString()
        }
      ]);
      simulateTyping('Thanks for uploading your PowerPoint! I\'m ready to help you transform it. What would you like to do today? ✨');
      setShowCustomization(true);
    }
  };

  const handleAction = async (action) => {
    let responseMessage = '';
    switch (action) {
      case 'summarize':
        responseMessage = 'I\'ll analyze and summarize your slides. Would you like a brief overview or a detailed breakdown? 📊';
        break;
      case 'video':
        responseMessage = 'Let\'s create an engaging video! Would you like me to generate a natural voiceover for all slides or specific ones? 🎥';
        break;
      case 'font':
        setShowFontDialog(true);
        return;
      case 'background':
        responseMessage = 'Time to make your slides pop! What kind of theme are you going for? Professional, creative, or academic? 🎨';
        break;
      default:
        responseMessage = 'What would you like to explore next? 🤔';
    }
    setMessages(prev => [...prev, 
      { 
        role: 'user', 
        content: `Selected: ${action}`,
        timestamp: new Date().toISOString()
      }
    ]);
    await simulateTyping(responseMessage);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userInput,
      timestamp: new Date().toISOString()
    }]);
    setUserInput('');
    
    // Simulate processing
    await simulateTyping("I'm working on your request... 🔄");
    setShowDownload(true);
    await simulateTyping("I've made the changes! You can now download your updated presentation. 🎉");
  };

  const handleDownload = () => {
    // Simulate download delay
    simulateTyping("Starting download... Your presentation has been enhanced! 🌟");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">NeuroLearn</CardTitle>
              <CardDescription className="text-blue-100">AI-Powered Presentation Enhancement</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {step === 'upload' && (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300">
              <Upload className="w-16 h-16 mb-4 text-blue-500" />
              <label className="cursor-pointer">
                <span className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  Choose PowerPoint File
                </span>
                <input
                  type="file"
                  accept=".pptx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          )}

          {step === 'chat' && (
            <div className="space-y-4">
              <div className="h-96 overflow-y-auto p-4 border rounded-lg space-y-3 bg-white">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'assistant' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[80%] ${
                        message.role === 'assistant'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200'
                      } shadow-md`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {showCustomization && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
                    onClick={() => handleAction('summarize')}
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    Summarize
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
                    onClick={() => handleAction('video')}
                  >
                    <Video className="w-4 h-4 text-purple-600" />
                    Generate Video
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
                    onClick={() => handleAction('font')}
                  >
                    <Type className="w-4 h-4 text-blue-600" />
                    Change Font
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
                    onClick={() => handleAction('background')}
                  >
                    <Image className="w-4 h-4 text-purple-600" />
                    Background
                  </Button>
                </div>
              )}

              {showDownload && (
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex items-center justify-center gap-2 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5" />
                  Download Enhanced Presentation
                  <Sparkles className="w-5 h-5" />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showFontDialog} onOpenChange={setShowFontDialog}>
        <AlertDialogContent className="bg-gradient-to-br from-white to-blue-50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-blue-600">Enhance Your Typography</AlertDialogTitle>
            <AlertDialogDescription>
              Choose a new font style to elevate your presentation
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <Select>
              <SelectTrigger className="border-blue-200">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arial">Arial</SelectItem>
                <SelectItem value="times">Times New Roman</SelectItem>
                <SelectItem value="calibri">Calibri</SelectItem>
                <SelectItem value="helvetica">Helvetica</SelectItem>
                <SelectItem value="georgia">Georgia</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="border-blue-200">
                <SelectValue placeholder="Apply to" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Slides</SelectItem>
                <SelectItem value="current">Current Slide</SelectItem>
                <SelectItem value="selected">Selected Slides</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-blue-200">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Apply Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PowerPointEditor;