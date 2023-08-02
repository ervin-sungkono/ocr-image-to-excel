import { useEffect, useState } from "react"
import format from "date-fns/format"
import { downloadExcel } from "@/lib/helper"

import { BiRefresh } from "react-icons/bi"

export default function ListData(){
    const [jobs, setJobs] = useState()

    useEffect(() => {
        if(!jobs) fetch("/api/ocr-table")
            .then(res => res.json())
            .then(({jobs}) => setJobs(jobs))
    }, [jobs])

    const handleFileDownload = async(id, provider) => {
        const jobDetail = await fetch(`/api/ocr-table/detail?id=${id}`)
            .then(res => res.json())
            .catch(err => console.log(err))

        console.log(jobDetail)
        
        downloadExcel(jobDetail, provider)
    }

    return(
        <div className="w-full max-w-4xl flex-grow flex flex-col gap-2">
            <div className="flex justify-between items-end">
                <h2 className="text-lg font-bold">View Results</h2>
                <button className="border border-gray-800 text-gray-800 font-semibold p-2 rounded-md hover:bg-gray-800 hover:text-white transition-colors" onClick={jobs ? () => setJobs(null) : null}>
                    <BiRefresh size={20}/>
                </button>
            </div>
            <hr/>
            {jobs ? 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {jobs.map(job => (
                    <div className="p-4 shadow-md rounded-md border border-black/30 text-sm">
                        <p className="font-medium">ID: {job.public_id}</p>
                        <p className="font-medium">Created at: {format(new Date(job.created_at), 'dd-MMM-yyyy HH:MM:SS')}</p>
                        <p className="mt-2">Status: {job.state}</p>
                        {job.state === "finished" && <div className="flex flex-col gap-2">
                            <p className="font-semibold">Download results</p>
                            <hr/>
                            <div className="flex flex-wrap gap-2">
                                {job.providers.split(',').map(provider => (
                                    <button className="py-2 px-4 bg-gray-800 text-white font-semibold rounded-md" onClick={() => handleFileDownload(job.public_id, provider)}>{provider}</button>
                                ))}
                            </div>
                        </div>}
                        
                    </div>
                ))}
            </div> : <>Loading...</>}
        </div>
    )
}