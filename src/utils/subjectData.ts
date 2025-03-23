
import { BookOpen, Atom, Clock, BookText, Code } from "lucide-react";

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: typeof BookOpen;
  color: string;
  backgroundColor: string;
  teacherName: string;
  teacherTitle: string;
  introduction: string;
  avatarSrc: string;
}

export const subjects: Subject[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Learn algebra, calculus, geometry and more with interactive guidance.",
    icon: BookOpen,
    color: "text-math",
    backgroundColor: "bg-math/10",
    teacherName: "Dr. Alan Chen",
    teacherTitle: "Mathematics Professor",
    introduction: "Hello! I'm Dr. Chen, your AI mathematics teacher. I specialize in making complex mathematical concepts easy to understand. Whether you're struggling with algebra, calculus, or geometry, I'm here to help you master these subjects with clear explanations and personalized guidance.",
    avatarSrc: "/math-teacher.png"
  },
  {
    id: "science",
    name: "Science",
    description: "Explore physics, chemistry, biology and scientific principles.",
    icon: Atom,
    color: "text-science",
    backgroundColor: "bg-science/10",
    teacherName: "Dr. Maria Rodriguez",
    teacherTitle: "Science Educator",
    introduction: "Welcome! I'm Dr. Rodriguez, your AI science teacher. I'm passionate about physics, chemistry, and biology. I'll help you understand scientific concepts through clear explanations and interactive discussions. Let's explore the wonders of science together!",
    avatarSrc: "/science-teacher.png"
  },
  {
    id: "history",
    name: "History",
    description: "Discover world history, civilizations and key historical events.",
    icon: Clock,
    color: "text-history",
    backgroundColor: "bg-history/10",
    teacherName: "Prof. James Thompson",
    teacherTitle: "History Scholar",
    introduction: "Greetings! I'm Professor Thompson, your AI history teacher. I specialize in world history, civilizations, and significant historical events. I'll help you understand the past through engaging narratives and critical analysis. History isn't just about memorizing dates—it's about understanding the story of humanity.",
    avatarSrc: "/history-teacher.png"
  },
  {
    id: "literature",
    name: "Literature",
    description: "Analyze classic and modern literature, poetry and writing techniques.",
    icon: BookText,
    color: "text-literature",
    backgroundColor: "bg-literature/10",
    teacherName: "Dr. Emily Foster",
    teacherTitle: "Literature Professor",
    introduction: "Hello there! I'm Dr. Foster, your AI literature teacher. I love exploring classic and modern literature, poetry, and writing techniques. I'll help you analyze texts, understand literary devices, and appreciate the beauty of written expression. Together, we'll delve into the world of stories and discover the power of words.",
    avatarSrc: "/literature-teacher.png"
  },
  {
    id: "coding",
    name: "Computer Science",
    description: "Learn programming fundamentals, algorithms and software development.",
    icon: Code,
    color: "text-coding",
    backgroundColor: "bg-coding/10",
    teacherName: "Prof. Alex Kim",
    teacherTitle: "Computer Science Instructor",
    introduction: "Hi there! I'm Professor Kim, your AI computer science teacher. I specialize in programming languages, algorithms, and software development. Whether you're a beginner or looking to advance your coding skills, I'll guide you through concepts with practical examples and clear explanations. Let's build something amazing together!",
    avatarSrc: "/coding-teacher.png"
  }
];

export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};
