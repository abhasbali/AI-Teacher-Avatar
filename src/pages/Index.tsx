
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import { ArrowRight, Sparkles, Mic, Users, BookOpen, GraduationCap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar transparent />
      
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-12 bg-gradient-to-b from-background to-secondary">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Next-generation AI for education</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Learn from AI Teacher Avatars with Natural Voice Interaction
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
            Experience personalized learning with our AI teachers across multiple subjects. Ask questions with your voice and receive spoken answers in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(isSignedIn ? '/dashboard' : '/sign-up')}
              className="button-glow px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              {isSignedIn ? 'Go to Dashboard' : 'Get Started'} <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            
            <button
              onClick={() => navigate('/sign-in')}
              className="px-6 py-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl animate-slide-up">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Subject AI Teachers</h3>
              <p className="text-muted-foreground">
                Expert AI teachers for Mathematics, Science, History, Literature and more, each with their own personality and teaching style.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Voice Interaction</h3>
              <p className="text-muted-foreground">
                Ask questions using your voice and get natural-sounding responses from AI teachers through advanced speech synthesis.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">OpenAI Integration</h3>
              <p className="text-muted-foreground">
                Powered by OpenAI's advanced language models to provide accurate, helpful, and context-aware responses to your questions.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-slide-up">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-muted-foreground">
                Secure user accounts with modern authentication to keep your learning progress safe and personalized.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3>
              <p className="text-muted-foreground">
                AI teachers adapt to your learning pace and style, focusing on areas where you need more help and providing personalized guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} EduAI. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
