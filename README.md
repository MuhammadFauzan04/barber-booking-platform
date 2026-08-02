# Cartenz Barbershop

Frontend UI prototype for a 5-branch barbershop reservation app: capster
portfolios, a quiz-driven "usap kaca" capster match, booking flow, points &
vouchers, payment, and an in-store check-in journey.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Project structure

```
src/
  App.jsx            top-level state + page routing
  main.jsx           Vite/React entry point
  index.css          global styles & CSS variables
  components/        shared UI building blocks (Navbar, Footer, cards, the
                     glass-wipe capster match experience, testimonial wall,
                     FAQ, etc.)
  pages/             one file per full page/screen (Home, ServicesPage,
                     CapstersPage, the booking flow, profile, history, points)
  data/              mock data (branches, capsters, services, testimonials...)
  hooks/             small reusable hooks (count-up, magnetic hover, in-view)
  utils/             tiny formatting helpers
```

## Build

```bash
npm run build
```

Outputs a production build to `dist/`.
