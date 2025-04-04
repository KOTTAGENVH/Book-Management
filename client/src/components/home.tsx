
import { useBackgroundContext } from '@/contextApi/darkModeState';
import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getAllBooks } from '@/app/api/services/books/api';
import Card from './home/card';

interface ProtectedProps {
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

function Protected({ token }: ProtectedProps) {
  const {status} = useBackgroundContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['id'],
    queryFn: () => getAllBooks(token),
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
  return (
    <div className={`mt-28 h-auto md:h-screen min-w-screen overflow-y-auto overflow-x-hidden ${status ? "bg-bg-gradient-two" : "bg-bg-gradient-one"}  relative overflow-y-auto overflow-x-hidden relative `}>
     {/* Filters */}
     <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or author"
          className="w-full md:w-1/2 p-3 rounded-lg shadow-md outline-none focus:ring-2 ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Year Dropdown */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full md:w-1/4 p-3 rounded-lg shadow-md outline-none focus:ring-2 ring-green-400"
        >
          {publicationYears.map((year: string) => (
                <option key={year} value={year}>
                  {year === 'All' ? 'All Years' : year}
                </option>
                ))}
        </select>
      </div>
          <div className='flex flex-row flex-wrap justify-center items-center w-screen h-auto'>
       { filteredBooks && filteredBooks.length > 0 ? (
        filteredBooks.map((book: Book) => (
          <Card  book={book} key={book.id} />
        ))
      ) : (
        <div className="mt-32 flex justify-center items-center h-full">
          <p className="text-lg text-gray-600">No books available</p>
        </div>
      )
    }
    </div>
    </div>
  )
}

export default Protected;
