import './App.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SearchInput from './components/SearchInput';
import TvList from './components/TvList';

function App() {
  const [tvListSearch, setTvListSearch] = useState('');
  const [tvList, setTvList] = useState([]);

  const updateTvListSearch = tvListSearch => {
    setTvListSearch(tvListSearch);
  }

  useEffect(() => {
    if (tvListSearch) {
      fetch(`https://api.tvmaze.com/search/shows?q=${tvListSearch.toString().trim().toLowerCase()}`)
        .then(response => {
          if (response?.status === 200) {
            return response.json();
          }
        })
        .then(data => {
          if (Array.isArray(data)) {
            setTvList(
              data
                .map(({ show: { id, name } }) => ({
                  id, name
                }))
            );
          }
        });
    }
  }, [tvListSearch]); 

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={6}>
            <SearchInput cb={updateTvListSearch} />
          </Col>
          <Col xs={6}>
            <TvList tvList={tvList} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
