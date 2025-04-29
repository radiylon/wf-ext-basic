import { useState, useCallback } from 'react';
import OpenAI from 'openai';
import dedent from 'dedent';

interface TextGenerationParams {
  description: string;
  textContent: string;
  maxLength?: number;
}

interface UseOpenAIReturn {
  generateText: (params: TextGenerationParams) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export function useOpenAI(): UseOpenAIReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize OpenAI client
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Required for client-side usage
  });

  const generateText = useCallback(async (params: TextGenerationParams): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
          {
            role: "system",
            content: dedent`
              You are an expert at generating website content like titles, headings, subheadings, 
              blog content and captions. Given an existing piece of text content and a description of 
              desired changes, you will efficiently generate improved text that matches the request. 
              You are collaborative and respectful but focused solely on delivering the revised content. 
              Respond only with the final text, without any additional commentary.

              Example:
              Input:
              Existing text: "The best way to learn React"
              Description: "Change to something more engaging and interesting"
              Response: "The Ultimate Guide to Learning React"
            `
          },
          {
            role: "user",
            content: dedent`
              Current text content: ${params.textContent}
              Description: ${params.description}
            `
          }
        ],
        max_tokens: params.maxLength || 150,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate text';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  return {
    generateText,
    isLoading,
    error
  };
} 