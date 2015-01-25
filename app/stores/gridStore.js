var Marty = require('marty');
var GridConstants = require('../constants/gridConstants');
var _ = require('underscore');
var allResults = require('./gridStore_fakeData');

var GridStore = Marty.createStore({
  handlers: {
    setCurrentPage: GridConstants.SET_CURRENT_PAGE,
    setCurrentPageSize: GridConstants.SET_CURRENT_PAGE_SIZE
  },
  getInitialState: function() {
    var page = 0, pageSize = 10;
    var results = this.getPageOfResultsFromAllResults(page, pageSize);
    var maxPage = Math.round(allResults.length / pageSize);

    return {
      page: page,
      pageSize: pageSize,
      maxPage: maxPage,
      filter: '',
      sortColumn: '',
      sortAscending: false,
      results: results,
      isLoading: false
    };
  },
  getResults: function() {
    return this.state.results;
  },
  updateResults: function(filter, sortColumn, sortAscending, page, pageSize) {
    // if infinite, more logic, etc.
    // this.state.results = this.state.results.concat(this.getPageOfResultsFromAllResults(page, pageSize));

    this.state.results = this.getPageOfResultsFromAllResults(page, pageSize);

    this.hasChanged();
  },
  getCurrentPage: function() {
    return this.state.page;
  },
  setCurrentPage: function(page) {
    this.state.page = page;
    this.updateResults(this.state.filter, this.state.sortColumn, this.state.sortAscending, this.state.page, this.state.pageSize);
  },
  getCurrentPageSize: function() {
    return this.state.pageSize;
  },
  setCurrentPageSize: function(pageSize) {
    this.state.pageSize = pageSize;
    this.state.page = 1; // Reset the page.
    this.updateResults(this.state.filter, this.state.sortColumn, this.state.sortAscending, this.state.page, this.state.pageSize);
  },
  getMaxPage: function() {
    return this.state.maxPage;
  },
  getIsLoading: function() {
    return this.state.isLoading;
  },
  getPageOfResultsFromAllResults: function(page, pageSize) {
    //This should interact with the data source to get the page at the given index
    var number = page === 0 ? 0 : page * pageSize;

    return allResults.slice(number, number + pageSize > allResults.length ? allResults.length : number + pageSize);
  }
});

module.exports = GridStore;
