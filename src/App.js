import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { getOwnerList } from './nft-list';
import './App.css';

function App() {
  const [ list, setList ] = useState([]);
  useEffect(() => {
    (async () => {
      setList(Object.entries(await getOwnerList()));
    })().catch((err) => console.error(err));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
	  { list.sort((a, b) => a[1] - b[1]).map(([ idx, address ]) => <div>{idx},{address}</div>) }
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
