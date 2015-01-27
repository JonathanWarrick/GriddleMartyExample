var Marty = require('marty');
var GridConstants = require('../constants/gridConstants');
var _ = require('underscore');
var allResults = require('./gridStore_fakeData');

var GridStore = Marty.createStore({
  handlers: {
    setCurrentPage: GridConstants.SET_CURRENT_PAGE,
    setCurrentPageSize: GridConstants.SET_CURRENT_PAGE_SIZE,
    setSort: GridConstants.SET_SORT,
    setFilter: GridConstants.SET_FILTER
  },
  getInitialState: function() {
    var pageSize = 10;
    var newState = {
      page: 0,
      pageSize: pageSize,
      maxPage: Math.ceil(allResults.length / pageSize),
      filter: '',
      sortColumn: 'id',
      sortAscending: true,
      results: [],
      isLoading: false,
      infinite: true
    };

    return this.updateStateResults(newState);
  },
  getResults: function() {
    return this.state.results;
  },
  updateResults: function() {
    this.state = this.updateStateResults(this.state);
    this.hasChanged();
  },
  updateStateResults: function(newState) {

    // A lot of the logic should live on the server -- This is more to represent a self-contained example.

    var sortData = function(sort, sortAscending, data) {
      //sorting should generally happen wherever the data is coming from
      sortedData = _.sortBy(data, function(item){
        return item[sort];
      });

      if(sortAscending === false){
        sortedData.reverse();
      }

      return sortedData;
    }

    // Sort the data.
    var sortedData = sortData(newState.sortColumn, newState.sortAscending, allResults);

    // Filter the data, if necessary.
    if(newState.filter !== ""){
      var filter = newState.filter;
      sortedData = _.filter(sortedData,
        function(item) {
            var arr = _.values(item);
            for(var i = 0; i < arr.length; i++){
               if ((arr[i]||"").toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0){
                return true;
               }
            }

            return false;
        });
    }

    // Grab the index and slice the array of sorted, filtered data.
    var index = newState.page === 0 ? 0 : newState.page * newState.pageSize;

    newState.results = sortedData.slice(newState.infinite ? 0 : index, index + newState.pageSize > sortedData.length ? sortedData.length : index + newState.pageSize);
    newState.maxPage = Math.ceil(sortedData.length / newState.pageSize);

    // As I mentioned above, this is likely going to happen on a server
    // or something along those lines, but this is just for a self-contained example.
    return newState;
  },
  getCurrentPage: function() {
    return this.state.page;
  },
  setCurrentPage: function(page) {
    this.state.page = page;
    this.updateResults();
  },
  getCurrentPageSize: function() {
    return this.state.pageSize;
  },
  setCurrentPageSize: function(pageSize) {
    this.state.pageSize = pageSize;
    this.state.page = 0; // Reset the page.
    this.updateResults();
  },
  getSortColumn: function() {
    return this.state.sortColumn;
  },
  getSortAscending: function() {
    return this.state.sortAscending;
  },
  setSort: function(sort, sortAscending) {
    this.state.sortColumn = sort;
    this.state.sortAscending = sortAscending
    this.state.page = 0; // Reset the page.
    this.updateResults();
  },
  getMaxPage: function() {
    return this.state.maxPage;
  },
  getIsLoading: function() {
    return this.state.isLoading;
  },
  getFilter: function() {
    return this.state.filter;
  },
  setFilter: function(filter) {
    this.state.filter = filter;
    this.state.page = 0; // Reset the page.
    this.updateResults();
  }
});

module.exports = GridStore;
