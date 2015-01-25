var Griddle = require('griddle-react');
var React = require('react');
var GridStore = require('../stores/gridStore');

GridStore.addChangeListener(function (state) {
  console.log('Grid store has changed', state);
});

var griddleFluxyWrapper = React.createClass({
  getInitialState: function () {
    return {
      results: GridStore.getResults()
    };
  },
  componentDidMount: function () {
    this.gridStoreListener = GridStore.addChangeListener(this.OnGridStoreChanged);
  },
  componentWillUnmount: function (nextProps) {
    this.gridStoreListener.dispose();
  },
  onUserStoreChanged: function () {
    this.setState({
      results: GridStore.getResults()
    });
  },
  isLoading: function () {
    // TODO:
  },
  sortAscending: function () {
    // TODO:
  },
  sortColumn: function () {
    // TODO:
  },
  currentPage: function () {
    // TODO:
  },
  maxPage: function () {
    // TODO:
  },
  setPageSize: function () {
    // TODO:
  },
  setFilter: function () {
    // TODO:
  },
  changeSort: function () {
    // TODO:
  },
  setPage: function (index, pageSize) {
    // TODO:
  },
  render: function () {
    //  enableInfiniteScroll={true}
    return (
      <div className="home">
        <h1 ref="title">Hello world</h1>
        <Griddle useExternal={true} externalSetPage={this.setPage} externalChangeSort={this.changeSort}
                 externalSetFilter={this.setFilter} externalSetPageSize={this.setPageSize} externalMaxPage={this.maxPage}
                 externalCurrentPage={this.currentPage} externalSortColumn={this.sortColumn} externalSortAscending={this.sortAscending}
                 externalIsLoading={this.isLoading}/>
      </div>
    );
  }
});

module.exports = griddleFluxyWrapper;
