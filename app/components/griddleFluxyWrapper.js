var Griddle = require('griddle-react');
var React = require('react');
var GridStore = require('../stores/gridStore');
var GridActionCreators = require('../actions/gridActionCreators');

var griddleFluxyWrapper = React.createClass({
  getInitialState: function () {
    return {
      results: GridStore.getResults(),
      resultsPerPage: GridStore.getCurrentPageSize(),
      currentPage: GridStore.getCurrentPage(),
      maxPage:  GridStore.getMaxPage(),
      isLoading: GridStore.getIsLoading(),
      sortColumn: GridStore.getSortColumn(),
      sortAscending: GridStore.getSortAscending()
    };
  },
  componentWillMount: function () {
    this.gridStoreListener = GridStore.addChangeListener(this.OnGridStoreChanged);
  },
  componentWillUnmount: function (nextProps) {
    this.gridStoreListener.dispose();
  },
  OnGridStoreChanged: function () {
    var state = {
      results: GridStore.getResults(),
      resultsPerPage: GridStore.getCurrentPageSize(),
      currentPage: GridStore.getCurrentPage(),
      maxPage:  GridStore.getMaxPage(),
      isLoading: GridStore.getIsLoading(),
      sortColumn: GridStore.getSortColumn(),
      sortAscending: GridStore.getSortAscending()
    };

    this.setState(state);
  },
  setPage: function (index, pageSize) {
    GridActionCreators.setPage(index);
  },
  setPageSize: function (pageSize) {
    GridActionCreators.setPageSize(pageSize);
  },
  setFilter: function (filter) {
    GridActionCreators.setFilter(filter);
  },
  changeSort: function (sort, sortAscending) {
    GridActionCreators.setSort(sort, sortAscending);
  },
  render: function () {
    return (
      <div className="home">
        <Griddle useExternal={true} enableInfiniteScroll={true} bodyHeight={400} results={this.state.results} externalSetPage={this.setPage} externalChangeSort={this.changeSort}
                 externalSetFilter={this.setFilter} externalSetPageSize={this.setPageSize} externalMaxPage={this.state.maxPage}
                 externalCurrentPage={this.state.currentPage} externalSortColumn={this.state.sortColumn} externalSortAscending={this.state.sortAscending}
                 externalIsLoading={this.state.isLoading} resultsPerPage={this.state.resultsPerPage} showFilter={true}/>
      </div>
    );
  }
});

module.exports = griddleFluxyWrapper;
