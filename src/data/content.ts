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
  imageUrl?: string;
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

export const RECIPIENT_NAME = "babi";

export const letters: Letter[] = [
  {
    id: 1,
    title: "M — Mahalaga",
    date: "M",
    icon: "Mail",
    body: "Minsan naiisip ko kung gaano ka na naging mahalaga sa akin nang hindi ko namamalayan. Sa dami ng tao sa mundo, ikaw yung taong gusto kong makausap kapag may gusto akong ikwento, kapag may random akong naiisip, o kahit kapag gusto ko lang may makasama sa tahimik na gabi. Hindi mo siguro alam, pero may mga pagkakataon na hinihintay ko talaga yung message mo. Yung simpleng notification mula sayo, bigla na lang nagpapagaan ng araw ko. Hindi man natin masabi kung saan ito papunta, pero isang bagay ang sigurado ako, mahalaga ka sa akin, higit pa sa iniisip mo at mahal na mahal kita.",
  },
  {
    id: 2,
    title: "A — Alaga",
    date: "A",
    icon: "HeartHandshake",
    body: "Ang sarap sa pakiramdam na may isang taong kahit malayo, marunong pa ring mag-alaga sa simpleng paraan. Yung mga tanong na \"how are you?\", \"kumain ka na?\" Maaaring maliit na bagay lang siya para sa iba, pero para sa akin, malaking bagay na may isang taong nag-aalala at nagmamalasakit. At gusto ko ring iparamdam sayo na nandito rin ako para sayo. Sa mga araw na masaya ka, sa mga araw na pagod ka, o kahit sa mga oras na gusto mo lang ng kausap. Kahit hindi tayo magkasama sa personal, gusto kong maramdaman mo na may taong nag-aalaga sayo kahit sa simpleng paraan lang.",
  },
  {
    id: 3,
    title: "H — Hanggang",
    date: "H",
    icon: "Moon",
    body: "Hanggang ngayon, ikaw pa rin yung taong gusto kong kausap kapag tahimik ang gabi at marami akong iniisip. May kakaibang comfort sa pakikipag-usap sayo parang kahit anong sabihin ko, alam kong makikinig ka. Kahit simpleng kwento lang tungkol sa araw ko, nagiging mas espesyal kapag ikaw yung kausap ko. Hindi ko alam kung paano nangyari, pero dumating sa punto na naging parte ka na ng araw ko. Yung tipong kapag hindi tayo nag-uusap, parang may kulang.\nAt hanggang ngayon, masaya ako na nandito ka pa rin.",
  },
  {
    id: 4,
    title: "A — Araw",
    date: "A",
    icon: "Sun",
    body: "May mga araw na ordinaryo lang talaga, walang masyadong nangyayari, pare-pareho lang ang routine. Pero minsan, isang message lang mula sayo, bigla na lang nagbabago yung pakiramdam ng araw ko.\nYung simpleng usapan, tawanan, o kahit yung mga random na topic natin, nagiging dahilan kung bakit mas nagiging magaan ang lahat.",
  },
  {
    id: 5,
    title: "L — Lagi",
    date: "L",
    icon: "Heart",
    body: "Hindi ko man alam kung ano ang dadalhin ng panahon para sa atin, pero alam ko kung ano ang nararamdaman ko ngayon.\nMasaya ako na nakilala kita. Masaya ako na ikaw yung taong nakakausap ko sa araw-araw at minamahal ko palagi. Sa dami ng bagay na pwedeng magbago sa mundo, gusto kong manatiling totoo sa isang bagay na lagi kitang pahahalagahan, lagi kitang pakikinggan, at lagi kitang pipiliin kausapin.\nAt habang nandito tayo, habang may pagkakataon pa tayong mag-usap at magkwentuhan, gusto ko lang sabihin na lagi kitang pinapahalagahan.",
  },
];

export const milestones: Milestone[] = [
  {
    id: 1,
    date: "First Message / First Interaction",
    title: "The message that started everything…",
    description:
      "Isang simpleng message lang, pero yun pala yung unang hakbang para makilala kita at magsimula yung kwento natin.",
    icon: "MessageCircle",
    imageUrl: "/first-convo.jpg",
  },
  {
    id: 2,
    date: "When We Started Talking A Lot",
    title: "From strangers to someone I talk to every day.",
    description:
      "Unti-unti, naging normal na sa araw ko yung kausapin ka. Parang may kulang kapag hindi tayo nag-uusap.",
    icon: "MessagesSquare",
  },
  {
    id: 3,
    date: "First Time We Stayed Up Late Talking",
    title: "The night I realized I could talk to you for hours.",
    description:
      "Hindi ko namalayan yung oras habang nag-uusap tayo. Doon ko narealize na ang gaan mo kausap at ayoko pang matapos yung conversation natin.",
    icon: "Moon",
  },
  {
    id: 4,
    date: "When I Realized I Like You",
    title: "Somewhere between our conversations, I realized you became my favorite person.",
    description:
      "Somewhere between our conversations and laughs, napansin ko na hindi na lang basta friendship yung nararamdaman ko sayo.",
    icon: "Heart",
  },
  {
    id: 5,
    date: "When I Started Falling For You",
    title: "What started as a simple hello slowly turned into feelings I can't hide anymore.",
    description:
      "Hindi ko man agad napansin, pero unti-unti pala akong nahuhulog sayo sa paraan ng pag-usap mo, sa kung paano mo pinapasaya yung araw ko, at sa kung paano ka naging mahalaga sa akin.",
    icon: "Sparkles",
  },
];

