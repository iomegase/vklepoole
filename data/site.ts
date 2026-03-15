import type { SiteContent } from "@/lib/site/types";

export const siteSeedData: SiteContent = {
  pages: [
    {
      key: "home",
      label: "Home",
      title: "Victor Le Poole",
      content:
        "Photographe et réalisateur d'instants rares.\nUn portfolio fullscreen pensé comme une traversée sensible, entre lumière, rythme et présence.",
      imageUrl:
        "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/couple.jpg",
    },
    {
      key: "events",
      label: "Events",
      title: "Events that keep their pulse",
      content:
        "Des reportages immersifs, pensés pour la scène, le mouvement et la densité d’un moment vécu.\nChaque série reste lisible, élégante et profondément humaine.",
      imageUrl:
        "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/landscapes/girl-urban-view.jpg",
    },
    {
      key: "video",
      label: "Video",
      title: "Moving images with restraint",
      content:
        "Une écriture visuelle sobre, cinématographique et précise.\nLe cadre reste au service du rythme, de l’atmosphère et de la matière.",
      imageUrl:
        "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/landscapes/nature-mountains.jpg",
    },
    {
      key: "mariage",
      label: "Mariage",
      title: "Mariages, sans folklore",
      content:
        "Des images faites pour durer.\nLe reportage privilégie la justesse, la tension discrète et l’émotion non forcée.",
      imageUrl:
        "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/people/jazz.jpg",
    },
    {
      key: "contact",
      label: "Contact",
      title: "Parlons du prochain projet",
      content:
        "Basé en France, disponible pour les commandes éditoriales, marques, événements et mariages.\nÉcrivez avec quelques lignes sur le contexte, la date et l’intention.",
      imageUrl:
        "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/landscapes/beach-boat.jpg",
    },
  ],
  menuItems: [
    { id: "menu-home", label: "Home", target: "home", order: 0 },
    { id: "menu-events", label: "Events", target: "events", order: 1 },
    { id: "menu-video", label: "Video", target: "video", order: 2 },
    { id: "menu-mariage", label: "Mariage", target: "mariage", order: 3 },
    { id: "menu-contact", label: "Contact", target: "contact", order: 4 },
  ],
  galleries: [
    {
      id: "gallery-events",
      name: "Afterglow",
      assignedPage: "events",
      items: [
        {
          id: "gallery-events-1",
          title: "Crowd heat",
          subtitle: "Paris, late set",
          mediaUrl:
            "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/people/bicycle.jpg",
          mediaType: "image",
          order: 0,
        },
        {
          id: "gallery-events-2",
          title: "Stage edge",
          subtitle: "Blue hour, live room",
          mediaUrl:
            "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/people/smiling-man.jpg",
          mediaType: "image",
          order: 1,
        },
      ],
    },
    {
      id: "gallery-video",
      name: "Motion Studies",
      assignedPage: "video",
      items: [
        {
          id: "gallery-video-1",
          title: "Sequence one",
          subtitle: "Cloudinary demo asset",
          mediaUrl:
            "https://res.cloudinary.com/demo/video/upload/f_auto,q_auto/dog.mp4",
          mediaType: "video",
          order: 0,
        },
        {
          id: "gallery-video-2",
          title: "Frame still",
          subtitle: "Companion visual",
          mediaUrl:
            "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/animals/three-dogs.jpg",
          mediaType: "image",
          order: 1,
        },
      ],
    },
    {
      id: "gallery-mariage",
      name: "Quiet vows",
      assignedPage: "mariage",
      items: [
        {
          id: "gallery-mariage-1",
          title: "Ceremony hush",
          subtitle: "Before the aisle",
          mediaUrl:
            "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/couple.jpg",
          mediaType: "image",
          order: 0,
        },
        {
          id: "gallery-mariage-2",
          title: "Golden exit",
          subtitle: "Light on stone",
          mediaUrl:
            "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/samples/people/kitchen-bar.jpg",
          mediaType: "image",
          order: 1,
        },
      ],
    },
  ],
};
