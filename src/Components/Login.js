import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Auth, signOut } from "firebase/auth";
import { auth, db, storage } from "../Config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function Login({ movieList, setMovieList }) {
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newreleaseDate, setNewReleasedDate] = useState("");
  //const [isNewMovie, setIsnewMovie] = useState(false);
  const navigate = useNavigate();
  const [updateMovieTitle, setUpdateMovieTitle] = useState([]);
  //const [uploadFile, setUploadFile] = useState(null);

  const moviesCollectionRef = collection(db, "Posts");

  const handleSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        Title: newMovieTitle,
        releaseDate: newreleaseDate,
        //receivedAnBaba: isNewMovie,
        userId: auth?.currentUser?.uid,
      });
      // Fetch movie list after addition
      await fetchMovieList();
    } catch (err) {
      console.error(err);
      // Handle errors here, e.g., show an alert or log a message
    }
  };

  // Define the fetchMovieList function
  const fetchMovieList = async () => {
    try {
      console.log("Current User ID:", auth.currentUser?.uid);
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

  useEffect(() => {
    // Call fetchMovieList on component mount
    fetchMovieList();
  }, [moviesCollectionRef, setMovieList]);

  const handleDelete = async (id, userId) => {
    try {
      // Check if the user has permission to delete
      if (auth.currentUser?.uid === userId) {
        const movieDoc = doc(db, "Posts", id);
        await deleteDoc(movieDoc);
        await fetchMovieList(); // Update the movie list after deletion
      } else {
        console.log("You don't have permission to delete this movie.");
      }
    } catch (error) {
      console.error("Error deleting movie:", error.message);
    }
  };

  /*
  const onHandleUpdate = async (id) => {
    const movieDoc = doc(db, "Movies", id);
    await updateDoc(movieDoc, { Title: updateMovieTitle });
    fetchMovieList(); // Update the movie list after update
  };
  */
  const onHandleUpdate = async (id, userId) => {
    // Check if the user has permission to update
    if (auth.currentUser?.uid === userId) {
      const movieDoc = doc(db, "Posts", id);
      await updateDoc(movieDoc, { Title: updateMovieTitle });
      fetchMovieList(); // Update the movie list after update
    } else {
      console.log("You don't have permission to update this movie.");
    }
  };
  /*

  const handleSubmitFile = async () => {
    if (!uploadFile) return;
    const fileFolder = ref(storage, `ProjectFiles/${uploadFile.name}`);
    try {
      await uploadBytes(fileFolder, uploadFile);
    } catch (err) {
      console.error(err);
    }
  };
*/
  const LogOut = async () => {
    window.alert(
      `Hi ${auth?.currentUser?.email} are you sure you want to log out`
    );
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  //console.log(auth?.currentUser?.uid);

  return (
    <div className="container">
      <div className="formContainer">
        <br />
        <div>
          <input
            className="inputField"
            placeholder="Message topic"
            type="text"
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          <input
            className="inputField"
            placeholder="Type your Message"
            type="text"
            onChange={(e) => setNewReleasedDate(e.target.value)}
          />
          {/*
          <label className="checkboxLabel">
            <input
              type="checkbox"
              checked={isNewMovie}
              onChange={(e) => setIsnewMovie(e.target.checked)}
            />
            Mark as serious
          </label>
           */}
          <button className="postButton" onClick={handleSubmitMovie}>
            Post
          </button>
          <button className="logoutButton" onClick={LogOut}>
            Log Out
          </button>
        </div>
      </div>
      <div className="movieListContainer">
        <h2 style={{ textTransform: "uppercase" }}>Opinion</h2>
        {movieList.map((movie) => (
          <div className="movieItem" key={movie.id}>
            <h1 className="movieTitle">
              {/* style={{ color: movie.receivedAnBaba ? "green" : "red" }} */}
              {movie.Title}
            </h1>
            <p>Message: {movie.releaseDate}</p>
            <input
              className="updateInput"
              placeholder="Update Message topic"
              onChange={(e) => setUpdateMovieTitle(e.target.value)}
            />
            <button
              className="updateButton"
              onClick={() => onHandleUpdate(movie.id, movie.userId)}
            >
              Update
            </button>
            <button
              className="deleteButton"
              onClick={() => handleDelete(movie.id, movie.userId)}
            >
              Delete
            </button>
            <hr />
          </div>
        ))}
      </div>
      <div>
        {/* Uncomment the following when you decide to implement file upload */}
        {/*
          <input
            className="fileInput"
            type="file"
            onChange={(e) => setUploadFile(e.target.files[0])}
          />
          <button className="postButton" onClick={handleSubmitFile}>
            Upload File
          </button>
        */}
      </div>
    </div>
  );
}

export default Login;
