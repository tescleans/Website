import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Set to true to enable maintenance mode
const MAINTENANCE_MODE = false;

export function middleware(request: NextRequest) {
    if (!MAINTENANCE_MODE) {
        return NextResponse.next();
    }

    // Allow internal Next.js paths and static assets through
    const url = request.nextUrl.pathname;
    if (
        url.startsWith('/_next') ||
        url.startsWith('/favicon.ico') ||
        url.startsWith('/assets')
    ) {
        return NextResponse.next();
    }

    // Return a static HTML response for maintenance mode
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Maintenance | Tes Cleaning</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #f8fafc;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          text-align: center;
          padding: 20px;
        }
        .container {
          background-color: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          max-width: 500px;
          width: 100%;
        }
        h1 {
          color: #0f172a;
          margin-top: 0;
          font-size: 28px;
        }
        p {
          line-height: 1.6;
          margin-bottom: 0;
          color: #475569;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 24px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Temporarily Unavailable</h1>
        <p>We are currently undergoing scheduled maintenance to improve our services. The site will be back up shortly.</p>
        <p style="margin-top: 16px; font-weight: 500;">Thank you for your patience!</p>
      </div>
    </body>
    </html>
  `

    return new NextResponse(html, {
        status: 503,
        headers: { 'Content-Type': 'text/html' },
    });
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}