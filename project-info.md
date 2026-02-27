# Total Excellence Services Inc. - Project Reference

## 1. Project Overview
**Name:** Total Excellence Services Website  
**Domain:** [tescleans.com](https://tescleans.com) (Production) | [tescleans.vercel.app](https://tescleans.vercel.app) (Staging)  
**Description:** A modern, professional website for a commercial and residential cleaning company based in Miami Lakes, FL. The site features online booking, portfolio showcasing, and a content management system for admins.

---

## 2. Technology Stack

### Core Framework
*   **Frontend:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4 (Vanilla CSS variables in `globals.css`)
*   **Icons:** Lucide React

### Backend & Infrastructure
*   **Database:** Supabase (PostgreSQL)
*   **Authentication:** Supabase Auth (Admin Access)
*   **Hosting:** Vercel
*   **Email Service:** Resend API

---

## 3. Design System

### Colors
*   **Primary (Navy Blue):** `#0A102D` (Used for headers, buttons, accents)
*   **Secondary (Silver/Gray):** `#D9D9D9` (Used for backgrounds, borders)
*   **Accent:** White & Off-White (`#F9FAFB`)

### Typography
*   **Font Family:** `Outfit` (Google Fonts)
*   **Weights:** Regular (400), Medium (500), Bold (700)

---

## 4. Key Features

### 1. Booking System (`/book`)
*   **Multi-step Wizard:** Services -> Date/Time -> Contact Details -> Confirmation.
*   **Logic:**
    *   Blocks Sundays.
    *   Generates time slots (9 AM - 4 PM Weekdays, 9 AM - 2 PM Saturdays).
    *   Saves booking to Supabase `bookings` table.
    *   Sends email notification to `Info@tescleans.com`.

### 2. Admin Dashboard (`/admin`)
*   **Login:** Protected route using Supabase Auth.
*   **Capabilities:**
    *   **Bookings Tab:** View pending/confirmed bookings, change status (Confirm/Cancel).
    *   **Blog Tab:** Create and view blog posts (Stored in `posts` table).
    *   **Home Slider Tab:** Edit homepage slider images and text (Stored in `slides` table).

### 3. Contact Form (`/contact`)
*   **Functionality:** Collects Name, Email, Phone, Message.
*   **Backend:** detailed email sent via Resend API to the business owner.

### 4. Dynamic Homepage
*   **Hero Slider:** Fetch content from DB (`slides` table) or fallback to static defaults.
*   **Sections:** Services, Mission (Unique layout), Features, Testimonials.

---

## 5. Environment & Configuration

### Environment Variables
These keys are set in Vercel Project Settings.
```bash
# Public Keys (Safe for client-side)
NEXT_PUBLIC_SUPABASE_URL=https://gvhbenqokrhgjgajhhbb.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_...

# Secret Keys (Server-side only)
RESEND_API_KEY=re_... (Required for emails to work)
```

### DNS Configuration
To point the domain `tescleans.com` to Vercel:
*   **A Record:** `@` -> `76.76.21.21`
*   **CNAME Record:** `www` -> `cname.vercel-dns.com`

---

## 6. Database Schema (Supabase)

### Table: `bookings`
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key |
| `service` | text | Name of selected service |
| `date` | date | Booking date |
| `time` | text | Selected time slot |
| `status` | text | 'pending', 'confirmed', 'cancelled' |
| `email` | text | Customer email |

### Table: `slides`
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key |
| `title` | text | Slider Header |
| `subtitle` | text | Slider Description |
| `image_url` | text | Path to image (e.g. `/assets/sliderimages/1.jpg`) |
| `sort_order` | int | Order of appearance |

### Table: `posts`
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key |
| `title` | text | Blog Title |
| `content` | text | Blog Body |
| `image_url` | text | Featured Image |

---

## 7. Folder Structure
*   `app/` - Next.js App Router pages (routes).
*   `app/api/` - Server-side API endpoints (`send-email`).
*   `components/` - Reusable UI components (Navbar, Footer, ui/shadcn).
*   `lib/` - Utility functions (`supabase.ts` client, `utils.ts`).
*   `public/assets/` - Static images (Placeholders, Slider images).

---

## 8. Deployment Checks
When modifying the site:
1.  **Test Locally:** `npm run dev` (Port 5001).
2.  **Deploy:** Push to Git or run `npx vercel --prod`.
3.  **Verify:** Check `/admin` functionality and email delivery.