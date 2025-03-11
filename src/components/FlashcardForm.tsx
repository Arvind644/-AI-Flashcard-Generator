
 import React, { useState } from 'react'; 
 import { BrainCircuit, Loader2 } from 'lucide-react'; 
  
 interface FlashcardFormProps { 
   onGenerate: (topic: string) => Promise<void>; 
   isLoading: boolean; 
 } 
  
 export function FlashcardForm({ onGenerate, isLoading }: FlashcardFormProps) { 
   const [topic, setTopic] = useState(''); 
  
   const handleSubmit = (e: React.FormEvent) => { 
     e.preventDefault(); 
     if (topic.trim()) { 
       onGenerate(topic); 
     } 
   }; 
  
   return ( 
     <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4"> 
       <div className="flex items-center gap-2 text-2xl font-bold text-indigo-600"> 
         <BrainCircuit className="w-8 h-8" /> 
         <h1>AI Flashcard Generator</h1> 
       </div> 
        
       <div className="relative"> 
         <input 
           type="text" 
           value={topic} 
           onChange={(e) => setTopic(e.target.value)} 
           placeholder="Enter a topic (e.g., 'Ancient Rome' or 'Basic JavaScript')" 
           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" 
           disabled={isLoading} 
         /> 
       </div> 
  
       <button 
         type="submit" 
         disabled={isLoading || !topic.trim()} 
         className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
       > 
         {isLoading ? ( 
           <> 
             <Loader2 className="w-5 h-5 animate-spin" /> 
             Generating... 
           </> 
         ) : ( 
           'Generate Flashcards' 
         )} 
       </button> 
     </form> 
   ); 
 } 
 