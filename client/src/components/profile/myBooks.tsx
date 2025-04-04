import { useBackgroundContext } from '@/contextApi/darkModeState';
import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getBooksByEmail } from '@/app/api/services/books/api';
import Card from '../home/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Bounce, toast } from 'react-toastify';

interface MyBooksProps {
    token: string;
}

interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    email: string;
}

function MyBooks({ token }: MyBooksProps) {
    const { status } = useBackgroundContext();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['id'],
        queryFn: () => getBooksByEmail(token),
    });
    const [search, setSearch] = useState('');
    const [selectedYear, setSelectedYear] = useState<string>('All');

    // Extract years for the filter dropdown
    const publicationYears = useMemo(() => {
        const years: Set<number> = new Set(data?.map((book: Book) => book.publicationYear));
        return ['All', ...Array.from(years as Set<number>).sort((a, b) => b - a).map(String)];
    }, [data]);

    const filteredBooks = useMemo(() => {
        return data?.filter((book: Book) => {
            const matchesSearch: boolean =
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase());

            const matchesYear: boolean =
                selectedYear === 'All' || String(book.publicationYear) === selectedYear;

            return matchesSearch && matchesYear;
        }) || [];
    }, [data, search, selectedYear]);

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

    return (
        <div className={`mt-10 h-auto md:h-screen min-w-screen overflow-y-auto overflow-x-hidden ${status ? "bg-bg-gradient-two" : "bg-bg-gradient-one"}  relative overflow-y-auto overflow-x-hidden relative `}>
            <h1 className={`text-2xl md:text-4xl text-center font-bold mb-6 ${status ? "text-gray-200" : "text-gray-900"}`}>
                My Books
            </h1>
            {/* Filters */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                {/* Year Dropdown */}
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className={`w-auto md:w-1/4 p-3  outline-none focus:ring-2 ring-blue-400 bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl ${status ? "text-gray-200" : "text-gray-900"}`}
                >
                    {publicationYears.map((year: string) => (
                        <option key={year} value={year}>
                            {year === 'All' ? 'All Years' : year}
                        </option>
                    ))}
                </select>
                {/* Search */}
                {/* Search with clear icon */}
                <div className="relative w-auto md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        className={`w-full p-3 pr-10 outline-none focus:none ring-none bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl ${status ? "text-gray-200" : "text-gray-900"}`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer hover:scale-110 transition-transform"
                        />
                    )}
                </div>
            </div>
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
                <div className='flex flex-row flex-wrap justify-center items-center w-screen h-auto'>
                    {filteredBooks && filteredBooks.length > 0 ? (
                        filteredBooks.map((book: Book) => (
                            <Card book={book} key={book.id} />
                        ))
                    ) : (
                        <div className="mt-32 flex justify-center items-center h-full">
                            <p className={`text-lg md:text-2xl ${status ? "text-gray-200" : "text-gray-900"}`}>No books available</p>
                        </div>
                    )
                    }
                </div>
            )}
        </div>
    )
}

export default MyBooks;
