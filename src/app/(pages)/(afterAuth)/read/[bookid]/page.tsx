"use client";
import React, { useEffect, useState } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Navbar from '@/app/components/Navbar'
import styles from "./Read.module.css";
import { useParams } from "next/navigation"
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

  const Read = () => {
    const { bookid } = useParams();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
      const fetchBook = async () => {
        try {
          const response = await fetch(apiurl + `/api/books/${bookid}`);
          if (!response.ok) {
            throw new Error("Failed to fetch book data");
          }
          const data: Book = await response.json();
          const url = 'http://localhost:5000/' + data.pdf;
          setPdfUrl(url);
        } catch (err) {
          console.error(err);
        }
      };
      fetchBook();
    }, [bookid, apiurl]);

    return (
      <div className={styles.main}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.viewer}>
            {pdfUrl ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={pdfUrl}
                  plugins={[defaultLayoutPluginInstance]}
                  theme="dark"
                />
              </Worker>
            ) : (
              <p>Loading PDF...</p>
            )}
          </div>
        </div>
      </div>
    )
  }

export default Read
