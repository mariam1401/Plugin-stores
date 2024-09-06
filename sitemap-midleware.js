import { NextResponse } from 'next/server';
export function middleware(req) {
    const { pathname } = req.nextUrl;

    const sitemapPattern = /^\/wordpress-plugins\/sitemap-\d+\.xml$/;

    if (sitemapPattern.test(pathname)) {
        const url = req.nextUrl.clone();
        return NextResponse.rewrite(url);
    }
    return NextResponse.next();
}
