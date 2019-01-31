import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer,
        InfiniteLoader,
        List,
        CellMeasurer,
        CellMeasurerCache } from 'react-virtualized';
import PropertyListItem from '../PropertyListItem/PropertyListItem';
import Spinner from '../Spinner/Spinner';
import styles from './PropertyList.module.css';

const PropertyList = ({
    list,
    hasNextPage,
    isNextPageLoading,
    loadNextPage
  }) => {

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = hasNextPage
    ? list.length + 1
    : list.length;

  // Load 1 page of items at a time, empty call back if InfiniteLoader asks to load more than once.
  const loadMoreRows = isNextPageLoading
    ? () => {}
    : loadNextPage

  // Every row is loaded except of loading indicator row.
  const isRowLoaded = ({ index }) => !hasNextPage || index < list.length

  const rowRenderer = ({ key, index, style, parent}) => {
    let content;
    if (!isRowLoaded({ index })) {
      content = <div style={{padding: '30px', textAlign: 'center'}}><Spinner/></div>;
    } else {
      content = <PropertyListItem item={list[index]} />;
    }
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}>
        <div style={style}>
          {content}
        </div>
      </CellMeasurer>
    );
  }

  // cache the measurement for cell
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100
  });

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <div className={styles.list_container}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                rowCount={rowCount}
                deferredMeasurementCache={cache}
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer}
                width={width}
                className={styles.list}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </InfiniteLoader>
  );

}

PropertyList.propTypes = {
  list: PropTypes.array.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  isNextPageLoading: PropTypes.bool.isRequired,
  loadNextPage: PropTypes.func.isRequired
}

export default PropertyList;
