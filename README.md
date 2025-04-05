# 📚 Book Management App

A simple yet powerful CRUD application for managing a collection of books. This project includes user authentication and authorization powered by **Keycloak IAM**.

---

## 🔧 Tech Stack

- **Frontend:** Next.js  
- **Backend:** NestJS  
- **Authentication:** Keycloak Identity and Access Management (IAM)

---

## 🚀 Getting Started

### 📦 Backend – NestJS
- Add environment varaibles
   ```
   DATABASE_URL="YOUR_SECRET"
   PORT="YOUR_SECRET"
   PUBLIC_KEY="YOUR_SECRET"
   ```
   ```
   cd server
   npm i
   nest start
   ```

### 📦 Frontend – NextJS
- Add environment varaibles
   ```
   NEXT_PUBLIC_KEYCLOAK_URL="YOUR_SECRET"
   NEXT_PUBLIC_KEYCLOAK_REALM="YOUR_SECRET"
   NEXT_PUBLIC_KEYCLOAK_CLIENT_ID="YOUR_SECRET"
   NEXT_PUBLIC_IMAGE_DOMAIN="YOUR_SECRET"
   NEXT_PUBLIC_API_URL="YOUR_SECRET"
   ```
   ```
   cd client
   npm i
   npm run dev
   ```
### 📁 Project Structure
>.
>>
>├── client   # Frontend - Next.js
>>
>└── server   # Backend - NestJS
>>
<img width="1426" alt="Screenshot 2025-04-05 at 09 22 04" src="https://github.com/user-attachments/assets/84bdfc85-af79-4e0f-a685-c21469276f67" />
