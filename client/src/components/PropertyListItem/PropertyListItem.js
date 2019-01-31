import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import arrow from '../../assets/arrow.svg';
import styles from './PropertyListItem.module.css';

const PropertyListItem = ({item}) => (
  <Link to={`/property/${item.sfid}`} className={styles.item_link}>
    <div className={styles.item}>
      <img className={styles.thumbnail} src={item.thumbnail__c} alt={item.title__c}></img>
      <div className={styles.content}>
        <p className="mb-0">{item.title__c}</p>
        <p className={styles.moreinfo}>{item.city__c} {item.state__c} - ${item.price__c}</p>
      </div>
      <img className={styles.arrow} src={arrow} alt="arrow"/>
    </div>
  </Link>
)

PropertyListItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default PropertyListItem;
