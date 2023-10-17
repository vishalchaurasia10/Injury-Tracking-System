import { formatDateTime } from '@/utils/commonFunctions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle, AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const Display = ({ reportData, toggleDisplay }) => {
    const [description, setDescription] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    return (
        <div className='absolute top-0 left-0 w-full flex flex-col lg:flex-row items-center justify-center bg-white z-30'>
            <AiFillCloseCircle
                onClick={toggleDisplay}
                className='absolute top-16 right-10 text-red-500 text-5xl z-40 hover:scale-110 transition-all duration-300 cursor-pointer'
            />
            {description.length &&
                <>
                    <div className="image min-h-screen lg:w-1/2 flex flex-col items-center justify-center relative">
                        <div className='relative pt-12'>
                            <div
                                style={{ width: '100%', position: 'relative' }}
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
                    </div>
                    <div className="content lg:w-1/2 py-20 flex flex-col items-center justify-center space-y-2">
                        <p className="text-2xl font-bold capitalize">Reporter:{reportData.name}</p>
                        <p>Date: {(formatDateTime(reportData.dateTime)).date} | {(formatDateTime(reportData.dateTime)).time}</p>
                        <div className="textarea flex flex-col py-5 space-y-4 w-1/2 h-96 overflow-y-scroll">
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
                                    ></textarea>
                                </div>
                            ))}
                        </div>
                    </div>
                </>}
        </div>

    );
};

export default Display;