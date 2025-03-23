
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Subject } from "@/utils/subjectData";

interface SubjectCardProps {
  subject: Subject;
  index: number;
}

const SubjectCard = ({ subject, index }: SubjectCardProps) => {
  const navigate = useNavigate();
  const delayAnimation = index * 100;
  
  return (
    <div 
      className="glass-card rounded-xl overflow-hidden h-full flex flex-col animate-slide-up"
      style={{ animationDelay: `${delayAnimation}ms` }}
    >
      <div className={`${subject.backgroundColor} p-6`}>
        <div className="flex justify-between items-center mb-4">
          <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <subject.icon className={`h-6 w-6 ${subject.color}`} />
          </div>
        </div>
        <h3 className={`text-xl font-semibold ${subject.color}`}>{subject.name}</h3>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-muted-foreground mb-4 flex-1">
          {subject.description}
        </p>
        
        <p className="text-sm text-muted-foreground mb-4">
          Teacher: {subject.teacherName}
        </p>
        
        <button
          onClick={() => navigate(`/classroom/${subject.id}`)}
          className="flex items-center justify-between w-full px-4 py-2 rounded-lg border border-primary/20 hover:bg-primary/5 group transition-colors"
        >
          <span>Enter Classroom</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;
