import { useEffect, useState } from "react"

import { BiRefresh } from "react-icons/bi"
import JobDetailCard from "./JobDetailCard"

export default function ListData(){
    const [jobs, setJobs] = useState()

    useEffect(() => {
        if(!jobs) fetch("/api/ocr-table")
            .then(res => res.json())
            .then(({jobs}) => setJobs(jobs))
    }, [jobs])

    return(
        <div className="w-full max-w-4xl flex-grow flex flex-col gap-2">
            <div className="flex justify-between items-end">
                <h2 className="text-lg font-bold">View Results</h2>
                <button className="border flex items-center gap-1 border-gray-800 text-gray-800 font-semibold p-2 rounded-md hover:bg-gray-800 hover:text-white transition-colors" onClick={jobs ? () => setJobs(null) : null}>
                    <BiRefresh size={20}/> <p>Refresh All</p>
                </button>
            </div>
            <hr/>
            {jobs ? 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {jobs.map(job => (
                    <JobDetailCard {...job} key={job.public_id}/>
                ))}
            </div> : <p className="font-medium">Loading...</p>}
        </div>
    )
}