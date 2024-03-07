# Next App Template

This project is a comprehensive template for building web applications using Next.js, styled with Tailwind CSS, featuring Shadcn as a component library, MongoDB for database management, Uploadthing for data storage and Clerk for user authentication.

You can try it on:
[https://next-fikasp.vercel.app/](https://next-fikasp.vercel.app/)

## Technologies

- **Next.js** - React Framework
- **Tailwind CSS** - Application styling
- **Shadcn/UI** - Components library
- **MongoDB** - Database
- **Uploadthing** - Data storage
- **Clerk** - User authentication

## Project structure

- `/public` - Static files
- `/src` - Source files of the application
  - `/app` - Application routing
    - `/api` - API routes
    - `globals.css` - Global CSS styles
  - `/components` - Reusable UI components
  - `/database` - Database-related files and models for MongoDB
  - `/lib` - Shared utility functions and library integrations
- `next.config.js` - Configuration file for Next.js
- `tailwind.config.js` - Tailwind CSS configuration
- `package.json` - Lists project metadata and dependencies
- `README.md` - Documentation of the project

## Quick start

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

**Cloning the Repository**

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

Create a new file named `.env.locla` in the root of your project and add the following content:

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

Replace the placeholder values with your actual credentials 

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Usage

This template serves as a scalable starting point for your web applications. 

Customize the components, pages, and styles to your project's requirements. Implement custom authentication flows with Clerk and manage data efficiently with MongoDB and Uploadthing.



## Contact
For more information please contact [fikasp@gmail.com](mailto:fikasp@gmail.com).
