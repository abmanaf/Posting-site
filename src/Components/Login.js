import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import myPic from "../Asset/blog-site.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
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

function Login({ post, setPost }) {
  //const [newMovieTitle, setNewMovieTitle] = useState("");
  //  const [newmessage, setNewReleasedDate] = useState("");

  const [postTitile, setPostTitile] = useState("");
  const [newPostMessage, setNewPostMessage] = useState("");
  //const [isNewMovie, setIsnewMovie] = useState(false);
  const navigate = useNavigate();
  //const [updateMovieTitle, setUpdateMovieTitle] = useState([]);
  //const [uploadFile, setUploadFile] = useState(null);

  const postCollectionRef = collection(db, "Posts");
  const handleSubmitPost = async () => {
    try {
      await addDoc(postCollectionRef, {
        Title: postTitile,
        message: newPostMessage,
        //receivedAnBaba: isNewMovie,
        userId: auth?.currentUser?.uid,
      });
      // Fetch p list after addition
      await fetchpost();
    } catch (err) {
      console.error(err);
      // Handle errors here, e.g., show an alert or log a message
    }
  };

  // Define the fetchpost function
  const fetchpost = async () => {
    try {
      console.log("Current User ID:", auth.currentUser?.uid);
      const data = await getDocs(postCollectionRef);
      const filtrationOfData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPost(filtrationOfData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Call fetchpost on component mount
    fetchpost();
  }, [postCollectionRef, setPost]);

  const handleDelete = async (id, userId) => {
    try {
      // Check if the user has permission to delete
      if (auth.currentUser?.uid === userId) {
        const movieDoc = doc(db, "Posts", id);
        await deleteDoc(movieDoc);
        await fetchpost(); // Update the p list after deletion
      } else {
        alert("Sorry, you don't have permission to delete this.");
      }
    } catch (error) {
      console.error("Error deleting this:", error.message);
    }
  };

  /*
  const onHandleUpdate = async (id) => {
    const movieDoc = doc(db, "Movies", id);
    await updateDoc(movieDoc, { Title: updateMovieTitle });
    fetchpost(); // Update the p list after update
  };
  
  const onHandleUpdate = async (id, userId) => {
    // Check if the user has permission to update
    if (auth.currentUser?.uid === userId) {
      const movieDoc = doc(db, "Posts", id);
      await updateDoc(movieDoc, { Title: updateMovieTitle });
      fetchpost(); // Update the post list after update
    } else {
      alert("Sorry you don't have permission to update this.");
    }
  };
  */
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
    <div>
      <div className="container">
        <div
          className="header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="profile">
            <img src={myPic} alt="" />
            <span style={{ marginLeft: "10px" }}>Alibaba</span>
          </div>
          <div>
            <button className="logoutButton" onClick={LogOut}>
              Log Out
            </button>
          </div>
        </div>
        <br />
        <div className="formContainer">
          <br />
          <div>
            <div className="row">
              <input
                className="inputField"
                placeholder="Message topic"
                type="text"
                required
                onChange={(e) => setPostTitile(e.target.value)}
              />
              <br />
              <textarea
                className="inputField"
                placeholder="Type your Message"
                type="text"
                required
                onChange={(e) => setNewPostMessage(e.target.value)}
              />
            </div>
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
            <button className="postButton" onClick={handleSubmitPost}>
              Post
            </button>
          </div>
        </div>
        <div className="postContainer">
          <h2 style={{ textTransform: "uppercase" }}>Opinion</h2>
          <br />
          <div className="post-container">
            {post.map((p) => (
              <div className="postItem" key={p.id}>
                <h1 className="postTitle">
                  {/* style={{ color: p.receivedAnBaba ? "green" : "red" }} */}
                  {p.Title}
                </h1>
                <p>Message: {p.message}</p>
                {/* 
            <input
              className="updateInput"
              placeholder="Update Message topic"
              required
              onChange={(e) => setUpdateMovieTitle(e.target.value)}
            />
            <button
              className="updateButton"
              onClick={() => onHandleUpdate(p.id, p.userId)}
            >
              Update
            </button>
            */}
                <button
                  className="deleteButton"
                  onClick={() => handleDelete(p.id, p.userId)}
                >
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              </div>
            ))}
          </div>
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
      <footer class="footer">
        <div class="footer__addr">
          <h1 class="footer__logo">Something</h1>

          <h2>Contact</h2>

          <address>
            223 552 669 950
            <br />
            <a class="footer__btn" href="mailto:abdulmanafaliu414@gmail.com">
              Email Us
            </a>
          </address>
        </div>

        <ul class="footer__nav">
          <li class="nav__item">
            <h2 class="nav__title">Media</h2>

            <ul class="nav__ul">
              <li>
                <a href="#">Online</a>
              </li>

              <li>
                <a href="#">Print</a>
              </li>

              <li>
                <a href="#">Alternative Ads</a>
              </li>
            </ul>
          </li>

          <li class="nav__item nav__item--extra">
            <h2 class="nav__title">Technology</h2>

            <ul class="nav__ul nav__ul--extra">
              <li>
                <a href="#">Hardware Design</a>
              </li>

              <li>
                <a href="#">Software Design</a>
              </li>

              <li>
                <a href="#">Digital Signage</a>
              </li>

              <li>
                <a href="#">Automation</a>
              </li>

              <li>
                <a href="#">Artificial Intelligence</a>
              </li>

              <li>
                <a href="#">IoT</a>
              </li>
            </ul>
          </li>

          <li class="nav__item">
            <h2 class="nav__title">Legal</h2>

            <ul class="nav__ul">
              <li>
                <a href="#">Privacy Policy</a>
              </li>

              <li>
                <a href="#">Terms of Use</a>
              </li>

              <li>
                <a href="#">Sitemap</a>
              </li>
            </ul>
          </li>
        </ul>

        <div class="legal">
          <p>&copy; 2024 alibabs. All rights reserved.</p>

          <div class="legal__links">
            <span>
              Made by Alibaba <span class="heart">♥</span>from Ghana
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
