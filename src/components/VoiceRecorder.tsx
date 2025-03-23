
import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
  className?: string;
}

const VoiceRecorder = ({ onTranscript, disabled = false, className = '' }: VoiceRecorderProps) => {
  const [feedbackText, setFeedbackText] = useState<string>('Click to speak');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    onResult: (text) => {
      if (text) {
        setFeedbackText(text);
      }
    },
    onEnd: () => {
      if (transcript) {
        onTranscript(transcript);
        resetTranscript();
      }
    }
  });
  
  useEffect(() => {
    // Hide feedback after 3 seconds of inactivity
    if (!isListening && showFeedback) {
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isListening, showFeedback]);
  
  const handleToggleListening = () => {
    if (disabled) return;
    
    if (isListening) {
      stopListening();
      
      // If there's a transcript, use it
      if (transcript) {
        onTranscript(transcript);
        resetTranscript();
      }
    } else {
      setShowFeedback(true);
      setFeedbackText('Listening...');
      startListening();
    }
  };
  
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-sm text-muted-foreground">
          Your browser doesn't support voice input
        </p>
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleToggleListening}
        disabled={disabled}
        className={`relative h-14 w-14 rounded-full flex items-center justify-center transition-all ${
          isListening 
            ? 'bg-destructive text-white shadow-lg scale-110' 
            : 'bg-primary text-white hover:bg-primary/90'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        title={isListening ? 'Stop recording' : 'Start recording'}
      >
        {isListening ? (
          <div className="relative">
            <MicOff className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          </div>
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </button>
      
      {showFeedback && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 min-w-60 p-2 bg-background rounded-lg shadow-lg border animate-fade-in text-center">
          <p className="text-sm truncate">
            {isListening && <Loader2 className="inline-block h-3 w-3 mr-2 animate-spin" />}
            {feedbackText}
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
