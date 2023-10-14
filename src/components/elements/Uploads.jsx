import { jost } from '@/utils/fonts';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { AiFillEdit, AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import Annotate from './Annotate';
import reportContext from '@/context/report/reportContext';

const Uploads = () => {
    const [reportDetails, setReportDetails] = useState({
        name: '',
        dateTime: '',
        file: null,
        description: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAnnotation, setShowAnnotation] = useState(false);
    const [annotations, setAnnotations] = useState([]); // Store annotations for all images
    const { documentUpload } = useContext(reportContext)

    const handleFileUpload = (e) => {
        const selectedFiles = e.target.files;

        if (selectedFiles) {
            const previews = [];
            const newAnnotations = Array(selectedFiles.length).fill([]); // Initialize annotations for new images

            for (let i = 0; i < selectedFiles.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        previews.push(e.target.result);
                        if (previews.length === selectedFiles.length) {
                            setImagePreviews(previews);
                            setAnnotations(newAnnotations); // Update annotations for new images
                        }
                    }
                };
                reader.readAsDataURL(selectedFiles[i]);
            }

            setReportDetails({ ...reportDetails, file: selectedFiles });
        }
    };

    const handleImageAnnotationChange = (imageIndex, imageAnnotations) => {
        // Update annotations for the specific image.
        const updatedAnnotations = [...annotations];
        updatedAnnotations[imageIndex] = imageAnnotations;
        setAnnotations(updatedAnnotations);
        setReportDetails({ ...reportDetails, description: updatedAnnotations });
    };

    // Navigate to the previous image with looping
    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            setCurrentImageIndex(imagePreviews.length - 1); // Wrap around to the last image
        }
    };

    // Navigate to the next image with looping
    const nextImage = () => {
        if (currentImageIndex < imagePreviews.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0); // Wrap around to the first image
        }
    };

    const toggleAnnotation = () => {
        setShowAnnotation(!showAnnotation);
    }

    const saveAnnotationsToDatabase = async () => {
        console.log(reportDetails)
        const id = await documentUpload(reportDetails)
        if (id) {
            setReportDetails({
                name: '',
                dateTime: '',
                file: null,
                description: [],
            })
            setImagePreviews([])
            setAnnotations([])
            setCurrentImageIndex(0)
        }
    }

    const handleChange = (e) => {
        setReportDetails({ ...reportDetails, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className={`min-h-screen ${jost.className} relative pt-20 md:pt-24 pb-10 xl:pt-16 xl:pb-0 w-full flex items-center justify-center bg-cover bg-center bg-[url("https://img.freepik.com/premium-photo/hand-doctor-reassuring-her-female-patient_33855-13.jpg?w=1060")]`}>
                <div className='absolute h-full inset-0 bg-gradient-to-l from-transparent via-opacity-50 to-black'></div>
                <div className="uploadContent relative z-20 w-full lg:mx-40 flex items-center justify-center space-x-8 px-2">
                    <div className='uploadForm w-full bg-[rgba(255,255,255,0.1)] text-white flex flex-col lg:flex-row space-y-8 lg:space-y-0 rounded-xl p-4 md:p-8 backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.1)]'>
                        <div className="images relative flex items-center justify-center lg:order-2 lg:ml-8 lg:w-1/2 rounded-xl">
                            {!imagePreviews.length ? (
                                <label className='w-full cursor-pointer flex justify-center' htmlFor="uploadFile">
                                    <BsFillCloudUploadFill className='text-[20rem] text-[rgba(255,255,255,0.5)]' />
                                    <input onChange={handleFileUpload} className="hidden" type="file" name="uploadFile" id="uploadFile" multiple />
                                </label>
                            ) : (
                                <div className="relative carousel w-full h-80 rounded-box">
                                    <div className={`carousel-item w-full`}>
                                        <Image
                                            className='w-full'
                                            src={imagePreviews[currentImageIndex]}
                                            alt={`Selected Image`}
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                    <div className="absolute w-full flex top-1/2 justify-between">
                                        <button onClick={prevImage}>
                                            <AiFillLeftCircle className='text-4xl ml-1 hover:scale-110 transition-all duration-300' />
                                        </button>
                                        <button onClick={nextImage}>
                                            <AiFillRightCircle className='text-4xl mr-1 hover:scale-110 transition-all duration-300' />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {imagePreviews.length > 0 &&
                                <button onClick={toggleAnnotation} className="btn btn-active rounded-full shadow-2xl shadow-black absolute bottom-6">
                                    <AiFillEdit className='text-2xl' />
                                </button>}
                        </div>
                        <div className='uploadForm lg:order-1 lg:w-1/2 bg-[rgba(255,255,255,0.1)] text-white flex flex-col rounded-xl space-y-8 p-8 backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.1)]'>
                            <h1 className='font-bold text-6xl'>Upload Product</h1>
                            <input
                                required
                                className='outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]'
                                type='text'
                                placeholder='Enter the name'
                                name='name'
                                id='name'
                                value={reportDetails.name}
                                onChange={handleChange}
                            />
                            <input
                                required
                                className='outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]'
                                type='datetime-local'
                                placeholder='Enter the name'
                                name='dateTime'
                                id='dateTime'
                                value={reportDetails.dateTime}
                                onChange={handleChange}
                            />
                            <button className="btn btn-active" onClick={saveAnnotationsToDatabase}>
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
                {showAnnotation &&
                    <Annotate
                        imageUrl={imagePreviews[currentImageIndex]}
                        annotations={annotations[currentImageIndex]}
                        onAnnotationsChange={(newAnnotations) => handleImageAnnotationChange(currentImageIndex, newAnnotations)}
                        toggleAnnotation={toggleAnnotation}
                    />
                }
            </div>
        </>
    );
};

export default Uploads;
