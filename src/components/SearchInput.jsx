import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchInput = props => {
  const [tvSearch, setTvSearch] = useState('');

  useEffect(() => {
    props.cb(tvSearch);
  }, [props, tvSearch]);

  return (
    <Container className='tv-search'>
      <Row>
        <Col>
          <label for='tv-search' className='search-header'>The TV Series Database</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type='text'
            placeholder='Search...'
            value={tvSearch}
            className='tv-search-input'
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