import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  devbrains,
  bytebunch,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  php,
  mysql,
  mui,
  wordpress,
  elementor,
  byteBunch,
  bytebunchBlog,
  devBrains,
  barberShop,
  byteKiDuniya,
  meharHerbals,
  trackomatric,
  warraichTraders,
  waveslines,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Designer",
    icon: web,
  },
  {
    title: "Web Developer",
    icon: mobile,
  },
  {
    title: "Frontend Developer",
    icon: creator,
  },
  {
    title: "Wordpress Developer",
    icon: backend,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "Wordpress",
    icon: wordpress,
  },
  {
    name: "Elementor",
    icon: elementor,
  },
  {
    name: "PHP",
    icon: php,
  },
  {
    name: "MySql",
    icon: mysql,
  },
  {
    name: "Material UI",
    icon: mui,
  },
];

const experiences = [
  {
    title: "Web Designer",
    company_name: "ByteBunch",
    icon: bytebunch,
    iconBg: "#383E56",
    date: "Sep 2021 - Dec 2021",
    points: [
      "Developed and maintained websites using HTML5, CSS3, and Bootstrap5.",
      "Collaborated with cross-functional teams including designers and product managers to create high-quality products.",
      "Implemented responsive design and ensured cross-browser compatibility.",
      "Worked with WordPress and Elementor for website development.",
    ],
  },
  {
    title: "WordPress Developer",
    company_name: "ByteBunch",
    icon: bytebunch,
    iconBg: "#383E56",
    date: "Jan 2022 - Aug 2023",
    points: [
      "Developed custom WordPress themes and plugins.",
      "Worked extensively with PHP and MySQL for backend development.",
      "Collaborated with cross-functional teams to deliver optimized WordPress solutions.",
      "Ensured website performance, security, and responsiveness.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "DevBrains",
    icon: devbrains,
    iconBg: "#E6DEDD",
    date: "Aug 2023 - Present",
    points: [
      "Developed and maintained web applications using HTML5, CSS3, Bootstrap5, and React.js.",
      "Worked with Next.js, Recoil.js, and Material UI for creating dynamic and scalable front-end interfaces.",
      "Implemented GraphQL for efficient data fetching.",
      "Collaborated with designers and backend developers to create seamless user experiences.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "DevBrains",
    icon: devbrains,
    iconBg: "#E6DEDD",
    date: "May 2024 - Present",
    points: [
      "Developing full-stack web applications using React.js, Next.js, and Node.js.",
      "Working with Recoil.js and Material UI to build dynamic user interfaces.",
      "Handled backend development using Nest.js and MongoDB.",
      "Integrated GraphQL for managing complex data queries and mutations.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "ByteBunch",
    description:
      "ByteBunch is an IT Services Provider Company that provides many services like Web Development, Graphic development, and many more.",
    tags: [
      {
        name: "html5",
        color: "blue-text-gradient",
      },
      {
        name: "css3",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap5",
        color: "pink-text-gradient",
      },
      {
        name: "wordpress",
        color: "blue-text-gradient",
      },
      {
        name: "php",
        color: "green-text-gradient",
      },
      {
        name: "mysql",
        color: "pink-text-gradient",
      },
    ],
    image: byteBunch,
    source_code_link: "https://github.com/",
    source_link: "https://amiraliliaqat.github.io/ByteBunch-Html/",
  },
  {
    name: "ByteBunch Blog",
    description:
      "ByteBunch Blog is the blogging site for ByteBunch IT services provider company to aware the peoples with latest information and updates.",
    tags: [
      {
        name: "html5",
        color: "blue-text-gradient",
      },
      {
        name: "css3",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap5",
        color: "pink-text-gradient",
      },
      {
        name: "wordpress",
        color: "blue-text-gradient",
      },
      {
        name: "php",
        color: "green-text-gradient",
      },
      {
        name: "mysql",
        color: "pink-text-gradient",
      },
    ],
    image: bytebunchBlog,
    source_code_link: "https://github.com/",
    source_link: "https://amiraliliaqat.github.io/Test-ByteBunch-Html/",
  },
  {
    name: "Byte Ki Duniya",
    description:
      "Byte Ki Duniya is an IT services provider company that provides all the ultimate solutions for your business.",
    tags: [
      {
        name: "html5",
        color: "blue-text-gradient",
      },
      {
        name: "css3",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap5",
        color: "pink-text-gradient",
      },
      {
        name: "wordpress",
        color: "blue-text-gradient",
      },
      {
        name: "php",
        color: "green-text-gradient",
      },
      {
        name: "mysql",
        color: "pink-text-gradient",
      },
    ],
    image: byteKiDuniya,
    source_code_link: "https://github.com/",
    source_link: "http://byte.likesyou.org/",
  },
  {
    name: "DevBrains",
    description:
      "DevBrains is an IT Services Provider Company that provides many services like Web Development, Graphic development, and many more.",
    tags: [
      {
        name: "wordpress",
        color: "blue-text-gradient",
      },
      {
        name: "elementor",
        color: "green-text-gradient",
      },
      {
        name: "react",
        color: "pink-text-gradient",
      },
    ],
    image: devBrains,
    source_code_link: "https://github.com/",
    source_link: "http://devbrains.likesyou.org/",
  },
  {
    name: "Warraich Traders",
    description:
      "Warriach Traders is the housing society management system that is used for buying houses and managing houses materials.",
    tags: [
      {
        name: "html5",
        color: "blue-text-gradient",
      },
      {
        name: "css3",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap5",
        color: "pink-text-gradient",
      },
      {
        name: "wordpress",
        color: "blue-text-gradient",
      },
      {
        name: "php",
        color: "green-text-gradient",
      },
      {
        name: "mysql",
        color: "pink-text-gradient",
      },
      {
        name: "react",
        color: "green-text-gradient",
      },
    ],
    image: warraichTraders,
    source_code_link: "https://github.com/",
    source_link: "https://warraich-traders-react.vercel.app/",
  },
  {
    name: "Mehar Herbals",
    description:
      "Mehar Herbals is an ecommerce site providing various variaty of herbals products to fullfill your herbal needs.",
    tags: [
      {
        name: "html5",
        color: "blue-text-gradient",
      },
      {
        name: "css3",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap5",
        color: "pink-text-gradient",
      },
      {
        name: "wordpress",
        color: "blue-text-gradient",
      },
      {
        name: "php",
        color: "green-text-gradient",
      },
      {
        name: "woocommerce",
        color: "pink-text-gradient",
      },
    ],
    image: meharHerbals,
    source_code_link: "https://github.com/",
    source_link: "http://meharherbals.likesyou.org/",
  },
  {
    name: "Trackomatric",
    description:
      "Trakomatic is an artificial intelligence system for detacking security activites at large scale and shopping malls.",
    tags: [
      {
        name: "html5",
        color: "blue-text-gradient",
      },
      {
        name: "css3",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap5",
        color: "pink-text-gradient",
      },
    ],
    image: trackomatric,
    source_code_link: "https://github.com/",
    source_link: "https://amiraliliaqat.github.io/Trackomatric/",
  },
  {
    name: "Barber Shop",
    description:
      "Complate and responseive barber shop template using mern stack with good and attractive user experience and user interface.",
    tags: [
      {
        name: "html5",
        color: "blue-text-gradient",
      },
      {
        name: "css3",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap5",
        color: "pink-text-gradient",
      },
      {
        name: "react",
        color: "blue-text-gradient",
      },
    ],
    image: barberShop,
    source_code_link: "https://github.com/",
    source_link: "https://barber-shop-tau-three.vercel.app/",
  },
  {
    name: "Waveslines",
    description:
      "Waveslines is an ecommerce services provider company which can offers products of all seasons and vatities.",
    tags: [
      {
        name: "wordpress",
        color: "blue-text-gradient",
      },
      {
        name: "elementor",
        color: "green-text-gradient",
      },
    ],
    image: waveslines,
    source_code_link: "https://github.com/",
    source_link: "https://weavelinens.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
