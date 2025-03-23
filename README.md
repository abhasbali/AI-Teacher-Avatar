# 🌟 AI-Powered Virtual Teaching Assistant SaaS

![SaaS](https://img.shields.io/badge/SaaS-Teaching-blueviolet?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Neon](https://img.shields.io/badge/Neon_DB-0093FF?style=for-the-badge&logo=postgresql&logoColor=white)

## 🚀 Overview

🎓 **Empowering Educators, Enhancing Learning!**

The **AI-Powered Virtual Teaching Assistant SaaS** is a revolutionary AI-driven platform that redefines how educators interact with technology. By leveraging advanced AI, our solution seamlessly automates content generation, grading, and student progress tracking—allowing teachers to focus on what truly matters: *teaching*. 

Built for scalability, security, and efficiency, our SaaS solution bridges the gap between education and artificial intelligence, transforming traditional learning environments into intelligent digital ecosystems.

## 🎯 Features

- 🔥 **AI-Generated Content** – Create lesson plans, quizzes & assignments instantly
- 📊 **Automated Grading** – Let AI evaluate assignments with pinpoint accuracy
- 📈 **Performance Analytics** – AI-driven insights to track student growth
- 🔐 **Seamless Authentication** – Secure access powered by Clerk
- 🛠 **Scalable Modular Architecture** – Built for performance & flexibility

## 🛠 Tech Stack

### 🎨 Frontend
- ⚛ React.js
- 🎨 Tailwind CSS
- ⚡ Next.js

### 🏢 Backend
- 🟢 Node.js
- 🚀 Express.js
- 🛢 Neon Database (PostgreSQL)
- 🔗 Prisma ORM

### 🤖 AI Integration
- 🔥 Google Gemini API
- 🧠 OpenAI API

### 🔑 Authentication
- 🔐 Clerk API

### ☁ Cloud Services
- 📦 AWS / Firebase (Storage & Hosting)
- ⚡ Vercel (Deployment)

## 📂 Connected Repositories

This repository is connected to two additional repositories:

- 🧑‍🏫 [AI-Teacher-Avatar](https://github.com/abhasbali/AI-Teacher-Avatar) - Creates avatar for your teacher
- 👨‍🎓 [SaaS-student](https://github.com/abhasbali/SaaS-student) - For student testing and evaluation

## ⚙️ Technical Challenges & Solutions

### 1. Challenge: Content Generation Quality and Relevance

**Problem:** When integrating **OpenAI API** for content generation (e.g., quiz creation, lecture summaries), the outputs were often **too generic** or **not tailored** to specific subjects and student grade levels.

**Solution:**
* **Prompt Engineering**: We iteratively refined prompts to include **specific instructions**, such as:
   * Defining the **grade level** (e.g., "Generate quiz questions for Grade 8 Science").
   * Setting **difficulty levels**.
   * Providing **contextual examples** in the prompts.
* **Fine-tuning Models (Optional)**: For higher accuracy, we considered **fine-tuning GPT-3 models** using **domain-specific datasets** via **OpenAI's fine-tune API**.
* **Backend Implementation**:

```javascript
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Generate 5 multiple-choice questions on Newton's Laws for 8th-grade students.",
  temperature: 0.7,
  max_tokens: 300
});
```

### 2. Challenge: Real-Time Student Performance Tracking

**Problem:** Handling **large volumes of student performance data** and calculating **real-time analytics** (grades, progress charts) caused **latency** in the dashboard.

**Solution:**
* **Efficient Database Queries**:
   * Optimized **PostgreSQL** queries with **indexes** on student IDs and timestamps.
   * Used **materialized views** for pre-calculated results, improving query speed.
* **Real-Time Updates**:
   * Integrated **WebSockets** for pushing real-time analytics updates.
   * Backend architecture optimized for performance.

## 📂 Project Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/abhasbali/AI-Teacher.git
cd AI-Teacher
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm run dev
```

## 🏫 Student SaaS Setup

1. Open a new terminal and navigate to the project folder:
```sh
git clone https://github.com/abhasbali/SaaS-student.git
cd SaaS-student
```

2. Create a `.env` file and add your API keys:
```
GEMINI_API_KEY=your-gemini-api-key
CLERK_API_KEY=your-clerk-api-key
```

3. Install dependencies:
```sh
npm install
```

4. Start the server:
```sh
npm run dev
```

## 🎓 Teaching SaaS Setup

1. Open a new terminal and navigate to the project folder:
```sh
git clone https://github.com/abhasbali/AI-Teacher-Avatar.git
cd AI-Teacher-Avatar
```

2. Create a `.env` file and add your API keys:
```
OPENAI_API_KEY=your-openai-api-key
CLERK_API_KEY=your-clerk-api-key
```

3. Install dependencies:
```sh
npm install
```

4. Start the server:
```sh
npm run dev
```

## 🚀 Deployment

Deploy your SaaS effortlessly using Vercel, AWS, or Firebase. Ensure all necessary `.env` variables are configured before deployment.

- 🔹 **Production-Ready**: Optimized for speed, security, and scalability
- 🔹 **Zero Downtime Deployment**: Continuous integration & updates
- 🔹 **Global Reach**: Host anywhere, access from anywhere

## 🎖 Why Choose Our SaaS?

- ✅ **AI-Driven Automation** – Saves time, enhances efficiency
- ✅ **Scalable & Modular** – Adaptable to evolving educational needs
- ✅ **Data-Driven Insights** – Understand student progress like never before
- ✅ **Seamless User Experience** – Built for both teachers & students

## 🏆 Made with ❤ by Team RECURSIVE MINDS

💡 **Transforming Education, One AI at a Time!**
