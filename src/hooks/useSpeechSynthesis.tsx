
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechSynthesisProps {
  onEnd?: () => void;
  onError?: (error: SpeechSynthesisErrorEvent) => void;
}

interface UseSpeechSynthesisReturn {
  speak: (text: string, voice?: SpeechSynthesisVoice) => void;
  cancel: () => void;
  speaking: boolean;
  voices: SpeechSynthesisVoice[];
  error: Error | null;
  supported: boolean;
}

const useSpeechSynthesis = ({
  onEnd,
  onError,
}: UseSpeechSynthesisProps = {}): UseSpeechSynthesisReturn => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const supported = 'speechSynthesis' in window;
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  const getVoices = useCallback(() => {
    if (!supported) return [];
    
    return window.speechSynthesis.getVoices();
  }, [supported]);
  
  useEffect(() => {
    if (!supported) {
      setError(new Error('Browser does not support speech synthesis.'));
      return;
    }
    
    const updateVoices = () => {
      setVoices(getVoices());
    };
    
    updateVoices();
    
    // Some browsers (like Chrome) load voices asynchronously
    window.speechSynthesis.onvoiceschanged = updateVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [getVoices, supported]);
  
  const speak = useCallback((text: string, voice?: SpeechSynthesisVoice) => {
    if (!supported) {
      setError(new Error('Browser does not support speech synthesis.'));
      return;
    }
    
    // Cancel any ongoing speech
    cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voice) {
      utterance.voice = voice;
    } else if (voices.length > 0) {
      // Try to find a good default voice
      const defaultVoice = voices.find(v => v.lang.includes('en-US') && v.name.includes('Google'));
      if (defaultVoice) {
        utterance.voice = defaultVoice;
      }
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => {
      setSpeaking(true);
    };
    
    utterance.onend = () => {
      setSpeaking(false);
      onEnd?.();
    };
    
    utterance.onerror = (event) => {
      setSpeaking(false);
      setError(new Error(`Speech synthesis error: ${event.error}`));
      onError?.(event);
    };
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [onEnd, onError, supported, voices]);
  
  const cancel = useCallback(() => {
    if (!supported) return;
    
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);
  
  useEffect(() => {
    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supported]);
  
  return {
    speak,
    cancel,
    speaking,
    voices,
    error,
    supported,
  };
};

export default useSpeechSynthesis;
