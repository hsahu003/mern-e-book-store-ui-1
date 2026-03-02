"use client";

import Navbar from '@/app/components/Navbar'
import React, { useEffect, useMemo, useState } from "react";
import styles from "./KindleLibrary.module.css";
import { FaBookOpen } from "react-icons/fa";
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";
import { MdBook } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
const apiurl = process.env.NEXT_PUBLIC_API_URL

interface Book {
    _id: string;
    image: string;
    title: string;
    author: string;
}

const Library = () => {
      const router = useRouter();
      const [show, setShow] = useState(false);
      const [allBooks, setAllBooks] = useState<Book[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [searchQuery, setSearchQuery] = useState('');
      const [sortBy, setSortBy] = useState<'recent' | 'title' | 'author'>('recent');
      const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

      useEffect(() => {
        const fetchAllBooks = async () => {
          try {
            const response = await fetch(apiurl + '/api/books/all');
            if (!response.ok) {
                  throw new Error("Failed to fetch books");
            }

            const data: Book[] = await response.json();
            setAllBooks(data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching books:', error);
            const err = error as Error;
            setError(err.message);
            setLoading(false);
          }
        }
        fetchAllBooks();
      }, [])

      const filteredAndSortedBooks = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        let books = allBooks;

        if (query) {
          books = books.filter((book) => {
            const title = book.title?.toLowerCase() ?? '';
            const author = book.author?.toLowerCase() ?? '';
            return title.includes(query) || author.includes(query);
          });
        }

        if (sortBy === 'title') {
          books = [...books].sort((a, b) =>
            (a.title ?? '').localeCompare(b.title ?? ''),
          );
        } else if (sortBy === 'author') {
          books = [...books].sort((a, b) =>
            (a.author ?? '').localeCompare(b.author ?? ''),
          );
        }

        return books;
      }, [allBooks, searchQuery, sortBy]);

      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error: {error}</p>;
      }

      return (
        <div className={styles.main}>
            <Navbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewChange={setViewMode}
              onFilterToggle={() => setShow((prev) => !prev)}
            />
            <div className={styles.row}>
                <div className={styles.left}>
                    <div className={styles.menuMain}>
                        <FaBookOpen className={styles.bookicon} />
                        <p>Library</p>
                        {show ? (
                            <FaChevronDown
                                onClick={() => setShow(!show)}
                                className={styles.toRight}
                            />
                        ) : (
                            <FaChevronRight
                                onClick={() => setShow(!show)}
                                className={styles.toRight}
                            />
                        )}
                    </div>
                    {show && (
                        <div className={styles.menuItems}>
                            <span>All Titles</span>
                            <span>Books</span>
                            <span>Comics</span>
                            <span>Samples</span>
                        </div>
                    )}
                    <div className={styles.menuMain}>
                        <MdBook className={styles.bookicon2} />
                        <p>Notes & Highlights</p>
                    </div>
                </div>
                <div className={styles.right}>
                    <h1>Trending</h1>
                    <div className={viewMode === 'grid' ? styles.books : styles.booksList}>
                        {filteredAndSortedBooks.map((book) => (
                            <div
                                onClick={() => {
                                    router.push(`/book/${book._id}`);
                                }}
                                key={book._id}
                                className={viewMode === 'grid' ? styles.bookItem : styles.bookItemList}
                            >
                                <Image
                                  src={book.image}
                                  alt={book.title}
                                  className={viewMode === 'grid' ? styles.bookImage : styles.bookImageList}
                                  width={220}
                                  height={320}
                                />
                                <div className={viewMode === 'grid' ? styles.bookDetails : styles.bookDetailsList}>
                                  <h3 className={styles.bookTitle}>{book.title}</h3>
                                  <p className={styles.bookAuthor}>{book.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )
}

export default Library