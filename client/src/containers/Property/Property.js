import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Broker from '../../components/Broker/Broker';
import Spinner from '../../components/Spinner/Spinner';
import styles from './Property.module.css';

class Property extends Component {
  state = {
    isLoading: true,
    property: null
  }

  componentDidMount() {
    this.loadProperty()
      .then(res => {
        this.setState({
          property: res.payload,
          isLoading: false
        })
      })
      .catch(err => console.log(err));
  }

  loadProperty = async () => {
    const response = await fetch(`/property/${this.props.match.params.id}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const {property, isLoading} = this.state;
    return (
      <React.Fragment>
        {property &&
          <React.Fragment>
            <Header title={property.title__c}/>

            <div className={styles.property_container}>
              <div className={styles.property_image_wrap}>
                <img className={styles.property_image} src={property.picture__c} alt={property.title__c} />
              </div>
              <div className={styles.content}>
                <div className={styles.description}>
                  <p className="text-bold">{property.address__c}</p>
                  <p className="mb-0">{property.description__c}</p>
                </div>
                <div className={styles.content_row}>
                  <span>Bedrooms: </span>
                  <span>{property.beds__c}</span>
                </div>
                <div className={styles.content_row}>
                  <span>Bathrooms: </span>
                  <span>{property.baths__c}</span>
                </div>
                <div className={styles.content_row}>
                  <span>Asking price: </span>
                  <span>{property.price__c}</span>
                </div>

                <Broker
                  picture={property.broker__c_picture__c}
                  name={property.broker__c_name}
                  title={property.broker__c_title__c}
                  phone={property.broker__c_phone__c}
                  email={property.broker__c_email__c} />
                
                <div className={styles.back_link}><Link to="/">Back to Properties List</Link></div>
              </div>
            </div>
          </React.Fragment>
        }
        {!property && isLoading &&
          <div style={{margin: '100px 0', textAlign: 'center'}}><Spinner/></div>
        }
        {!property && !isLoading &&
          <React.Fragment>
            <Header title="Property not found."/>
            <div className={styles.error_container}>
              <p>No property found. How about coming back <Link to="/">Home</Link>?</p>
            </div>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default Property;
