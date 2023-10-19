import Image from 'next/image';
import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';

const Annotate = ({ imageUrl, toggleAnnotation, annotations, onAnnotationsChange }) => {
    const [rings, setRings] = useState(annotations); // Initialize rings with the provided annotations
    const [imageHeight, setImageHeight] = useState(250);

    const addRing = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.nativeEvent.offsetX / rect.width) * 100;
        const y = (event.nativeEvent.offsetY / rect.height) * 100;

        const updatedRings = [...rings, { x, y }];
        setRings(updatedRings);
        onAnnotationsChange(updatedRings); // Update annotations in the parent component.
    };

    const handleHeightChange = (e) => {
        setImageHeight(Number(e.target.value));
    };

    const deleteRing = (index) => {
        const updatedRings = [...rings];
        updatedRings.splice(index, 1);
        setRings(updatedRings);
        onAnnotationsChange(updatedRings);
    };


    return (
        <>
            <div className='absolute top-0 min-h-screen w-full flex flex-col lg:flex-row items-center justify-center bg-white z-30'>
                <div className="description order-3 lg:order-1 w-[95%] mb-10 lg:mb-0 mx-auto lg:w-1/4 bg-gray-200 h-[80vh] mt-20 p-4 rounded-2xl space-y-2 overflow-y-scroll">
                    {rings.map((ring, index) => (
                        <div className='flex items-center justify-center space-x-2' key={index}>
                            <label>{index + 1}:</label>
                            <textarea
                                className='border-2 w-full outline-none bg-[#fafafa] border-[#c6c6c6] p-2 px-4 rounded-xl'
                                name=""
                                id=""
                                cols="30"
                                rows="2"
                                value={annotations[index].description || ''}
                                onChange={(e) => {
                                    const updatedAnnotations = [...rings];
                                    updatedAnnotations[index] = {
                                        x: ring.x,
                                        y: ring.y,
                                        description: e.target.value,
                                    };
                                    setRings(updatedAnnotations);
                                    onAnnotationsChange(updatedAnnotations);
                                }}
                            ></textarea>
                            <FaTrashAlt
                                title='Delete'
                                onClick={() => deleteRing(index)}
                                className='rounded-lg bg-gray-300 p-2 text-4xl text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-black' />
                        </div>
                    ))}
                </div>
                <div className="image h-screen order-1 lg:order-2 overflow-y-scroll lg:w-[50%] flex flex-col items-center justify-center relative">
                    <div style={{ position: 'relative' }}>
                        <div className="close w-full flex justify-end">
                            <AiFillCloseCircle
                                onClick={toggleAnnotation}
                                className='text-red-500 text-5xl z-40 hover:scale-110 transition-all duration-300 cursor-pointer'
                            />
                        </div>
                        <div
                            style={{ width: '100%', position: 'relative' }}
                            onClick={addRing}
                        >
                            <Image
                                src={imageUrl}
                                alt="annotated"
                                height={imageHeight}
                                width={imageHeight}
                            />
                            <svg
                                width='100%'
                                height='100%'
                                style={{ position: 'absolute', top: 0, left: 0 }}
                            >
                                {rings.map((ring, index) => (
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
                                            fontSize="12"
                                            fill="yellow"
                                        >
                                            {index + 1}
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='lg:w-[10%] order-2 lg:order-3 lg:h-screen relative bottom-12 lg:bottom-0 bg-white flex items-center justify-center p-1 rounded-full'>
                    <input
                        title='Change Dimensions'
                        type="range"
                        min={0}
                        max="500"
                        value={imageHeight}
                        onChange={handleHeightChange}
                        className="range lg:-rotate-90"
                    />
                </div>
            </div>
        </>
    );
};

export default Annotate;
