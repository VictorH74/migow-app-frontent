import { cookies } from "next/headers";

export async function POST(req: Request) {
    cookies().delete('currentUser')
    return Response.json({ message: 'ok' })
}