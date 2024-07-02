# Next App Template

## Introduction

This project is a comprehensive template for building web applications using Next.js, styled with Tailwind CSS, featuring Shadcn as a component library, MongoDB for database management, Uploadthing for data storage and Clerk for user authentication.

You can try it out here: **[https://next-fikasp.vercel.app](https://next-fikasp.vercel.app)**

## Technologies

- **[Node.js](https://nodejs.org/en/docs/)** - JavaScript runtime environment for executing server-side code.
- **[Next.js](https://nextjs.org/docs)** - React framework for building efficient and scalable web applications.
- **[TypeScipt](https://www.typescriptlang.org/docs/)** - Typed superset of JavaScript for building maintainable applications.
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first CSS framework for building custom designs with ease.
- **[Shadcn/UI](https://ui.shadcn.com/docs)** - Comprehensive components library for building modern user interfaces.
- **[MongoDB](https://docs.mongodb.com/)** - NoSQL database for flexible and scalable data storage solutions.
- **[Uploadthing](https://docs.uploadthing.com/)** - Convenient data storage service for easily integrating file upload.
- **[Clerk](https://clerk.com/docs)** - User authentication service for seamless and secure authentication.

## Features

- **Scalable Architecture**: Built on Next.js, the project provides a scalable architecture that supports server-side rendering (SSR), static site generation (SSG), and dynamic routing, ensuring optimal performance and user experience.

- **Tailwind CSS Styling**: Utilizing Tailwind CSS, the project offers a utility-first approach to styling, allowing for rapid development and customization of modern and responsive user interfaces.

- **Shadcn Components**: Leveraging Shadcn as a component library, the project includes a wide range of reusable UI components, facilitating the development of consistent and visually appealing interfaces.

- **MongoDB Integration**: Integrated with MongoDB, the project enables efficient management and storage of data in a flexible and scalable NoSQL database, ensuring seamless data handling and retrieval.

- **Uploadthing Support**: With Uploadthing integration, the project simplifies the process of handling file uploads, providing secure and reliable data storage solutions for uploaded files.

- **Clerk Authentication**: Incorporating Clerk for user authentication, the project offers robust and secure authentication mechanisms, including login, registration, password reset, and account management functionalities.

## Structure

- `/public` - Static files
  - `/assets` - Images, fonts etc.
- `/src` - Source files of the application

  - `/app` - Application routing
    - `/(auth)` - Routes for authentication
    - `/(root)` - Routes for core application
    - `/api` - API routes
    - `favicon.ico` - Icon displayed in the browser
    - `layout.tsx` - Root application layout
  - `/components` - Reusable UI components
    - `/arw` - ARW components
    - `/cards` - Cards components
    - `/dialogs` - Dialogs components
    - `/forms` - Forms components
    - `/layout` - Layout-related components
    - `/lists` - Lists components
    - `/pages` - Components used in pages
    - `/shared` - Components used across multiple parts of the app
    - `/ui` - Components specific to the Shadcn library
  - `/lib` - Shared library
    - `/actions` - Server actions
    - `/constants` - Constant values
    - `/context` - Context for app
    - `/handlers` - Event handlers
    - `/models` - Database schemas
    - `/styles` - Global CSS and Tailwind styles
    - `/types` - TypeScript type definitions
    - `/utils` - Utility functions
  - `middleware.ts` - Authentication middleware for the Clerk
  - `navigation.ts` - Managing navigation routes and links

- `/` - Configurations files in root directory:

  - `.gitignore` - List of files to ignore by git
  - `components.json` - Shadcn components configuration
  - `next.config.js` - Configuration file for Next.js
  - `package.json` - Lists project metadata and dependencies
  - `postcss.config` - PostCSS configuration
  - `README.md` - Documentation of the project
  - `tailwind.config.js` - Tailwind CSS configuration
  - `tsconfig.json` - TypeScript configuration

## Setup

Follow these steps to set up the project locally.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

**Cloning the repository**

```bash
git clone https://github.com/fikasp/next-app.git
cd next-app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Setup Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
#MONGODB
MONGODB_URI=

#UPLOADTHING
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

#CLERK
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

Fill in the environmental variable values with your actual credentials.
You can obtain these credentials by signing up on the [MongoDB](https://www.mongodb.com/), [Uploadthing](https://uploadthing.com) and [Clerk](https://clerk.com/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Usage

This template serves as a scalable starting point for your web applications.

Customize the components, pages, and styles to your project's requirements. Implement custom authentication flows with Clerk and manage data efficiently with MongoDB and Uploadthing.

## More

For more information please contact [fikasp@gmail.com](mailto:fikasp@gmail.com).
