import React, { useEffect } from 'react';
import { Navbar } from './Components/Navbar/Navbar';
import {
  generateUser,
  generateSong,
  generateRevenue
} from './utils/MockData';
import { getRandomIndex } from './utils/utils';

import './App.css';

function App() {
  useEffect(() => {
    const numUsers = 10000;
    const numSongs = 100000;

    const revenue = [];
    const users = Array(numUsers).fill(0).map(() => {
      const user = generateUser(.7);
      revenue.push(generateRevenue(user));
      return user;
    });

    const songs = Array(numSongs).fill(0).map(() => {
      const userIndex = getRandomIndex(numUsers - 1);
      const { _uuid, joinDate } = users[userIndex];
      return generateSong(_uuid, joinDate);
    });

    console.log({ users, songs, revenue })
  }, []);


  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
