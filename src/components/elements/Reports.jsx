import React, { useContext, useEffect, useState } from 'react'
import reportContext from '@/context/report/reportContext'
import { jost } from '@/utils/fonts'
import Display from './Display'
import { formatDateTime } from '@/utils/commonFunctions'

const Reports = () => {
    const { getReports, reportData } = useContext(reportContext)
    const [displayedReports, setDisplayedReports] = useState({});
    useEffect(() => {
        getReports()
    }, [])

    useEffect(() => {
        console.log(reportData)
    }, [reportData])

    const toggleDisplay = (reportId) => {
        setDisplayedReports((prevState) => ({
            ...prevState,
            [reportId]: !prevState[reportId],
        }));
    };

    return (
        <div className={`mainWrapper w-full ${jost.className} pt-10 px-2 lg:px-20`}>
            <div className="heading">
                <h1 className='text-5xl lg:text-6xl font-bold py-10'>All Reports</h1>
            </div>
            <div className="reports relative flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0">
                {reportData.map((report, index) => {
                    const isDisplayed = !!displayedReports[report.$id];

                    return (
                        <>
                            <div key={index} className="card w-full lg:w-96 bg-base-100 shadow-xl">
                                <figure><img src="/images/coverImage.webp" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <p className='text-sm'>Update At: {(formatDateTime(report.$updatedAt)).date} | {(formatDateTime(report.$updatedAt)).time}</p>
                                    <h2 className="card-title capitalize">Reporter: {report.name}</h2>
                                    <p>Date: {(formatDateTime(report.dateTime)).date} | {(formatDateTime(report.dateTime)).time}</p>
                                    <div className="card-actions justify-end">
                                        <button onClick={() => toggleDisplay(report.$id)} className="btn btn-neutral">View Report</button>
                                    </div>
                                </div>
                            </div>
                            {isDisplayed && <Display toggleDisplay={() => toggleDisplay(report.$id)} reportData={report} />}
                        </>
                    );
                })}
            </div>
        </div>
    );
}

export default Reports