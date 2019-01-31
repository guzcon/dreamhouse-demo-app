import React from 'react';
import PropTypes from 'prop-types';
import styles from './PropertyInfo.module.css';

const PropertyInfo = ({
  address,
  description,
  beds,
  baths,
  price
}) => (
  <React.Fragment>
    <div className={styles.description}>
      <p className="text-bold">{address}</p>
      <p className="mb-0">{description}</p>
    </div>
    <div className={styles.info_row}>
      <span>Bedrooms: </span>
      <span>{beds}</span>
    </div>
    <div className={styles.info_row}>
      <span>Bathrooms: </span>
      <span>{baths}</span>
    </div>
    <div className={styles.info_row}>
      <span>Asking price: </span>
      <span>${price}</span>
    </div>
  </React.Fragment>
);

PropertyInfo.propTypes = {
  address: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  beds: PropTypes.number.isRequired,
  baths: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
}

export default PropertyInfo;
