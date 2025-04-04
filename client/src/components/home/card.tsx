import { useBackgroundContext } from '@/contextApi/darkModeState';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile } from '@/app/api/services/profile/api';
import useAuth from '@/hooks/useAuth';
import { Bounce, toast } from 'react-toastify';
import { deleteBook } from '@/app/api/services/books/api';
import UpdateModal from './updateModal';

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
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [, token, ,] = useAuth();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['email'],
        queryFn: () => token ? getUserProfile(token) : Promise.reject('Token is null'),
    });

    const queryClient = useQueryClient();

    if (isError || error) {
        toast.error("Sorry, an error occurred.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const handleDelete = async (id: string) => {
        try {
            if (!token) {
                throw new Error("Token is null");
            }
            const response = await deleteBook(token, id);
            if (response) {
                toast.success("Book deleted successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                queryClient.invalidateQueries({ queryKey: ['id'] });
            }
        } catch {
            toast.error("Sorry, an error occurred.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    return (
        <div className={`${expanded ? 'h-auto' : 'h-60'
            } rounded-2xl shadow-lg p-6 w-80 m-8  bg-white/20 backdrop-blur-4xl rounded-2xl shadow-xl  overflow-hidden`}>
            {isLoading ? (
                <>
                    <div role="status" className="flex flex-col items-center gap-4">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="text-white text-sm font-medium">Loading...</span>
                    </div>
                </>
            ) : (
                <>
                    <h2 className={`text-2xl font-bold mb-2 ${!expanded ? 'line-clamp-1' : ''}  ${status ? "text-gray-300" : "text-gray-800"}`}>{book.title}</h2>
                    <p className={`${!expanded ? 'line-clamp-1' : ''}  ${status ? "text-gray-300" : "text-gray-600"} mb-1`}><span className="font-semibold">Author:</span> {book.author}</p>
                    <p className={`${!expanded ? 'line-clamp-1' : ''}  ${status ? "text-gray-300" : "text-gray-600"} mb-1`}><span className="font-semibold">Genre:</span> {book.genre}</p>
                    <p className={`${!expanded ? 'line-clamp-1' : ''} ${status ? "text-gray-300" : "text-gray-600"} mb-1`}><span className="font-semibold">Published:</span> {book.publicationYear}</p>
                    <p className={`${!expanded ? 'line-clamp-1' : ''} ${status ? "text-white" : "text-white"} text-sm mt-4 italic`}>{book.email}</p>
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
                                <FontAwesomeIcon icon={expanded ? faWindowClose : faEye} className={`${status ? "text-blue-950" : "text-white"}`} />

                            </button>
                        </motion.div>
                        {data?.email === book.email && (
                            <>
                                <motion.div
                                    className="box relative"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <button
                                        title="edit"
                                        className={`mr-2 bg-bg-gradient-five ${status ? " hover:bg-hover-h-bg-gradient" : "hover:bg-hover-h-bg-gradient-two"} backdrop-blur-lg flex items-center ${status ? "text-white" : "text-black-700"} p-4 rounded-3xl shadow-lg hover:shadow-none`}
                                        onClick={() => {
                                            setSelectedBook(book);
                                            setUpdateModalOpen(true);
                                        }}
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
                                        onClick={() => handleDelete(book.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} className={`${status ? "text-red-950" : "text-red-300"}`} />

                                    </button>
                                </motion.div>
                            </>
                        )}
                    </div>
                </>
            )}
            {selectedBook && (
                <UpdateModal
                    isOpen={updateModalOpen}
                    onClose={() => setUpdateModalOpen(false)}
                    book={selectedBook}
                />
            )}
        </div>
    );
}

export default Card;
