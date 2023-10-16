import React, { useContext, useEffect } from 'react'
import reportContext from '@/context/report/reportContext'
import { jost } from '@/utils/fonts'

const Reports = () => {
    const { getReports, reportData } = useContext(reportContext)
    useEffect(() => {
        getReports()
    }, [])

    useEffect(() => {
        console.log(reportData)
    }, [reportData])

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // Format date in the desired format
        const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

        // Format time in 12-hour format with AM/PM
        const hours = date.getHours() % 12 || 12; // Convert 0 to 12
        const minutes = date.getMinutes();
        const amOrPm = date.getHours() < 12 ? "AM" : "PM";
        const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;

        return {
            date: formattedDate,
            time: formattedTime,
        };
    }

    return (
        <div className={`mainWrapper w-full ${jost.className} pt-10 px-2 lg:px-20`}>
            <div className="heading">
                <h1 className='text-5xl lg:text-6xl font-bold py-10'>All Reports</h1>
            </div>
            {
                reportData.map((report, index) => {
                    return (
                        <div key={index} className="card w-full lg:w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://learn.g2.com/hubfs/Imported%20sitepage%20images/1ZB5giUShe0gw9a6L69qAgsd7wKTQ60ZRoJC5Xq3BIXS517sL6i6mnkAN9khqnaIGzE6FASAusRr7w=w1439-h786.png" alt="Shoes" /></figure>
                            <div className="card-body">
                                <p className='text-sm'>Update At: {(formatDateTime(report.$updatedAt)).date} | {(formatDateTime(report.$updatedAt)).time}</p>
                                <h2 className="card-title capitalize">Reporter: {report.name}</h2>
                                <p>Date: {(formatDateTime(report.dateTime)).date} | {(formatDateTime(report.dateTime)).time}</p>
                                {/* <p>No of injury spots: {report.description.length}</p> */}
                                <div className="card-actions justify-end">
                                    <button className="btn btn-neutral">View Report</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Reports