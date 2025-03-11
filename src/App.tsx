import { useState } from 'react'; 
import { FlashcardForm } from './components/FlashcardForm'; 
import { FlashcardDisplay } from './components/FlashcardDisplay'; 
import type { Flashcard } from './types'; 
import OpenAI from 'openai';

// OpenAI integration
const generateFlashcards = async (topic: string): Promise<Flashcard[]> => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates flashcards. For each flashcard, provide a question and answer. Return exactly 3 flashcards in the following JSON format: [{\"id\": 1, \"question\": \"...\", \"answer\": \"...\"}, ...]"
        },
        {
          role: "user",
          content: `Create 3 educational flashcards about ${topic}.`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Parse the JSON response
    const parsedContent = JSON.parse(content);
    return parsedContent.flashcards || parsedContent;
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
};

function App() { 
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]); 
  const [isLoading, setIsLoading] = useState(false); 
 
  const handleGenerate = async (topic: string) => { 
    setIsLoading(true); 
    try { 
      const cards = await generateFlashcards(topic); 
      setFlashcards(cards); 
    } catch (error) { 
      console.error('Failed to generate flashcards:', error); 
    } finally { 
      setIsLoading(false); 
    } 
  }; 
 
  const handleReset = () => { 
    setFlashcards([]); 
  }; 
 
  return ( 
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6"> 
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] gap-8"> 
        {flashcards.length === 0 ? ( 
          <FlashcardForm onGenerate={handleGenerate} isLoading={isLoading} /> 
        ) : ( 
          <FlashcardDisplay cards={flashcards} onReset={handleReset} /> 
        )} 
      </div> 
    </div> 
  ); 
} 
 
export default App; 
 