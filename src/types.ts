
 export interface Flashcard { 
   id: string; 
   question: string; 
   answer: string; 
 } 
  
 export interface FlashcardDeck { 
   id: string; 
   topic: string; 
   cards: Flashcard[]; 
 } 
 