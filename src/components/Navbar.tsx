
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`w-full py-4 px-6 ${transparent ? 'absolute top-0 left-0 z-10' : 'bg-background border-b'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold tracking-tight transition-opacity hover:opacity-90">
          EduAI
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-foreground/80 transition-colors">
            Home
          </Link>
          {isSignedIn && (
            <Link to="/dashboard" className="text-foreground hover:text-foreground/80 transition-colors">
              Dashboard
            </Link>
          )}
          
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <button 
                  onClick={() => navigate('/sign-in')}
                  className="px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/sign-up')}
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b p-4 animate-slide-down">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {isSignedIn && (
              <Link 
                to="/dashboard" 
                className="px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            {isSignedIn ? (
              <div className="px-4 py-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <>
                <button 
                  onClick={() => {
                    navigate('/sign-in');
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-md hover:bg-secondary transition-colors text-left"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    navigate('/sign-up');
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-left"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
