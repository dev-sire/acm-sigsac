# ACM SIGSAC DUET Chapter Website

The ACM SIGSAC DUET Chapter website serves as the official online presence for our student chapter at Dawood University of Engineering and Technology. It's designed to keep students informed about our activities, events, and opportunities in the field of security.

### Key Features

- **Event Registration:** Students can directly register for our upcoming events through the website.

- **Event Updates:** Stay updated on the latest events, workshops, and seminars organized by the chapter. 
- Information Hub: A central place for resources, news, and announcements related to cybersecurity and ACM SIGSAC.

- **Responsive Design:** The website is designed to be responsive and accessible on various devices (desktops, tablets, and smartphones).

### Tech Stack

This website is built using a modern and powerful technology stack:

**Frontend:**

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool that significantly improves the development experience.
- **Tailwind CSS:** A utility-first CSS framework for rapidly styling the website.
- **Shadcn/ui:** A collection of reusable components for React, styled with Tailwind CSS.

**Backend & Database:**

- **Supabase:** An open-source Firebase alternative, providing:
- **PostgreSQL:** A robust and reliable open-source relational database. 
- **Storage:** File storage for any necessary assets using uploadthings private cloud.

### Project Structure

```
📦 acm-sigsac
├─ .gitignore
├─ LICENSE
├─ README.md
├─ bun.lockb
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ candidates
│  │  ├─ aayesha.jpg
│  │  ├─ ammara.jpg
│  │  ├─ dean.jpg
│  │  ├─ hafsa.jpg
│  │  ├─ hod.jpg
│  │  ├─ my-profile.jpg
│  │  ├─ rabia.jpg
│  │  ├─ sofia.jpg
│  │  ├─ ubaid.jpg
│  │  ├─ usaiym.jpg
│  │  └─ wasay-2.jpg
│  ├─ circuit-pattern.svg
│  ├─ favicon.ico
│  ├─ logo.png
│  ├─ open-graph.png
│  ├─ placeholder.svg
│  └─ robots.txt
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ components
│  │  ├─ CollaboratorsSection.tsx
│  │  ├─ CountdownTimer.tsx
│  │  ├─ DemogoronRegistration.tsx
│  │  ├─ EventsSection.tsx
│  │  ├─ FileUpload.tsx
│  │  ├─ Footer.tsx
│  │  ├─ GallerySection.tsx
│  │  ├─ HackemonRegistration.tsx
│  │  ├─ HeroSection.tsx
│  │  ├─ LoadingScreen.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ RegistrationForm.tsx
│  │  ├─ ScrollToTop.tsx
│  │  ├─ SideAnimations.tsx
│  │  ├─ TeamSection.tsx
│  │  ├─ VisionSection.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ hooks
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  ├─ index.css
│  ├─ integrations
│  │  └─ supabase
│  │     ├─ client.ts
│  │     └─ types.ts
│  ├─ lib
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ AboutUs.tsx
│  │  ├─ Gallery.tsx
│  │  ├─ Index.tsx
│  │  ├─ NotFound.tsx
│  │  └─ Registration.tsx
│  ├─ utils
│  │  ├─ cursorTrail.ts
│  │  ├─ emailService.ts
│  │  └─ scrollReveal.ts
│  └─ vite-env.d.ts
├─ supabase
│  └─ configure.toml
├─ tailwind.config.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vercel.json
└─ vite.config.ts
```

Before setting up the project, ensure you have the following installed:

- Bun: (Version >= 1.0) You can download it from [Bun Docs](https://bun.sh/)
- Git: (For version control) You can download it from [Git](https://git-scm.com/)
- Supabase Account: You'll need a Supabase account to set up the database and backend services. Sign up at [Supabase](https://supabase.com/)

### Installation

Here's how to set up the project locally:

**1. Clone the repository:** 

```git clone https://github.com/dev-sire/acm-sigsac```

```cd acm-sigsac-duet-website```


**2. Install dependencies:** 

```bun install```

**3. Set up Supabase:**

- Create a new project on https://supabase.com/. 
- Obtain your Supabase URL and anonymous key from your project settings.
- Create the necessary database tables in your Supabase project, following the schema defined in this repository (if applicable). See the supabase.ts file for database connection.

**Configure environment variables:**

- Create a .env.local file in the project root.
- Add the following lines, replacing the values with your Supabase credentials:

```VITE_SUPABASE_URL=YOUR_SUPABASE_URL```

```VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY```

**4. Start the development server:** ```bun run dev```

The website will be accessible at ```http://localhost:8080```


### Contributing

We welcome contributions to improve the website! Here's how you can help:

- **Fork the repository:** Create your own copy of the project on GitHub.
- **Create a branch:** Make a new branch for your changes:

```git checkout -b feature/your-feature-name```

- **Make your changes:** Implement your feature, fix a bug, or improve the documentation.

- **Commit your changes:**

     ```git add . ```

     ```git commit -m "Add your feature"```

- **Push to your fork:**

     ```git push origin feature/your-feature-name```

- **Create a pull request:** Submit a pull request (PR) from your branch to the main branch of the original repository.

- **Review:** Your PR will be reviewed by the project maintainers.

**Please follow these guidelines when contributing:**

**Code style:** Follow the existing code style.

**Commit messages:** Write clear and concise commit messages.

**Testing:** If you're adding new features, include relevant tests.

**Documentation:** Update the documentation if you're making changes that affect it.

### License

This project is licensed under the ```Attribution-ShareAlike 4.0 International``` License.
