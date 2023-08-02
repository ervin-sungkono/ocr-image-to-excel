import format from "date-fns/format"
import { downloadExcel } from "@/lib/helper"
import { useState } from "react"

import { BiRefresh } from "react-icons/bi"

export default function JobDetailCard({public_id, state, created_at, providers}){
    const [status, setStatus] = useState(state)
    const [loading, setLoading] = useState(false)

    const updateStatus = async() => {
        setLoading(true)
        fetch(`/api/ocr-table/detail?id=${public_id}`)
            .then(res => res.json())
            .then(({status}) => setStatus(status))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const handleFileDownload = async(provider) => {
        const jobDetail = await fetch(`/api/ocr-table/detail?id=${public_id}`)
            .then(res => res.json())
            .catch(err => console.log(err))
        
        downloadExcel(jobDetail, provider)
    }

    return (
        <div className="relative p-4 pr-11 shadow-md rounded-md border border-black/30 text-sm">
            <button className="absolute right-2 top-2 border border-gray-800 text-gray-800 font-semibold p-2 rounded-md hover:bg-gray-800 hover:text-white transition-colors" onClick={updateStatus} disabled={loading}>
                <BiRefresh size={20}/>
            </button>
            {!loading ? (
                <>
                    <p className="font-medium">ID: {public_id}</p>
                    <p className="font-medium">Created at: {format(new Date(created_at), 'dd-MMM-yyyy HH:MM:SS')}</p>
                    <p className="mt-2">Status: {status}</p>
                    {status === "finished" && <div className="flex flex-col gap-2">
                        <p className="font-semibold">Download results</p>
                        <hr/>
                        <div className="flex flex-wrap gap-2">
                            {providers.split(',').map(provider => (
                                <button className="py-2 px-4 bg-gray-800 text-white font-semibold rounded-md" onClick={() => handleFileDownload(provider)}>
                                    {provider}
                                </button>
                            ))}
                        </div>
                    </div>}
                </> 
            ) : <p className="text-lg font-medium">Loading...</p>}
            
        </div>
    )
}