
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <div className="absolute top-4 left-4">
        <button 
          onClick={() => navigate('/')}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          ← Back to home
        </button>
      </div>
      
      <div className="glass-card p-8 rounded-xl w-full max-w-md animate-fade-in">
        <h1 className="text-2xl font-semibold text-center mb-8">Welcome Back</h1>
        <ClerkSignIn
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "glass-card shadow-none p-0",
              headerTitle: "text-xl font-medium",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "glass-card hover:opacity-90 transition-opacity",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground transition-colors",
              footerActionText: "text-muted-foreground",
              footerActionLink: "text-primary hover:text-primary/90 transition-colors",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
