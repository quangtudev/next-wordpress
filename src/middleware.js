import { NextResponse } from 'next/server';

export function middleware(req) {
    if (req.headers.get('referer')?.includes('facebook.com')) {
        const targetURL = `${process.env.WORDPRESS_REDIRECT_DOMAIN}/${req.nextUrl.pathname.replace('/posts/', '')}`;
        return NextResponse.redirect(targetURL);
    }
}
