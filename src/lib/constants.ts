type Event = {
  title: string;
  image: string;
  slug: string;
  date: string;
  location: string;
  time: string;
};

export const events: Event[] = [
  {
    title: "Future Tech Conference 2026",
    image: "/images/event1.png",
    slug: "future-tech-conference-2026",
    date: "October 12, 2026",
    location: "Islamabad, Pakistan",
    time: "10:00 AM",
  },
  {
    title: "Pakistan Startup Summit",
    image: "/images/event2.png",
    slug: "pakistan-startup-summit",
    date: "October 18, 2026",
    location: "Lahore, Pakistan",
    time: "11:00 AM",
  },
  {
    title: "AI & Machine Learning Expo",
    image: "/images/event3.png",
    slug: "ai-machine-learning-expo",
    date: "October 25, 2026",
    location: "Karachi, Pakistan",
    time: "9:30 AM",
  },
  {
    title: "Web Development Workshop",
    image: "/images/event4.png",
    slug: "web-development-workshop",
    date: "November 2, 2026",
    location: "Peshawar, Pakistan",
    time: "2:00 PM",
  },
  {
    title: "Digital Marketing Conference",
    image: "/images/event5.png",
    slug: "digital-marketing-conference",
    date: "November 10, 2026",
    location: "Islamabad, Pakistan",
    time: "1:00 PM",
  },
  {
    title: "Developer Community Meetup",
    image: "/images/event6.png",
    slug: "developer-community-meetup",
    date: "November 20, 2026",
    location: "Rawalpindi, Pakistan",
    time: "5:00 PM",
  },
];
