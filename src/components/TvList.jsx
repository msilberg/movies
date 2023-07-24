import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TvItem from './TvItem';

const LOCAL_STORAGE_TV_FAVORITES = 'tvFavorites';
const CLASS_NAME_FAVORITE = 'favorite';

const TvList = props => {
  const [tvFavorites, setTvFavorites] = useState(
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_TV_FAVORITES)
    ) || []
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TV_FAVORITES, JSON.stringify(tvFavorites));
  }, [tvFavorites]);

  const tvShowsCheckboxesRefs = useRef({});
  const setTvShowCheckboxRef = id => ref => {
    tvShowsCheckboxesRefs.current[id] = ref;
  }

  const handleFavoriteChange = ({ target }) => {
    const checkedId = parseInt(target.value, 10);
    if (target.checked) { // tv show added to favorites list
      setTvFavorites([
        ...tvFavorites,
        props.tvList.find(({ id }) => (id === checkedId))
      ]);
    } else { // tv show removed from favorites list
      setTvFavorites(
        tvFavorites.filter(({ id }) => id !== checkedId)
      );
      if (target.className === CLASS_NAME_FAVORITE && tvShowsCheckboxesRefs.current[checkedId]) {
        tvShowsCheckboxesRefs.current[checkedId].checked = false;
      }
    }
  }

  return (
    <Container className='tv-list'>
      <Row>
        <Col>
          <ListGroup>
            <label className='list-header'>Search results</label>
            {!props.tvList.length && <span className='list-msg'>No results</span>}
            {
              props.tvList.map(data => (
                <TvItem
                  data={data}
                  isChecked={!!(tvFavorites.find(({ id }) => id === data?.id))}
                  handleCheckboxChange={handleFavoriteChange}
                  ref={setTvShowCheckboxRef(data?.id)}
                />
              ))
            }
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            <label className='list-header'>Favorites</label>
            {
              tvFavorites.map(data => (
                <TvItem
                  data={data}
                  inputClassName={CLASS_NAME_FAVORITE}
                  handleCheckboxChange={handleFavoriteChange}
                  isChecked={true}
                />
              ))
            }
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

TvList.propTypes = { 
  tvList: PropTypes.array,
};

TvList.defaultProps = {
  tvList: [],
}

export default TvList;