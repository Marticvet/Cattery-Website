import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
const types = new Set([
  'cat',
  'kitten',
  'litter',
  'exhibition',
  'galleryImage',
  'homepage',
  'informationPage',
  'siteSettings',
  'legalPage',
]);
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret)
    return NextResponse.json({ error: 'Revalidation is not configured.' }, { status: 503 });
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
    if (!isValidSignature)
      return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
    if (!body?._type || !types.has(body._type))
      return NextResponse.json({ error: 'Unsupported document type.' }, { status: 400 });
    // Shared content (parents, settings, links) can affect multiple page families.
    revalidateTag('sanity', { expire: 0 });
    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ error: 'Invalid webhook request.' }, { status: 400 });
  }
}
