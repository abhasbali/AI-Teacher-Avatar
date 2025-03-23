
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import SubjectCard from "@/components/SubjectCard";
import { subjects } from "@/utils/subjectData";
import { Search } from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/50">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">
            Welcome, {user?.firstName || 'Student'}
          </h1>
          <p className="text-muted-foreground">
            Choose a subject to start learning with your AI teachers
          </p>
        </div>
        
        <div className="relative mb-8 animate-fade-in">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 py-3 pr-4 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject, index) => (
            <SubjectCard 
              key={subject.id} 
              subject={subject}
              index={index}
            />
          ))}
          
          {filteredSubjects.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No subjects found. Try a different search term.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
