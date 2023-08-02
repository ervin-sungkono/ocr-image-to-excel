import { NextResponse } from "next/server"

const options = {
    headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
    }
}

export async function GET(){
    const data = await fetch('https://api.edenai.run/v2/ocr/ocr_tables_async', {
        ...options,
        method: 'GET',
    })
    .then(res => res.json())
    .catch(err => console.error(err));

    return NextResponse.json(data)
}

export async function POST(request){
    const formData = await request.formData()
    formData.append("providers", "amazon")
    formData.append("language", "en")

    const data = await fetch('https://api.edenai.run/v2/ocr/ocr_tables_async',{
        ...options,
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return NextResponse.json(data)
}

