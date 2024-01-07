import React from "react";
import { useState } from "react";
import { db } from "../Config/firebase";
import {
  deleteDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
  //uploadFile,
} from "firebase/firestore";

function Posts({ movieList, setMovieList }) {
  const [updateMovieTitle, setUpdateMovieTitle] = useState([]);
  //const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "Posts");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filtrationOfData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filtrationOfData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const movieDoc = doc(db, "Posts", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };
  const onHandleUpdate = async (id) => {
    const movieDoc = doc(db, "Posts", id);
    await updateDoc(movieDoc, { Title: updateMovieTitle });
    getMovieList();
  };
  return (
    <div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnBaba ? "green" : "red" }}>
              {movie.Title}
            </h1>
            <p>Data: {movie.releaseDate}</p>
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
            <input onChange={(e) => setUpdateMovieTitle(e.target.value)} />
            <button onClick={() => onHandleUpdate(movie.id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
