# UniConnect - AI-Powered University Student Platform

A comprehensive platform for university students to connect, learn, and grow together through community features, study materials sharing, teammate finding, AI-powered learning assistance, and residence matching.

## 🚀 Features

- **Community Hub**: Connect with students worldwide and share achievements
- **Teammate Finder**: Find perfect teammates for projects and hackathons
- **Study Materials**: Share and access quality study resources with AI recommendations
- **AI Study Assistant**: Get personalized help with your learning journey
- **Learning Dashboard**: Track progress with AI-generated quizzes and assessments
- **Residence Finder**: Find roommates and accommodation that matches your preferences

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend API
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd uniconnect-platform
\`\`\`

### 2. Install Frontend Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Install Backend Dependencies
\`\`\`bash
cd api
npm install
cd ..
\`\`\`

### 4. Environment Setup

Create `.env.local` in the root directory:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
\`\`\`

Create `api/.env`:
\`\`\`env
PORT=3001
NODE_ENV=development
\`\`\`

### 5. Start the Development Servers

**Terminal 1 - Backend API:**
\`\`\`bash
cd api
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
npm run dev
\`\`\`

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Health Check: http://localhost:3001/health

## 🏗️ Project Structure

\`\`\`
uniconnect-platform/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── community/         # Community hub
│   ├── teammates/         # Teammate finder
│   ├── study-materials/   # Study materials
│   ├── learning/          # Learning dashboard
│   ├── residence/         # Residence finder
│   └── chatbot/          # AI chatbot
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── common/           # Common components
│   └── learning/         # Learning-specific components
├── types/                # TypeScript type definitions
├── utils/                # Utility functions and classes
├── services/             # API service classes
├── data/                 # Data services and mock data
├── constants/            # Application constants
└── api/                  # Backend API server
    ├── routes/           # API route handlers
    └── server.js         # Express server
\`\`\`

## 🔧 Development

### Code Organization
- **OOP Principles**: Utility classes, service classes, and proper encapsulation
- **Type Safety**: Comprehensive TypeScript coverage
- **Component Architecture**: Reusable, composable components
- **Clean Code**: Proper separation of concerns and maintainable structure

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)
1. Create a new app on your platform
2. Set environment variables
3. Deploy the `api` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for better student collaboration tools
- Designed with accessibility and user experience in mind
\`\`\`

## 🚀 **Local API Setup Steps:**

### **1. Project Setup**
\`\`\`bash
# Clone and setup
git clone <your-repo>
cd uniconnect-platform

# Install dependencies
npm install
cd api && npm install && cd ..
\`\`\`

### **2. Environment Configuration**
\`\`\`bash
# Root .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local

# API .env
echo "PORT=3001" > api/.env
echo "NODE_ENV=development" >> api/.env
\`\`\`

### **3. Start Development Servers**
\`\`\`bash
# Terminal 1 - API Server
cd api && npm run dev

# Terminal 2 - Frontend
npm run dev
\`\`\`

### **4. Verify Setup**
- Frontend: http://localhost:3000
- API Health: http://localhost:3001/health
- API Endpoints: http://localhost:3001/api/*

## ✅ **Key Features of This Clean Codebase:**

### **1. Architecture**
- **OOP Design**: Service classes, utility classes with static methods
- **Type Safety**: Comprehensive TypeScript interfaces
- **Separation of Concerns**: Clear data, service, and presentation layers
- **Modular Components**: Reusable, composable React components

### **2. Code Quality**
- **Clean Structure**: Logical file organization and naming
- **Error Handling**: Proper error boundaries and API error handling
- **Performance**: Optimized components and efficient data flow
- **Maintainability**: Easy to extend and modify

### **3. Development Experience**
- **Hot Reload**: Both frontend and backend with live reloading
- **Type Checking**: Full TypeScript support with proper interfaces
- **Linting**: ESLint configuration for code quality
- **Documentation**: Comprehensive README and inline comments

This is a complete, production-ready codebase that follows industry best practices and is ready for local development and deployment!
