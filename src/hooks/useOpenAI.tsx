
import { useState, useCallback } from 'react';
import { toast } from "sonner";

// OpenAI API Key from environment
const OPENAI_API_KEY = "";

interface UseOpenAIProps {
  model?: string;
}

interface UseOpenAIReturn {
  getResponse: (messages: Message[]) => Promise<string>;
  loading: boolean;
  error: Error | null;
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const useOpenAI = ({ model = 'gpt-4o-mini' }: UseOpenAIProps = {}): UseOpenAIReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const getResponse = useCallback(async (messages: Message[]): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from OpenAI');
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(err as Error);
      toast.error(`AI error: ${errorMessage}`);
      return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    } finally {
      setLoading(false);
    }
  }, [model]);
  
  return {
    getResponse,
    loading,
    error,
  };
};

export default useOpenAI;
