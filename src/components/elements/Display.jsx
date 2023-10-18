import { formatDateTime } from '@/utils/commonFunctions';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillCloseCircle, AiFillLeftCircle, AiFillRightCircle, AiTwotoneEdit } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import reportContext from '@/context/report/reportContext';

const Display = ({ reportData, toggleDisplay, edit, setEdit }) => {
    const [description, setDescription] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [localReportData, setLocalReportData] = useState({ ...reportData })
    const { updateReport } = useContext(reportContext)

    // Parse the description elements and update the state when reportData changes
    useEffect(() => {
        const parsedDescription = reportData.description.map((item) => {
            return JSON.parse(item);
        });
        setDescription(parsedDescription);
    }, [reportData]);

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(description.length - 1); // Wrap around to the last image
        }
    };

    // Navigate to the next image with looping
    const nextImage = () => {
        if (currentIndex < description.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // Wrap around to the first image
        }
    };

    const handleChange = (e) => {
        setLocalReportData({ ...localReportData, [e.target.name]: e.target.value });
    }

    const deleteCircle = (index) => {
        const updatedDescription = [...description[currentIndex]]; // Create a copy of the current description
        updatedDescription.splice(index, 1); // Remove the circle at the specified index
        setDescription((prevDescription) => {
            const newDescription = [...prevDescription];
            newDescription[currentIndex] = updatedDescription; // Update the description state
            return newDescription;
        });
    };

    const editDescription = (index, newDescription) => {
        const updatedDescription = [...description[currentIndex]]; // Create a copy of the current description
        updatedDescription[index].description = newDescription; // Update the description at the specified index
        setDescription((prevDescription) => {
            const newDescription = [...prevDescription];
            newDescription[currentIndex] = updatedDescription; // Update the description state
            return newDescription;
        });
    };

    const addCircle = (x, y) => {
        setDescription((prevDescription) => {
            const updatedDescription = [...prevDescription];
            const currentDescription = updatedDescription[currentIndex];

            // Check if a circle already exists at the same coordinates
            const existingCircleIndex = currentDescription.findIndex((circle) => {
                return circle.x === x && circle.y === y;
            });

            if (existingCircleIndex === -1) {
                // If no circle exists at the same coordinates, add a new one
                currentDescription.push({ x, y, description: '' });
            }

            return updatedDescription;
        });
    };

    const handleUpdate = () => {
        const updatedDescription = description.map((item) => {
            return JSON.stringify(item);
        });
        const updatedReportData = {
            ...localReportData,
            description: updatedDescription,
        };
        updateReport(localReportData.$id, updatedReportData)
    }


    return (
        <div className='absolute top-0 left-0 w-full flex flex-col lg:flex-row items-center justify-center bg-white z-30'>
            <AiFillCloseCircle
                onClick={() => { setEdit(false); toggleDisplay(); }}
                className='absolute top-16 right-2 lg:top-24 lg:right-10 text-red-500 text-5xl z-40 hover:scale-110 transition-all duration-300 cursor-pointer'
            />
            {description.length &&
                <>
                    <div className="image min-h-screen lg:w-1/2 flex flex-col items-center justify-center relative">
                        <div className='relative pt-12'>
                            <div
                                style={{ width: '100%', position: 'relative' }}
                                onClick={(e) => {
                                    if (!edit) return; // Don't add circles if not in edit mode
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = (e.nativeEvent.offsetX / rect.width) * 100;
                                    const y = (e.nativeEvent.offsetY / rect.height) * 100;
                                    addCircle(x, y); // Add a new circle with coordinates and an empty description
                                }}
                            >
                                <Image
                                    className='rounded-xl'
                                    src={reportData.imageUrl[currentIndex]}
                                    alt="annotated"
                                    height={500}
                                    width={500}
                                />
                                <svg
                                    width='100%'
                                    height='100%'
                                    style={{ position: 'absolute', top: 0, left: 0 }}
                                >
                                    {description[currentIndex].map((ring, index) => (
                                        <g key={index}>
                                            <circle
                                                cx={ring.x + '%'}
                                                cy={ring.y + '%'}
                                                r='15' // Outer radius
                                                fill='transparent' // Transparent fill for the ring
                                                stroke='red' // Border color
                                                strokeWidth='2' // Border thickness
                                            />
                                            <text
                                                className='font-extrabold'
                                                x={ring.x + 2 + '%'}
                                                y={ring.y + 4 + '%'}
                                                fontSize="10"
                                                fill="red"
                                            >
                                                {index + 1}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                            </div>
                            <div className="absolute w-full flex top-1/2 justify-between">
                                <button className='bg-white rounded-full ml-1' onClick={prevImage}>
                                    <AiFillLeftCircle className='text-4xl hover:scale-110 transition-all duration-300' />
                                </button>
                                <button className='bg-white rounded-full ml-1' onClick={nextImage}>
                                    <AiFillRightCircle className='text-4xl hover:scale-110 transition-all duration-300' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content lg:w-1/2 pt-20 pb-10 flex flex-col items-center justify-center space-y-2">
                        <div className="text-2xl font-bold capitalize flex space-x-4">
                            <p>
                                Reporter:{localReportData.name}
                            </p>
                            {edit && <AiTwotoneEdit
                                onClick={() => document.getElementById('my_modal_5').showModal()}
                                className='rounded-lg bg-gray-300 p-2 text-4xl text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-black' />}
                        </div>
                        <p>Date: {(formatDateTime(localReportData.dateTime)).date} | {(formatDateTime(localReportData.dateTime)).time}</p>
                        <div className="textarea flex flex-col py-5 space-y-4 lg:w-1/2 h-96 overflow-y-scroll">
                            {description[currentIndex].map((item, index) => (
                                <div className='flex items-center justify-center space-x-2 w-full' key={index}>
                                    <label>{index + 1}:</label>
                                    <textarea
                                        className='border-2 w-full outline-none bg-[#fafafa] border-[#c6c6c6] p-2 px-4 rounded-xl'
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="2"
                                        value={item.description || ''}
                                        onChange={(e) => editDescription(index, e.target.value)}
                                    ></textarea>
                                    {edit && <FaTrashAlt
                                        title='Delete'
                                        onClick={() => deleteCircle(index)}
                                        className='rounded-lg bg-gray-300 p-2 text-4xl text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-black' />}
                                </div>
                            ))}
                        </div>
                        {edit && <button onClick={handleUpdate} className="btn btn-neutral">Update</button>}
                    </div>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <p className="text-2xl font-bold">Edit Report</p>
                            <div className="details flex flex-col space-y-4">
                                <input
                                    required
                                    className='outline-none placeholder:text-gray-700 bg-transparent border-b p-2 border-gray-700'
                                    type='text'
                                    placeholder='Enter the name'
                                    name='name'
                                    id='name'
                                    value={localReportData.name}
                                    onChange={handleChange}
                                />
                                <input
                                    required
                                    className='outline-none placeholder:text-gray-700 bg-transparent border-b p-2 border-gray-700'
                                    type='datetime-local'
                                    placeholder='Enter the name'
                                    name='dateTime'
                                    id='dateTime'
                                    value={localReportData.dateTime}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </>}
        </div>

    );
};

export default Display;