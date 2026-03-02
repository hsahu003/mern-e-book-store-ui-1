"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import styles from "./Book.module.css";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
const apiurl = process.env.NEXT_PUBLIC_API_URL

interface Book {
    _id: string;
    image: string;
    title: string;
    author: string;
    description: string;
    price: string;
    amazonLink: string;
    pdf: string;
  }

const Book = () => {
  const { bookid } = useParams();
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(apiurl + `/api/books/${bookid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }
        const data: Book = await response.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookid, apiurl]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!book) {
        return null;
    }

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                  <Image
                    src={book.image}
                    alt={book.title}
                    className={styles.bookImage}
                    width={320}
                    height={480}
                  />
                </div>
                <div className={styles.details}>
                    <h1 className={styles.bookTitle}>{book.title}</h1>
                    <p className={styles.bookAuthor}>by {book.author}</p>
                    <div
                        className={styles.bookDescription}
                        dangerouslySetInnerHTML={{ __html: book.description }}
                    />

                    <p className={styles.bookPrice}>{book.price}</p>

                    <button className={styles.purchaseButton}
                        onClick={() => {
                               // add payment check here


                                // assuming already paid
                            router.push(`/read/${bookid}`)
                        }}
                    >Start Reading</button>

                    {/* <button className={styles.purchaseButton}>Buy on Amazon</button> */}

                </div>
            </div>

        </div>
    )
}

export default Book