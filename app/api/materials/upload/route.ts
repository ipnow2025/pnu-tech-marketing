import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

type UploadResponse =
  | { url: string; name: string; size: number; type?: string }
  | { error: string }

export async function POST(req: Request) {
  try {
    const token =
      process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.BLOB_TOKEN ||
      process.env.BLOB_WRITE_TOKEN

    // Blob 미구성 시 클라이언트가 IndexedDB 폴백하도록 503 반환
    if (!token) {
      return NextResponse.json<UploadResponse>({ error: "blob-not-configured" }, { status: 503 })
    }

    const form = await req.formData()
    const id = String(form.get("id") || "")
    const file = form.get("file") as File | null

    if (!id || !file) {
      return NextResponse.json<UploadResponse>({ error: "invalid-form" }, { status: 400 })
    }

    const safeName = file.name.replace(/[^\w.\-()ㄱ-힣 ]/g, "_")
    const key = `materials/${id}/${Date.now()}-${safeName}`

    const { url } = await put(key, file, {
      token,
      access: "public",
      contentType: file.type || "application/octet-stream",
    })

    return NextResponse.json<UploadResponse>(
      { url, name: file.name, size: file.size, type: file.type },
      { status: 200 },
    )
  } catch {
    return NextResponse.json<UploadResponse>({ error: "upload-failed" }, { status: 500 })
  }
}
