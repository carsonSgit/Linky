import fetchTitle from './fetchTitle';
import { NextResponse } from 'next/server';

export const runtime = 'edge'

export async function POST(req: Request) {
  const { url } = await req.json()
  try {
    const title = await fetchTitle(
      url,
    )
    return NextResponse.json({ success: true, title })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch title" })
  }
}