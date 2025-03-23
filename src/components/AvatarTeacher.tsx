
import { useState, useEffect } from 'react';
import { Subject } from '@/utils/subjectData';
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis';

interface AvatarTeacherProps {
  subject: Subject;
  speaking: boolean;
  message: string;
}

const AvatarTeacher = ({ subject, speaking, message }: AvatarTeacherProps) => {
  const [animation, setAnimation] = useState<string>('idle');
  const { speak, cancel } = useSpeechSynthesis();
  
  // Update animation state based on speaking state
  useEffect(() => {
    if (speaking) {
      setAnimation('speaking');
    } else {
      setAnimation('idle');
    }
  }, [speaking]);
  
  // Speak the message when it changes and speaking is true
  useEffect(() => {
    if (speaking && message) {
      speak(message);
    } else {
      cancel();
    }
    
    return () => {
      cancel();
    };
  }, [speaking, message, speak, cancel]);
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative w-40 h-40 md:w-60 md:h-60 rounded-full overflow-hidden border-4 ${
          animation === 'speaking' ? 'border-primary animate-pulse' : 'border-transparent'
        } transition-all duration-300 shadow-xl`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
        
        {/* Placeholder avatar - in a real app, you'd use an actual avatar image */}
        <div 
          className={`absolute inset-0 flex items-center justify-center ${subject.backgroundColor} transition-transform duration-300 ${
            animation === 'speaking' ? 'scale-105' : 'scale-100'
          }`}
        >
          <span className={`text-5xl font-bold ${subject.color}`}>
            {subject.teacherName.split(' ')[0][0]}
            {subject.teacherName.split(' ')[1][0]}
          </span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-lg">{subject.teacherName}</h3>
        <p className="text-sm text-muted-foreground">{subject.teacherTitle}</p>
      </div>
    </div>
  );
};

export default AvatarTeacher;
