
import { useEffect, useState } from 'react';

const messages = [
  {
    message: "Every parent has a story. Yours is just beginning, and it's going to be beautiful.",
    author: "For New Parents"
  },
  {
    message: "Your baby's first heartbeat is the rhythm to which your life will dance forever.",
    author: "For Expecting Parents"
  },
  {
    message: "The littlest feet make the biggest footprints in our hearts.",
    author: "For New Parents"
  },
  {
    message: "Growing a baby is like planting a garden - both need love, patience, and care to bloom.",
    author: "For Mothers"
  },
  {
    message: "A father's love begins before birth, grows with every smile, and lasts forever.",
    author: "For Fathers"
  },
  {
    message: "Every kick is a little 'I love you' from your baby.",
    author: "For Expecting Mothers"
  },
  {
    message: "Parenthood: The most beautiful chaos you'll ever experience.",
    author: "For Parents"
  },
  {
    message: "Your baby's smile will light up even the darkest days.",
    author: "For New Parents"
  },
  {
    message: "Every day with your baby is a new adventure waiting to unfold.",
    author: "For Parents"
  },
  {
    message: "You're not just growing a baby, you're growing as a person too.",
    author: "For Expecting Parents"
  }
];

export function InspirationalMessage() {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
    }, 10000); // Change message every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white overflow-hidden shadow-md rounded-xl border border-primary/10 p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-lg text-neutral-700 font-medium italic">"{currentMessage.message}"</p>
          <p className="text-sm text-neutral-500 mt-2">{currentMessage.author}</p>
        </div>
      </div>
    </div>
  );
}
