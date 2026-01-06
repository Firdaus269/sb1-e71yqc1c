# Aurotradex Landing Page

A professional, high-trust lead capture landing page for Aurotradex, a broker firm operating in Forex and Cryptocurrency markets.

## Features

- **Modern UI**: Clean, dark-themed design with emerald accents
- **Lead Capture Form**: Collects name, mobile number, and email
- **Form Validation**: Client-side validation with helpful error messages
- **Database Integration**: Stores leads in Supabase database
- **Success State**: Shows confirmation message after submission
- **Trust Elements**: Risk disclaimers and privacy assurances
- **Responsive Design**: Works perfectly on all devices

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Form Management**: React Hook Form + Zod
- **Database**: Supabase
- **Notifications**: Sonner

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

The database migration has already been created. You need to:

1. Get your Supabase project URL and anon key from your Supabase dashboard
2. Update `.env.local` with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

### 3. Database Setup

The following database table structure has been created:

**Table: `leads`**
- `id` (uuid, primary key)
- `name` (text, required)
- `mobile` (text, required)
- `email` (text, required)
- `status` (text, default: 'new')
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Security**: Row Level Security (RLS) is enabled with policies allowing:
- Anonymous users to insert leads
- Authenticated users to view and update leads

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the landing page.

### 5. Build for Production

```bash
npm run build
npm start
```

## Page Structure

### 1. Hero Section
- Regulated & Secure badge
- Value-driven headline
- Trust indicators (No Hidden Fees, Transparent Trading, 24/7 Support)

### 2. Lead Form
- Name input
- Mobile number input
- Email input
- Privacy and security messaging
- Success confirmation screen

### 3. Value Proposition
Three key benefits:
- **Global Market Access**: Forex & Crypto trading
- **Education First**: Expert resources and webinars
- **Secure & Transparent**: Bank-grade security

### 4. Trust Footer
- Risk warning disclaimer
- Privacy policy links
- Regulatory compliance messaging

## Customization

### Colors
The design uses emerald as the accent color. To change:
- Update emerald colors in `app/page.tsx` to your preferred color
- Modify button classes: `bg-emerald-500` → `bg-[your-color]-500`

### Content
All content is in `app/page.tsx` and can be easily modified:
- Headlines and copy
- Trust badges
- Value propositions
- Footer disclaimers

### Form Fields
To add/modify form fields:
1. Update the Zod schema in `app/page.tsx`
2. Add form fields in the form section
3. Update the API route in `app/api/submit-lead/route.ts`
4. Modify the database table if needed

## API Routes

### POST /api/submit-lead
Submits a new lead to the database.

**Request Body:**
```json
{
  "name": "John Doe",
  "mobile": "+1234567890",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* lead object */ }
}
```

## Security Features

- Form validation on client and server
- SQL injection protection via Supabase
- Row Level Security (RLS) enabled
- HTTPS required in production
- No sensitive data in client code
- Privacy-focused data collection

## License

Proprietary - Aurotradex
