var Griddle = require('griddle-react');
var React = require('react');
var GridStore = require('../stores/gridStore');
var GridActionCreators = require('../actions/gridActionCreators');

GridStore.addChangeListener(function (state) {
  console.log('Grid store has changed', state);
});

var griddleFluxyWrapper = React.createClass({
  getInitialState: function () {
    return {
      results: GridStore.getResults(),
      resultsPerPage: GridStore.getCurrentPageSize(),
      currentPage: GridStore.getCurrentPage(),
      isLoading: GridStore.getIsLoading()
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
      results: GridStore.getResults(),
      resultsPerPage: GridStore.getCurrentPageSize(),
      currentPage: GridStore.getCurrentPage(),
      isLoading: GridStore.getIsLoading()
    });
  },
  sortAscending: function () {
    // TODO:
  },
  sortColumn: function () {
    // TODO:
  },
  maxPage: function () {
    // TODO:
  },
  setPage: function (index, pageSize) {
    GridActionCreators.setPage(index);
  },
  setPageSize: function (pageSize) {
      GridActionCreators.setPageSize(pageSize);
  },
  setFilter: function () {
    // TODO:
  },
  changeSort: function () {
    // TODO:
  },
  render: function () {
    //  enableInfiniteScroll={true}
    return (
      <div className="home">
        <h1 ref="title">Hello world</h1>
        <Griddle useExternal={true} results={this.state.results} externalSetPage={this.setPage} externalChangeSort={this.changeSort}
                 externalSetFilter={this.setFilter} externalSetPageSize={this.setPageSize} externalMaxPage={this.maxPage}
                 externalCurrentPage={this.state.currentPage} externalSortColumn={this.sortColumn} externalSortAscending={this.sortAscending}
                 externalIsLoading={this.state.isLoading} resultsPerPage={this.state.resultsPerPage}/>
      </div>
    );
  }
});

module.exports = griddleFluxyWrapper;
