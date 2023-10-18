import React, { useContext, useEffect, useState } from 'react'
import reportContext from '@/context/report/reportContext'
import { jost } from '@/utils/fonts'
import Display from './Display'
import { formatDateTime } from '@/utils/commonFunctions'
import { FaFilter, FaTrashAlt } from 'react-icons/fa'
import { AiTwotoneEdit } from 'react-icons/ai'

const Reports = () => {
    const { getReports, reportData, deleteReport } = useContext(reportContext)
    const [displayedReports, setDisplayedReports] = useState({});
    const [sortedReports, setSortedReports] = useState([]);
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        getReports()
    }, [])

    useEffect(() => {
        setSortedReports([...reportData]);
    }, [reportData]);

    const toggleDisplay = (reportId) => {
        setDisplayedReports((prevState) => ({
            ...prevState,
            [reportId]: !prevState[reportId],
        }));
    };

    const editReport = (reportId) => {
        setEdit(true)
        toggleDisplay(reportId)
    }

    // Function to sort by newest first
    const sortNewestFirst = () => {
        setSortedReports([...sortedReports].sort((a, b) => {
            return new Date(b.dateTime) - new Date(a.dateTime);
        }));
    };

    // Function to sort by oldest first
    const sortOldestFirst = () => {
        setSortedReports([...sortedReports].sort((a, b) => {
            return new Date(a.dateTime) - new Date(b.dateTime);
        }));
    };


    return (
        <div className={`mainWrapper relative overflow-x-hidden min-h-screen pb-10 w-full ${jost.className} ${reportData.length != 0 ? 'pt-16' : ''} px-2 lg:px-20`}>
            {reportData.length != 0 ?
                <>
                    <div className="heading flex items-center justify-between px-2">
                        <h1 className='text-5xl lg:text-6xl font-bold py-10'>All Reports</h1>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0}>
                                <FaFilter className='text-2xl' />
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a onClick={sortNewestFirst}>Newest first</a></li>
                                <li><a onClick={sortOldestFirst}>Oldest first</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="reports flex flex-col flex-wrap lg:flex-row">
                        {sortedReports.map((report, index) => {
                            const isDisplayed = !!displayedReports[report.$id];

                            return (
                                <>
                                    <div key={index} className="card lg:mx-2 mb-4 w-full lg:w-96 bg-base-100 shadow-xl">
                                        <figure><img src="/images/coverImage.webp" alt="Shoes" /></figure>
                                        <div className="card-body">
                                            <p className='text-sm'>Update At: {(formatDateTime(report.$updatedAt)).date} | {(formatDateTime(report.$updatedAt)).time}</p>
                                            <h2 className="card-title capitalize">Reporter: {report.name}</h2>
                                            <p>Date: {(formatDateTime(report.dateTime)).date} | {(formatDateTime(report.dateTime)).time}</p>
                                            <div className="card-actions justify-end">
                                                <button onClick={() => toggleDisplay(report.$id)} className="btn btn-neutral">View Report</button>
                                            </div>
                                        </div>
                                        <FaTrashAlt title='Delete' onClick={() => document.getElementById('my_modal_5').showModal()} className='absolute right-3 top-3 rounded-lg bg-black p-2 text-4xl text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-2xl hover:shadow-black' />
                                        <AiTwotoneEdit title='Edit' onClick={() => editReport(report.$id)} className='absolute right-3 top-14 rounded-lg bg-white p-2 text-4xl text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-black' />
                                    </div>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-2xl">Delete Report</h3>
                                            <p className="py-4">This report will be deleted</p>
                                            <div className="modal-action">
                                                <form className='space-x-2' method="dialog">
                                                    <button onClick={() => deleteReport(report.$id)} className="btn btn-neutral">Delete</button>
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                    {isDisplayed &&
                                        <Display
                                            toggleDisplay={() => toggleDisplay(report.$id)}
                                            reportData={report}
                                            edit={edit}
                                            setEdit={setEdit} />}
                                </>
                            );
                        })}
                    </div>
                </> :
                <div className='text-5xl h-screen lg:text-6xl font-bold flex items-center justify-center w-full text-center'>No Reports to show.Please add one!</div>
            }
        </div>
    );
}

export default Reports