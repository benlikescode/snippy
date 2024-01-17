# Snippy Web App

This is the web app that connects to the Snippy VS Code extension.

## 💻 Steps to run locally

1. Create a .env file in the root of the `web` folder with the values below:

```
DATABASE_URL=

# From your GitHub OAuth app
GITHUB_ID=
GITHUB_SECRET=

# You can generate a random secret with: "openssl rand -base64 32"
NEXTAUTH_SECRET=
NEXTAUTH_URL="http://localhost:3000"
```

Next, you can install the required dependencies and start the local dev server:

```
yarn
yarn dev
```

Now, you should be able to see the site running locally at [http://localhost:3000](http://localhost:3000)

## 🚀 Tech Stack

- ✅ **Framework**: [Nextjs (server components & actions)](https://nextjs.org)
- ✅ **Auth**: [Next-Auth.js](https://next-auth.js.org)
- ✅ **Database**: [PlanetScale](https://planetscale.com/).
- ✅ **ORM**: [Prisma](https://www.prisma.io/).
- ✅ **Styling**: [Tailwind CSS](https://tailwindcss.com/).
- ✅ **Schema Validation**: [Zod](https://github.com/colinhacks/zod).
