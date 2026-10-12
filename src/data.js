// ✏️ EDIT THIS FILE ONLY — palitan ang lahat ng placeholder ng sarili mong info.
export const profile = {
  name: 'John EarlGerald L. Constantino',
  role: 'IT Student · Aspiring Web Developer',
  tagline: 'I build clean, simple and useful things for the web.',
  photo: '/profile.png',
  email: 'geraldconstantino61@gmail.com',
  location: 'Tanza, Cavite, Philippines',
  intro:
    'Hi! I am a student from the Department of Information Technology at Cavite State University – Tanza Campus. I enjoy turning ideas into working websites using ReactJS and Tailwind CSS.',
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  background:
    'I am a student taking up Information Technology at Cavite State University – Tanza Campus. I like learning how websites are built, from the layout you see to the logic behind it. Outside of school, I enjoy exploring new tools, designing simple interfaces, and learning something new every week.',
  facts: [
    { label: 'Based in', value: 'Tanza, Cavite' },
    { label: 'Studying', value: 'Information Technology' },
    { label: 'Focus', value: 'Front-end Development' },
    { label: 'Status', value: 'Open to learning & internships' },
  ],
  skills: [
    'HTML & CSS',
    'JavaScript',
    'ReactJS',
    'Tailwind CSS',
    'Git & GitHub',
  ],
  interests: ['Web Design', 'UI / UX', 'Photography', 'Music', 'Gaming', 'Learning new tech'],
}

export const projects = [
  {
    id: 1,
    title: 'Personal E-Portfolio',
    category: 'Web',
    year: '2026',
    summary: 'This website — a responsive portfolio built with React and Tailwind CSS.',
    details:
      'Built with reusable React components, useState for interactivity, form validation on the contact page and deployed on Vercel.',
    tech: ['React', 'Tailwind CSS', 'Vercel'],
    image: null,
  },
  {
    id: 2,
    title: 'To-Do List App',
    category: 'App',
    year: '2026',
    summary: 'A simple task manager where you can add, complete and delete tasks.',
    details:
      'Uses React state to manage the task list, conditional rendering for completed tasks, a filter for All / Active / Done, and saves your tasks in the browser.',
    tech: ['React', 'useState', 'Tailwind CSS'],
    image: null,
    demo: 'todo',
  },
  {
    id: 5,
    title: 'Calculator',
    category: 'App',
    year: '2026',
    summary: 'A working calculator that does addition, subtraction, multiplication and division.',
    details:
      'Built with React state (no eval): handles decimals, chained operations, percent, sign change, delete and divide-by-zero. Keyboard supported.',
    tech: ['React', 'useState', 'Event handling'],
    image: null,
    demo: 'calculator',
  },
  {
    id: 3,
    title: 'School Information System',
    category: 'Database',
    year: '2025',
    summary: 'A class project that stores and displays student records.',
    details:
      'Designed the database tables, created the forms for adding records and a page for searching students.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: null,
  },
  {
    id: 4,
    title: 'Landing Page Design',
    category: 'Design',
    year: '2025',
    summary: 'A mobile-first landing page concept for a local shop.',
    details:
      'Focused on typography, spacing and a clear call-to-action. Prototyped first, then coded.',
    tech: ['Figma', 'HTML', 'CSS'],
    image: null,
  },
]

export const resume = {
  education: [
    {
      title: 'Bachelor of Science in Information Technology',
      place: 'Cavite State University – Tanza Campus',
      period: '2023 – Present',
      note: 'Department of Information Technology',
    },
    {
      title: 'Senior High School',
      place: 'Your Senior High School',
      period: '2021 – 2023',
      note: 'Strand / Track here',
    },
  ],
  experience: [
    {
      title: 'Student Developer',
      place: 'School Projects & Laboratories',
      period: '2024 – Present',
      note: 'Built web projects using HTML, CSS, JavaScript and ReactJS.',
    },
    {
      title: 'Volunteer / Organization Member',
      place: 'Your Organization',
      period: '2024',
      note: 'Helped with tech support and event materials.',
    },
  ],
  skills: ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'Tailwind CSS', 'Git', 'GitHub', 'Vercel', 'Figma', 'Teamwork', 'Communication'],
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/geraldconstantino61-debug' },
]
