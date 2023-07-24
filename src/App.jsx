import './App.css';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

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
                .map(({
                  show: {
                    id,
                    name,
                    rating: {
                      average: averageRating
                    },
                    genres,
                    image,
                  } 
                }) => ({
                  id,
                  name,
                  rating: averageRating,
                  genres,
                  imageUrl: image?.medium,
                }))
            );
          }
        });
    } else {
      setTvList([]);
    }
  }, [tvListSearch]); 

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12}>
            <SearchInput cb={updateTvListSearch} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <TvList tvList={tvList} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
