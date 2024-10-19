# My Dashboard App

A full-stack interactive dashboard application built with Next.js 14, Supabase, and Recharts.

## Features

- User authentication with Supabase Auth
- Dashboard with multiple charts (line, bar, pie)
- Real-time data updates
- Responsive design with Tailwind CSS
- Data management with Supabase Postgres

## Setup Instructions

1. Clone the repository:

  ```bash
  git clone https://github.com/your-username/my-dashboard-app.git
  ```
2. Install dependencies:
  ```bash
  cd my-dashboard-app
  npm install
  ```
3. Create a `.env.local` file in the root directory:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```
4. Run the development server:
  ```bash
  npm run dev
  ```
5. Open http://localhost:3000 in your browser.

## API Documentation
### GET /api/data
Retrieve all data entries.
* **Response**: JSON array of data entries.

### POST /api/data
Create a new data entry.
* **Body**: JSON object with `value1`, `value2`, and `value3`.

---