export const playlist: Track[] = [
  { id: 1, title: "About You", artist: "The 1975", icon: "Music", src: "/songs/The 1975 - About You (Official).mp3" },
  { id: 2, title: "Kahel na Langit", artist: "Maki", icon: "Disc3", src: "/songs/Kahel na Langit - Maki (Official Music Video).mp3" },
  { id: 3, title: "The Night We Met", artist: "Lord Huron", icon: "Moon", src: "/songs/Lord Huron - The Night We Met (Official Audio).mp3" },
  { id: 4, title: "Space Song", artist: "Beach House", icon: "Hourglass", src: "/songs/Beach House - Space Song (Lyrics).mp3" },
  { id: 5, title: "Falling for You", artist: "The 1975", icon: "Music2", src: "/songs/The 1975 - fallingforyou.mp3" },
  { id: 6, title: "I Wanna Be Yours", artist: "Arctic Monkeys", icon: "Music3", src: "/songs/I Wanna Be Yours.mp3" },
  { id: 7, title: "Yellow", artist: "Coldplay", icon: "Sun", src: "/songs/%40coldplay%20-%20Yellow%20(Lyrics).mp3" },
  { id: 8, title: "Tahanan", artist: "El Manu", icon: "Music", src: "/songs/El Manu - Tahanan (Lyrics).mp3" },
  { id: 9, title: "Ikaw Lang", artist: "Nobita", icon: "Disc3", src: "/songs/NOBITA - IKAW LANG (Lyrics).mp3" },
  { id: 10, title: "Libung-libong Buwan", artist: "Kyle Raphael", icon: "Moon", src: "/songs/Kyle Raphael - Libu-libong buwan (uuwian) (Official Lyric Video).mp3" },
];

export const comfortScenarios: ComfortScenario[] = [
  {
    id: "sad",
    title: "If You're Sad",
    icon: "HeartHandshake",
    message:
      "Hey, it's okay to not be okay. I'm right here with you, always. Take a deep breath. You are stronger than you think, braver than you feel, and loved more than you'll ever know.",
    submessage:
      "Close your eyes. Imagine me holding you tight. Because even when I'm not there physically, my babi wraps around you like a warm blanket.",
    trackId: 3,
  },
  {
    id: "sleep",
    title: "Can't Sleep?",
    icon: "Moon",
    message:
      "Shhh... it's okay. Let go of today's worries. Tomorrow is a brand new page, and tonight, you just need to rest. I'll be here when you wake up.",
    submessage:
      "Imagine we're lying under the stars, counting them one by one until your eyes get heavy... 3... 2... 1... goodnight, my babi.",
    trackId: 6,
  },
  {
    id: "bad-day",
    title: "Bad Day?",
    icon: "Sun",
    message:
      "Bad days don't last, but we do. Whatever happened today doesn't define you. You're amazing, resilient, and so incredibly loved. Tomorrow will be better, I promise.",
    submessage:
      "Remember: even the rainiest days end with the most beautiful sunsets. And you? You're my sunrise every single morning.",
    trackId: 7,
  },
];

export const secretMessage = {
  title: "You Found the Secret!",
  message:
    "This hidden corner is just for you — my favorite human in the entire universe. No matter where life takes us, no matter what challenges we face, know this: you are my greatest adventure, my safest home, and my most beautiful dream come true. I love you to the moon, around all the stars, and back again. Forever yours.",
};

export const menuItems = [
  { id: "OUR_STORY", label: "Our Story", icon: "BookOpen", description: "The Start of Us" },
  { id: "LETTERS", label: "Letters", icon: "Mail", description: "Words from my heart" },
  { id: "COMFORT_ZONE", label: "Comfort Zone", icon: "HeartHandshake", description: "When you need me" },
  { id: "MUSIC_ROOM", label: "Music Room", icon: "Music", description: "Our playlist" },
] as const;

export type ModalType = (typeof menuItems)[number]["id"] | "SECRET" | null;
