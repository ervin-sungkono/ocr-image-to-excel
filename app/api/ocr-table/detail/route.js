import { NextResponse } from "next/server";

const options = {
    headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
    }
}

export async function GET(request){
    const id = request.nextUrl.searchParams.get("id");

    const data = await fetch(`https://api.edenai.run/v2/ocr/ocr_tables_async/${id}`, {
        ...options,
        method: 'GET',
    })
    .then(res => res.json())
    .catch(err => console.error(err));

    return NextResponse.json(data)
}