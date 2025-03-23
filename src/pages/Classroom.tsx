import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, SkipForward } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import VoiceRecorder from "@/components/VoiceRecorder";
import AvatarTeacher from "@/components/AvatarTeacher";
import useOpenAI, { Message } from "@/hooks/useOpenAI";
import { getSubjectById } from "@/utils/subjectData";

const Classroom = () => {
  const { subject: subjectId } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const subject = getSubjectById(subjectId || "");
  const [userInput, setUserInput] = useState("");
  const [teacherSpeaking, setTeacherSpeaking] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { getResponse, loading } = useOpenAI();
  
  useEffect(() => {
    if (!subject) {
      toast.error("Subject not found");
      navigate("/dashboard");
      return;
    }
    
    // Initialize with system message and teacher introduction
    const initialConversation: Message[] = [
      {
        role: "system",
        content: `You are ${subject.teacherName}, ${subject.teacherTitle}, an AI teacher specialized in ${subject.name}. 
        Your responses should be educational, helpful, accurate, and in a conversational teaching style. 
        Keep responses concise (under 150 words when possible) but thorough enough to be educational.
        Occasionally mention that you are ${subject.teacherName} to maintain your character.
        Focus on explaining complex concepts in simple terms.`
      },
      {
        role: "assistant",
        content: subject.introduction
      }
    ];
    
    setConversation(initialConversation);
    setCurrentResponse(subject.introduction);
    setTeacherSpeaking(true);
    
  }, [subject, navigate]);
  
  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);
  
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!userInput.trim() && !e) return;
    
    // Skip the current response if the teacher is speaking
    if (teacherSpeaking) {
      setTeacherSpeaking(false);
      return;
    }
    
    const userMessage = userInput.trim() || e;
    
    if (!userMessage) return;
    
    // Add user message to conversation
    const userMsg: Message = { role: "user", content: userMessage as string };
    const updatedConversation = [...conversation, userMsg];
    setConversation(updatedConversation);
    setUserInput("");
    
    try {
      // Get response from OpenAI
      const aiResponse = await getResponse(updatedConversation);
      
      // Add AI response to conversation
      const assistantMsg: Message = { role: "assistant", content: aiResponse };
      setConversation([...updatedConversation, assistantMsg]);
      setCurrentResponse(aiResponse);
      setTeacherSpeaking(true);
    } catch (error) {
      toast.error("Failed to get a response from the teacher");
    }
  };
  
  const handleVoiceInput = (transcript: string) => {
    if (transcript.trim()) {
      setUserInput(transcript);
      
      // Skip the current response if the teacher is speaking
      if (teacherSpeaking) {
        setTeacherSpeaking(false);
        return;
      }
      
      // Add user message to conversation
      const userMsg: Message = { role: "user", content: transcript };
      const updatedConversation = [...conversation, userMsg];
      setConversation(updatedConversation);
      setUserInput("");
      
      // Get response from OpenAI
      getResponse(updatedConversation)
        .then((aiResponse) => {
          // Add AI response to conversation
          const assistantMsg: Message = { role: "assistant", content: aiResponse };
          setConversation([...updatedConversation, assistantMsg]);
          setCurrentResponse(aiResponse);
          setTeacherSpeaking(true);
        })
        .catch(() => {
          toast.error("Failed to get a response from the teacher");
        });
    }
  };
  
  if (!subject) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-8">
        <div className="flex items-center mb-6 animate-fade-in">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="ml-auto flex items-center">
            <div className={`h-3 w-3 rounded-full ${subject.color} mr-2`}></div>
            <h1 className="text-xl font-semibold">{subject.name} Classroom</h1>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Left side - Teacher */}
          <div className="md:w-1/3 flex flex-col items-center justify-start p-6 glass-card rounded-xl animate-fade-in">
            <AvatarTeacher 
              subject={subject} 
              speaking={teacherSpeaking}
              message={currentResponse} 
            />
            
            {teacherSpeaking && (
              <button
                onClick={() => setTeacherSpeaking(false)}
                className="mt-6 flex items-center px-4 py-2 rounded-md text-sm hover:bg-secondary transition-colors"
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Skip response
              </button>
            )}
          </div>
          
          {/* Right side - Chat */}
          <div className="md:w-2/3 flex flex-col glass-card rounded-xl overflow-hidden animate-fade-in">
            <div className="flex-1 p-6 overflow-y-auto max-h-[60vh]">
              {conversation.filter(msg => msg.role !== "system").map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t bg-background">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask your question..."
                  disabled={loading || teacherSpeaking}
                  className="flex-1 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                />
                
                <button
                  type="submit"
                  disabled={!userInput.trim() || loading || teacherSpeaking}
                  className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
                
                <VoiceRecorder
                  onTranscript={handleVoiceInput}
                  disabled={loading || teacherSpeaking}
                  className="ml-2"
                />
              </form>
              
              <div className="mt-2 text-xs text-muted-foreground text-center">
                {loading ? (
                  <span>Teacher is thinking...</span>
                ) : teacherSpeaking ? (
                  <span>Teacher is speaking...</span>
                ) : (
                  <span>Ask a question using voice or text</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Classroom;
