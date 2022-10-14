import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import liff from '@line/liff';

function App() {

  const [pictureUrl, setPictureUrl] = useState(logo)
  const [idToken, setIdToken] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [userId, setUserId] = useState('')

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
    idToken = idToken;
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName)
      setPictureUrl(profile.pictureUrl)
      setStatusMessage(profile.statusMessage)
      setUserId(profile.userId)
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    initLine()
  }, [])


  return (
    <div className="App">
      <div style={{ textAlign: 'center' }}>
        <h1>React with LINE Login</h1>
        <hr />
        <img src={pictureUrl} width="300px" height="300px" />
        <p style={{ textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}><b>id token: </b> {idToken}</p>
        <p style={{ textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}><b>display name: </b> {displayName}</p>
        <p style={{ textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}><b>status message: </b> {statusMessage}</p>
        <p style={{ textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}><b>user id: </b> {userId}</p>

        <button onClick={() => logout()} style={{ width: '80%', height: '30px' }}>Logout</button>
      </div>
    </div>
  );
}

export default App;
