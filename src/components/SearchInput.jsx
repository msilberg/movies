import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LOCAL_STORAGE_TV_SEARCH = 'tvSearch';

const SearchInput = (props) => {
  const [tvSearch, setTvSearch] = useState(localStorage.getItem(LOCAL_STORAGE_TV_SEARCH));

  useEffect(() => {
    props.cb(tvSearch);
    localStorage.setItem(LOCAL_STORAGE_TV_SEARCH, tvSearch)
  }, [props, tvSearch]);

  return (
    <Container>
      <Row>
        <Col>
          <label for='tv-search'>The TV Series Database</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type='text'
            id='tv-search'
            placeholder='Search...'
            value={tvSearch}
            onChange={event => {
              setTvSearch(event.target.value);
            }}
         />
        </Col>
      </Row>
    </Container>
  );
}

SearchInput.propTypes = { 
  cb: PropTypes.func,
};

SearchInput.defaultProps = {
  cb: () => {},
}

export default SearchInput;