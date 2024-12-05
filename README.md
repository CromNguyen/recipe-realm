# RecipeRealm - Modern Recipe Management Platform

RecipeRealm is a full-stack web application built with Next.js 14, allowing users to create, share, and discover recipes in a modern, intuitive interface.

## 🚀 Features

- **Recipe Management**
  - Create and edit recipes with step-by-step instructions
  - Upload recipe images
  - Track cooking time and servings
  - Organize recipes by cuisines
  - Draft and publish workflow

- **Social Features**
  - Like and save favorite recipes
  - Browse community recipes
  - Advanced recipe search and filtering

- **User Experience**
  - Responsive design
  - Real-time updates
  - Optimistic UI updates
  - Loading states and animations
  - Multi-step form wizard

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form & Zod
- **Image Storage**: Vercel Blob
- **Deployment**: Vercel


## 🔒 Authentication

Authentication is handled by Clerk, providing:
- Email/password authentication
- Social login providers
- User profile management
- Session handling

## 💾 Database Schema

Key models include:
- Recipe
- Ingredient
- Instruction
- Cuisine
- Favorite

Refer to `prisma/schema.prisma` for the complete schema.

## 🎯 Future Improvements

- [ ] Recipe sharing functionality
- [ ] User profiles and following system
- [ ] Recipe comments and ratings
- [ ] Shopping list generation
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [TanStack Query](https://tanstack.com/query)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
