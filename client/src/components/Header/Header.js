import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

const Header = ({ title }) => (
  <div className={styles.header}>{title}</div>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header;
