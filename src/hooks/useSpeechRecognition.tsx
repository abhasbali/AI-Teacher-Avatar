import { useState, useEffect, useCallback, useRef } from 'react';

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface UseSpeechRecognitionProps {
  onResult?: (transcript: string) => void;
  onEnd?: () => void;
  language?: string;
  continuous?: boolean;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  error: Error | null;
  browserSupportsSpeechRecognition: boolean;
}

const useSpeechRecognition = ({
  onResult,
  onEnd,
  language = 'en-US',
  continuous = true,
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<Error | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const browserSupportsSpeechRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  
  const createRecognitionInstance = useCallback(() => {
    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      return null;
    }
    
    const recognition = new SpeechRecognitionAPI();
    
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;
    
    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      const currentTranscript = finalTranscript || interimTranscript;
      setTranscript(currentTranscript);
      onResult?.(currentTranscript);
    };
    
    recognition.onerror = (event) => {
      setError(new Error(event.error));
    };
    
    recognition.onend = () => {
      setIsListening(false);
      onEnd?.();
    };
    
    return recognition;
  }, [browserSupportsSpeechRecognition, continuous, language, onEnd, onResult]);
  
  const startListening = useCallback(() => {
    if (!browserSupportsSpeechRecognition) {
      setError(new Error('Browser does not support speech recognition.'));
      return;
    }
    
    if (!recognitionRef.current) {
      recognitionRef.current = createRecognitionInstance();
    }
    
    try {
      recognitionRef.current?.start();
      setIsListening(true);
      setError(null);
    } catch (err) {
      setError(err as Error);
    }
  }, [browserSupportsSpeechRecognition, createRecognitionInstance]);
  
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);
  
  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);
  
  useEffect(() => {
    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);
  
  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    error,
    browserSupportsSpeechRecognition,
  };
};

export default useSpeechRecognition;
