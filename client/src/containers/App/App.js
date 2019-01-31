import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import PropertyList from '../../components/PropertyList/PropertyList';

class App extends Component {

  state = {
    list: [],
    isNextPageLoading: false,
    apiCounter: 0 // use apiCounter to fake big list
  };

  loadProperties = async () => {
    const response = await fetch('/property');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  loadNextPage = ({ startIndex, stopIndex }) => {
    this.setState({
      isNextPageLoading: true
    });
    this.loadProperties()
      .then(res => {
        const updatedList = [...this.state.list, ...res.payload];
        this.setState( (prevState, props) => {
          return {
            list: updatedList,
            apiCounter: prevState.apiCounter + 1,
            isNextPageLoading: false
          }
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const {list, apiCounter, isNextPageLoading} = this.state
    return (
      <div className="App">
        <Header title="Properties" />
        <PropertyList
          list={list}
          loadProperties={this.loadProperties}
          hasNextPage={apiCounter < 100 ? true : false}
          isNextPageLoading={isNextPageLoading}
          loadNextPage={this.loadNextPage}
        />
      </div>
    );
  }
}

export default App;
