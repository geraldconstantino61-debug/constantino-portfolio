# Black & White E-Portfolio (ReactJS + Tailwind CSS)

DCIT 26 Midterm Laboratory.

## Edit your info
Open `src/data.js` and replace the placeholders (name, email, projects, resume, socials).
Palitan din ang `public/profile.png` kung gusto mo ng ibang photo.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
```

## Deploy to Vercel
1. Rename this folder to your **last name**, push it to a GitHub repository.
2. Go to vercel.com -> Add New -> Project -> import the repo (Framework preset: Vite, no other settings needed).
3. Click Deploy, then open the Vercel URL and test before submitting.

## Features
- Sections: Home, About Me, Projects, Resume/CV, Contact (with navbar + active link)
- useState: mobile menu, project View more/less, project filter, resume tabs, contact form
- Form validation (name, email format, message length) with success message
- Download CV (PDF) button, back-to-top button, Tailwind fade-in animations and hover transitions
- Fully responsive, black & white only
