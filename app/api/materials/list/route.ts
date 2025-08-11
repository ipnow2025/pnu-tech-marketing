import { NextResponse } from "next/server"
import { list } from "@vercel/blob"

type MaterialItem = {
  name: string
  size: number
  type?: string
  url: string
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ items: [] as MaterialItem[] }, { status: 200 })
    }

    const token =
      process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.BLOB_READ_TOKEN ||
      process.env.BLOB_TOKEN

    // Blob 미구성 시 빈 배열 반환(에러 방지)
    if (!token) {
      return NextResponse.json({ items: [] as MaterialItem[] }, { status: 200 })
    }

    const prefix = `materials/${id}/`
    const { blobs } = await list({ prefix, token })

    const items: MaterialItem[] =
      blobs?.map((b) => {
        const name = b.pathname.startsWith(prefix)
          ? b.pathname.slice(prefix.length)
          : b.pathname
        return {
          name,
          size: b.size ?? 0,
          type: b.contentType,
          url: (b as any).url || (b as any).downloadUrl,
        }
      }) ?? []

    return NextResponse.json({ items }, { status: 200 })
  } catch {
    return NextResponse.json({ items: [] as MaterialItem[] }, { status: 200 })
  }
}
