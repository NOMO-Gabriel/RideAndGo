
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const userRole = decodedToken.roles[0];

  if (request.nextUrl.pathname.startsWith('/admin') && userRole !== 'ROLE_ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Matcher pour appliquer le middleware sur certaines routes
export const config = {
  matcher: ['/admina/:path*', '/dashboarda/:path*'],
};
