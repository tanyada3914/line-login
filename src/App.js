import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  const initLine = () => {
    liff.init({ liffId: '1657559918-NqzQz1GA' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);
      InsertProfile(profile)
    }).catch(err => console.error(err));
  }

  const InsertProfile = (profile) => {
    try {
      let res = axios({
        method: 'post',
        url: 'https://b0f0-119-42-78-6.ap.ngrok.io/member/InsertProfile',
        headers: {
          'Content-Type': 'application/json'
        },
        data: profile
      })
      if (res.data.status_code === '200') {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initLine();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: "center" }}>
          <h1>React with LINE Login test bot1</h1>
          <hr />
          <img src={pictureUrl} width="300px" height="300px" />
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>

          <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default App;