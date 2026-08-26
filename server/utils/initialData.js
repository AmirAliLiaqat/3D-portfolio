export const initialProfileDetails = {
  name: "Amir Ali Liaqat",
  shortName: "Amir Ali",
  role: "Dedicated Front-End Developer",
  designations: [
    "Web Designer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "IT Instructor",
  ],
  description:
    "I'm a Full Stack Software Engineer with over 4 years of experience building modern web and mobile applications. Currently, I work at DevBrains Software House, where I develop scalable, high-performance solutions using technologies such as React.js, Next.js, TypeScript, Node.js, Express.js, MongoDB, and React Native. I enjoy creating responsive user interfaces, designing robust backend APIs, and delivering seamless end-to-end applications with clean, maintainable code.",
  about:
    "I'm passionate about solving real-world problems through modern development practices and continuously expanding my technical expertise. I thrive in collaborative environments, value writing efficient and reusable code, and focus on building secure, scalable, and user-centric products that provide exceptional user experiences across web and mobile platforms.",
};

export const initialCompanyDetails = {
  name: "Designs To Deploy",
  tagline: "DESIGN • DEVELOP • DEPLOY • DELIVER",
  shortDescription:
    "Full-service software agency transforming innovative ideas into production-ready web, mobile, and digital experiences.",
  fullDescription:
    "Designs To Deploy is a premier software development and digital solutions company. We specialize in end-to-end digital transformation—from initial UI/UX design concepts and full-stack software development to automated cloud deployment and continuous post-launch delivery. Built with a vision for engineering excellence, we empower startups and enterprises with high-performance scalable solutions.",
  website: "https://www.designstodeploy.dev/",
  email: "designstodeploy@gmail.com",
  phone: "+92 309 0886518",
  whatsapp: "https://wa.me/923090886518",
  location: "Lahore, Pakistan",
  logoSquare: "/assets/company/designstodeploy-square.png",
  logoBanner: "/assets/company/designstodeploy-banner.png",
  socials: [
    {
      name: "Facebook",
      link: "https://www.facebook.com/designstodeploy",
      icon: "fa-brands fa-facebook",
      color: "#1877F2",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/designs.to.deploy/",
      icon: "fa-brands fa-instagram",
      color: "#E4405F",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/designstodeploy",
      icon: "fa-brands fa-linkedin",
      color: "#0A66C2",
    },
    {
      name: "Website",
      link: "https://www.designstodeploy.dev/",
      icon: "fa-solid fa-globe",
      color: "#915EFF",
    },
    {
      name: "Email",
      link: "mailto:designstodeploy@gmail.com",
      icon: "fa-solid fa-envelope",
      color: "#EA4335",
    },
    {
      name: "WhatsApp",
      link: "https://wa.me/923090886518",
      icon: "fa-brands fa-whatsapp",
      color: "#25D366",
    },
  ],
  pillars: [
    {
      title: "Design",
      icon: "fa-solid fa-pen-ruler",
      description: "Crafting intuitive, modern UI/UX interfaces and distinctive visual identities.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Develop",
      icon: "fa-solid fa-code",
      description: "Engineering robust, scalable web and mobile software with clean maintainable code.",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      title: "Deploy",
      icon: "fa-solid fa-rocket",
      description: "Automating cloud infrastructure, CI/CD pipelines, and high-availability hosting.",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "Deliver",
      icon: "fa-solid fa-paper-plane",
      description: "Providing on-time project execution, rigorous QA, and dedicated ongoing support.",
      gradient: "from-pink-600 to-indigo-600",
    },
  ],
};

export const initialServices = [
  {
    title: "Web Designing",
    category: "Design",
    description: "Creating visually attractive, user-friendly, and responsive website layouts.",
    icon: "fa-solid fa-paintbrush",
  },
  {
    title: "Frontend Development",
    category: "Development",
    description: "Building dynamic and interactive interfaces using modern frameworks like React and Next.js.",
    icon: "fa-solid fa-code",
  },
  {
    title: "Backend Development",
    category: "Development",
    description: "Architecting secure, scalable server-side applications, REST APIs, and database schemas.",
    icon: "fa-solid fa-server",
  },
  {
    title: "MERN Stack Development",
    category: "Fullstack",
    description: "Delivering end-to-end full-stack applications with MongoDB, Express, React, and Node.js.",
    icon: "fa-solid fa-[#915EFF] fa-layer-group",
  },
];

export const initialExperiences = [
  {
    title: "Frontend Developer",
    company_name: "DevBrains",
    icon: "/assets/company/devbrains.png",
    iconBg: "#E6DEDD",
    date: "Aug 2023 - June 2026",
    points: [
      "Developed and maintained web applications using HTML5, CSS3, Bootstrap5, and React.js.",
      "Worked with Next.js, Recoil.js, and Material UI for creating dynamic interfaces.",
      "Implemented GraphQL for efficient data fetching.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "DevBrains",
    icon: "/assets/company/devbrains.png",
    iconBg: "#E6DEDD",
    date: "June 2026 - Present",
    points: [
      "Developing full-stack web applications using React.js, Next.js, and Node.js.",
      "Handled backend development using Nest.js with MongoDB & PostgreSQL.",
      "Integrated GraphQL for managing complex data queries.",
    ],
  },
];

export const initialEducation = [
  {
    school: "Lahore Leads University, Lahore",
    degree: "Bachelor of Computer Science",
    date: "Nov 2022 - Nov 2026",
    grade: "3.95 CGPA",
    desc: "Completed coursework in Data Structures, Algorithms, OOP, Database Management Systems, and Web Technologies.",
    iconBg: "#383E56",
    img: "/assets/education/computerScience.png",
  },
];

export const initialProjects = [
  {
    name: "Designs To Deploy Agency Platform",
    description: "Official software agency portfolio and digital service portal built for Designs To Deploy.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "node", color: "green-text-gradient" },
      { name: "mongodb", color: "pink-text-gradient" },
    ],
    image: "/assets/company/designstodeploy-banner.png",
    source_code_link: "https://github.com/AmirAliLiaqat",
    live_link: "https://www.designstodeploy.dev/",
    category: "Fullstack",
  },
];

export const initialBlogs = [
  {
    id: 1,
    title: "Building Scalable Modern Web Applications in 2026",
    excerpt: "Best practices and architectural patterns for engineering high-performance web applications.",
    content: "Full guide on building scalable applications using React, Next.js, Node.js, and MongoDB...",
    image: "/assets/company/designstodeploy-banner.png",
    date: "August 2026",
    readTime: "5 min read",
    tags: ["React", "NodeJS", "MongoDB"],
    category: "Development",
    author: {
      name: "Amir Ali Liaqat",
      role: "Software Engineer & Agency Founder",
    },
  },
];

export const initialTestimonials = [
  {
    testimonial: "Designs To Deploy delivered our application with outstanding speed, code quality, and pixel-perfect design.",
    name: "DevBrains Team",
    designation: "Software Lead",
    company: "DevBrains",
    image: "/assets/company/devbrains.png",
  },
];
