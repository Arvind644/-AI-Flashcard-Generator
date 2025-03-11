
 import { useState } from 'react'; 
 import { motion, AnimatePresence } from 'framer-motion'; 
 import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'; 
 import { Flashcard } from '../types'; 
  
 interface FlashcardDisplayProps { 
   cards: Flashcard[]; 
   onReset: () => void; 
 } 
  
 export function FlashcardDisplay({ cards, onReset }: FlashcardDisplayProps) { 
   const [currentIndex, setCurrentIndex] = useState(0); 
   const [isFlipped, setIsFlipped] = useState(false); 
  
   const handleNext = () => { 
     if (currentIndex < cards.length - 1) { 
       setIsFlipped(false); 
       setCurrentIndex(prev => prev + 1); 
     } 
   }; 
  
   const handlePrevious = () => { 
     if (currentIndex > 0) { 
       setIsFlipped(false); 
       setCurrentIndex(prev => prev - 1); 
     } 
   }; 
  
   return ( 
     <div className="w-full max-w-2xl space-y-6"> 
       <div className="flex justify-between items-center"> 
         <h2 className="text-xl font-semibold text-gray-700"> 
           Card {currentIndex + 1} of {cards.length} 
         </h2> 
         <button 
           onClick={onReset} 
           className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition" 
         > 
           <RotateCcw className="w-4 h-4" /> 
           New Topic 
         </button> 
       </div> 
  
       <div className="relative perspective" style={{ perspective: '1000px' }}> 
         <motion.div 
           className="w-full aspect-[3/2] cursor-pointer" 
           onClick={() => setIsFlipped(!isFlipped)} 
           animate={{ rotateY: isFlipped ? 180 : 0 }} 
           transition={{ duration: 0.6, type: "spring", stiffness: 100 }} 
           style={{ transformStyle: 'preserve-3d' }} 
         > 
           <div 
             className={`absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg p-8 flex items-center justify-center text-center ${ 
               isFlipped ? 'hidden' : '' 
             }`} 
           > 
             <p className="text-xl font-medium text-gray-800">{cards[currentIndex].question}</p> 
           </div> 
           <div 
             className={`absolute inset-0 backface-hidden bg-indigo-50 rounded-xl shadow-lg p-8 flex items-center justify-center text-center ${ 
               !isFlipped ? 'hidden' : '' 
             }`} 
             style={{ transform: 'rotateY(180deg)' }} 
           > 
             <p className="text-xl font-medium text-gray-800">{cards[currentIndex].answer}</p> 
           </div> 
         </motion.div> 
       </div> 
  
       <div className="flex justify-between items-center"> 
         <button 
           onClick={handlePrevious} 
           disabled={currentIndex === 0} 
           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition" 
         > 
           <ChevronLeft className="w-5 h-5" /> 
           Previous 
         </button> 
         <button 
           onClick={handleNext} 
           disabled={currentIndex === cards.length - 1} 
           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition" 
         > 
           Next 
           <ChevronRight className="w-5 h-5" /> 
         </button> 
       </div> 
     </div> 
   ); 
 } 
 