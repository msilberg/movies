import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    <div>
      <ListGroup>
        <h3>Favorites</h3>
        {
          tvFavorites.map(tvFavorite => {
            return (
              <ListGroup.Item>
                <input
                  type="checkbox"
                  value={tvFavorite?.id}
                  className={CLASS_NAME_FAVORITE}
                  onChange={handleFavoriteChange}
                  checked
                />
                <span>{tvFavorite.name}</span>
              </ListGroup.Item>
            );
          })
        }
      </ListGroup>
      <ListGroup>
        {props.tvList.length && <h3>Search results</h3>}
        {
          props.tvList.map(item => {

            return (
              <ListGroup.Item>
                <input
                  type='checkbox'
                  value={item?.id}
                  onChange={handleFavoriteChange}
                  ref={setTvShowCheckboxRef(item?.id)}
                  checked={!!(tvFavorites.find(({ id }) => id === item?.id))}
                />
                <span>{item.name}</span>
              </ListGroup.Item>
            );
          })
        }
      </ListGroup>
    </div>
  );
}

TvList.propTypes = { 
  tvList: PropTypes.array,
};

TvList.defaultProps = {
  tvList: [],
}

export default TvList;