export interface Letter {
  id: number;
  title: string;
  date: string;
  icon: string;
  body: string;
}

export interface Milestone {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: string;
}

export interface Track {
  id: number;
  title: string;
  artist: string;
  icon: string;
  src: string;
}

export interface ComfortScenario {
  id: string;
  title: string;
  icon: string;
  message: string;
  submessage: string;
  trackId: number | null;
}

export const RECIPIENT_NAME = "Love";

export const letters: Letter[] = [
  {
    id: 1,
    title: "The First Day",
    date: "Day 1",
    icon: "Mail",
    body: "From the very first moment I saw you, I knew something magical was about to begin. Your smile lit up the entire room, and I couldn't help but feel drawn to you like a moth to a flame. Every day since then has been a gift I never expected but always hoped for.",
  },
  {
    id: 2,
    title: "Our Adventures",
    date: "Day 30",
    icon: "Plane",
    body: "Remember that time we got completely lost trying to find that restaurant? We walked for ages, laughing the whole way, and ended up finding that tiny little café instead. That's what I love about us — even our mistakes turn into the best memories.",
  },
  {
    id: 3,
    title: "The Little Things",
    date: "Day 100",
    icon: "Flower2",
    body: "It's in the little things — the way you scrunch your nose when you laugh, how you always steal the blanket at night, the way you hum while cooking. These tiny moments are the ones I hold closest to my heart.",
  },
  {
    id: 4,
    title: "Through Everything",
    date: "Day 200",
    icon: "Moon",
    body: "We've been through so much together already. The ups, the downs, the in-betweens. And through all of it, you've been my anchor, my safe place, my favorite person. I wouldn't trade a single moment.",
  },
  {
    id: 5,
    title: "Forever & Always",
    date: "Day 365",
    icon: "Heart",
    body: "One year. 365 days of loving you, and I've never been more sure of anything. You are my home, my heart, my everything. Here's to infinity more days of us. I love you more than words could ever express.",
  },
];

export const milestones: Milestone[] = [
  {
    id: 1,
    date: "The Beginning",
    title: "First Meeting",
    description: "The day our paths crossed and everything changed forever.",
    icon: "Sparkles",
  },
  {
    id: 2,
    date: "Week 2",
    title: "First Date",
    description: "Nervous butterflies, awkward silences, and the best coffee we've ever had.",
    icon: "Coffee",
  },
  {
    id: 3,
    date: "Month 1",
    title: "First 'I Love You'",
    description: "Three words that made the whole world stop spinning.",
    icon: "HeartHandshake",
  },
  {
    id: 4,
    date: "Month 3",
    title: "First Trip Together",
    description: "Getting lost in a new city with the best travel partner ever.",
    icon: "MapPin",
  },
  {
    id: 5,
    date: "Month 6",
    title: "Our Song",
    description: "That moment when a random song became OUR song.",
    icon: "Music",
  },
  {
    id: 6,
    date: "Month 9",
    title: "Meeting the Family",
    description: "Officially official. They love you almost as much as I do.",
    icon: "Users",
  },
  {
    id: 7,
    date: "Year 1",
    title: "Our Anniversary",
    description: "365 days of the greatest adventure of my life.",
    icon: "Cake",
  },
];

export const playlist: Track[] = [
  { id: 1, title: "Perfect", artist: "Ed Sheeran", icon: "Music", src: "" },
  { id: 2, title: "Can't Help Falling in Love", artist: "Elvis Presley", icon: "Disc3", src: "" },
  { id: 3, title: "All of Me", artist: "John Legend", icon: "Music2", src: "" },
  { id: 4, title: "A Thousand Years", artist: "Christina Perri", icon: "Hourglass", src: "" },
  { id: 5, title: "Thinking Out Loud", artist: "Ed Sheeran", icon: "Music3", src: "" },
  { id: 6, title: "Lullaby", artist: "Ambient Dreams", icon: "Moon", src: "" },
  { id: 7, title: "Sunshine After Rain", artist: "Happy Vibes", icon: "Sun", src: "" },
];

export const comfortScenarios: ComfortScenario[] = [
  {
    id: "sad",
    title: "If You're Sad",
    icon: "HeartHandshake",
    message: "Hey, it's okay to not be okay. I'm right here with you, always. Take a deep breath. You are stronger than you think, braver than you feel, and loved more than you'll ever know.",
    submessage: "Close your eyes. Imagine me holding you tight. Because even when I'm not there physically, my love wraps around you like a warm blanket.",
    trackId: 3,
  },
  {
    id: "sleep",
    title: "Can't Sleep?",
    icon: "Moon",
    message: "Shhh... it's okay. Let go of today's worries. Tomorrow is a brand new page, and tonight, you just need to rest. I'll be here when you wake up.",
    submessage: "Imagine we're lying under the stars, counting them one by one until your eyes get heavy... 3... 2... 1... goodnight, my love.",
    trackId: 6,
  },
  {
    id: "bad-day",
    title: "Bad Day?",
    icon: "Sun",
    message: "Bad days don't last, but we do. Whatever happened today doesn't define you. You're amazing, resilient, and so incredibly loved. Tomorrow will be better, I promise.",
    submessage: "Remember: even the rainiest days end with the most beautiful sunsets. And you? You're my sunrise every single morning.",
    trackId: 7,
  },
];

export const secretMessage = {
  title: "You Found the Secret!",
  message: "This hidden corner is just for you — my favorite human in the entire universe. No matter where life takes us, no matter what challenges we face, know this: you are my greatest adventure, my safest home, and my most beautiful dream come true. I love you to the moon, around all the stars, and back again. Forever yours.",
};

export const menuItems = [
  { id: "OUR_STORY", label: "Our Story", icon: "BookOpen", description: "Our journey together" },
  { id: "LETTERS", label: "Letters", icon: "Mail", description: "Words from my heart" },
  { id: "COMFORT_ZONE", label: "Comfort Zone", icon: "HeartHandshake", description: "When you need me" },
  { id: "MUSIC_ROOM", label: "Music Room", icon: "Music", description: "Our playlist" },
] as const;

export type ModalType = typeof menuItems[number]["id"] | "SECRET" | null;
