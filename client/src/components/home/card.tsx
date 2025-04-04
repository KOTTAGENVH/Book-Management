import { useBackgroundContext } from '@/contextApi/darkModeState';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    email: string;
}

interface CardProps {
    book: Book;
}

function Card({ book }: CardProps) {
    const { status } = useBackgroundContext();
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={`${expanded ? 'h-auto' : 'h-60'
            } rounded-2xl shadow-lg p-6 w-auto m-8  bg-white/20 backdrop-blur-4xl rounded-2xl shadow-xl  overflow-hidden`}>
            <h2 className={`text-2xl font-bold mb-2 line-clamp-1  ${status ? "text-gray-300" : "text-gray-800"}`}>{book.title}</h2>
            <p className={`line-clamp-1  ${status ? "text-gray-300" : "text-gray-600"} mb-1`}><span className="font-semibold">Author:</span> {book.author}</p>
            <p className={`line-clamp-1  ${status ? "text-gray-300" : "text-gray-600"} mb-1`}><span className="font-semibold">Genre:</span> {book.genre}</p>
            <p className={`line-clamp-1 ${status ? "text-gray-300" : "text-gray-600"} mb-1`}><span className="font-semibold">Published:</span> {book.publicationYear}</p>
            <p className={`line-clamp-1 ${status ? "text-white" : "text-white"} text-sm mt-4 italic`}>{book.email}</p>
            <div className='w-full justify-end
 flex'>
                <motion.div
                    className="box relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <button
                        title="expand"
                        className={` bg-bg-gradient-five ${status ? " hover:bg-hover-h-bg-gradient" : "hover:bg-hover-h-bg-gradient-two"} backdrop-blur-lg flex items-center ${status ? "text-white" : "text-black-700"} p-4 rounded-3xl shadow-lg hover:shadow-none mr-2`}
                        onClick={() => setExpanded(!expanded)}
                    >
                        <FontAwesomeIcon icon={faEye} className={`${status ? "text-blue-950" : "text-white"}`} />

                    </button>
                </motion.div>
                <motion.div
                    className="box relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <button
                        title="edit"
                        className={`mr-2 bg-bg-gradient-five ${status ? " hover:bg-hover-h-bg-gradient" : "hover:bg-hover-h-bg-gradient-two"} backdrop-blur-lg flex items-center ${status ? "text-white" : "text-black-700"} p-4 rounded-3xl shadow-lg hover:shadow-none`}
                        onClick={() => setExpanded(!expanded)}
                    >
                        <FontAwesomeIcon icon={faPen} className={`${status ? "text-blue-950" : "text-white"}`} />

                    </button>
                </motion.div>
                <motion.div
                    className="box relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <button
                        title="profile"
                        className={` bg-bg-gradient-five ${status ? " hover:bg-hover-h-bg-gradient" : "hover:bg-hover-h-bg-gradient-two"} backdrop-blur-lg flex items-center ${status ? "text-white" : "text-black-700"} p-4 rounded-3xl shadow-lg hover:shadow-none`}
                        onClick={() => setExpanded(!expanded)}
                    >
                        <FontAwesomeIcon icon={faTrash} className={`${status ? "text-red-950" : "text-red-300"}`} />

                    </button>
                </motion.div>
            </div>
        </div>
    );
}

export default Card;
