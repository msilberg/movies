import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';

const NO_IMAGE_PLACEHOLDER_URL = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

const TvItem = ({ data, inputClassName, isChecked, handleCheckboxChange, ref }) => (
  <ListGroup.Item className='tv-list-item'>
    <Container>
      <Row>
        <Col xs={2}>
          <img src={data?.imageUrl || NO_IMAGE_PLACEHOLDER_URL} alt='Poster' />
        </Col>
        <Col xs={10}>
          <Row>
            <Col xs={10}>
              <span className='tv-list-item-name'>{data.name}</span>
            </Col>
            <Col xs={2}>
              <label className='checkbox-container'>
                <input
                  type='checkbox'
                  value={data.id}
                  className={inputClassName}
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                  ref={ref}
                />
                <span className='check-mark'>
                  {isChecked ? (
                    <FontAwesomeIcon icon={heartSolid} className='check-mark-checked' />
                  ) : (
                    <FontAwesomeIcon icon={heartRegular} />
                  )}
                </span>
              </label>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <span className='tv-list-item-rating'>{data?.rating || ''}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <span className='tv-list-item-genres'>{Array.isArray(data?.genres) ? data.genres.join(' | ') : ''}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </ListGroup.Item>
);

TvItem.propTypes = { 
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    genres: PropTypes.array,
    imageUrl: PropTypes.string,
  }).isRequired,
  inputClassName: PropTypes.string,
  isChecked: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
  ref: PropTypes.func,
};

TvItem.defaultProps = {
  inputClassName: '',
  isChecked: false,
  handleCheckboxChange: () => {},
  ref: () => {},
}

export default TvItem;