// src/services/quotesService.js

// Collection of fitness and motivational quotes
const quotes = [
  {
    text: "Your body can stand almost anything. It's your mind that you have to convince.",
    author: "Andrew Murphy"
  },
  {
    text: "The hard days are the best because that's when champions are made.",
    author: "Gabrielle Reece"
  },
  {
    text: "If you want something you've never had, you must be willing to do something you've never done.",
    author: "Thomas Jefferson"
  },
  {
    text: "The clock is ticking. Are you becoming the person you want to be?",
    author: "Greg Plitt"
  },
  {
    text: "The successful warrior is the average man, with laser-like focus.",
    author: "Bruce Lee"
  },
  {
    text: "The body achieves what the mind believes.",
    author: "Napoleon Hill"
  },
  {
    text: "The difference between the impossible and the possible lies in a person's determination.",
    author: "Tommy Lasorda"
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    author: "Arnold Schwarzenegger"
  },
  {
    text: "If it doesn't challenge you, it doesn't change you.",
    author: "Fred DeVito"
  }
];

// Get a random quote from the collection
export function getRandomQuote() {
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * quotes.length);
  
  // Return a promise to keep the API interface consistent
  return Promise.resolve(quotes[randomIndex]);
}