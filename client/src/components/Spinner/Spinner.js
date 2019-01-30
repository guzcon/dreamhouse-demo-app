import React from 'react';
import PropTypes from 'prop-types';
import styles from './Spinner.module.css';

const Spinner = ({width, height}) => (
  <div className={styles.lds_ellipsis} styles={{width, height}}><div></div><div></div><div></div><div></div></div>
);

Spinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}

Spinner.defaultProps = {
  width: '50px',
  height: '50px'
}

export default Spinner;
