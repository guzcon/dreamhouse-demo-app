import React from 'react';
import PropTypes from 'prop-types';
import styles from './Broker.module.css';

const Broker = ({
  picture,
  name,
  title,
  phone,
  email
}) => (
  <div className={styles.broker}>
    <div className={styles.broker_image_wrap}>
      <img className={styles.broker_image} src={picture} alt={name}/>
    </div>
    <div className={styles.broker_content}>
      <p className="text-bold mb-xs">{name}</p>
      <p className="text-small mb-xs">{title}</p>
      <p className="mb-xs"><a className="link-unstyled" href={`tel:${phone}`}>{phone}</a></p>
      <p className="mb-0"><a href={`mailto:${email}`}>{email}</a></p>
    </div>
  </div>
)

Broker.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default Broker;
