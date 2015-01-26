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
    var page = 0, pageSize = 10, maxPage = Math.ceil(allResults.length / pageSize);

    //This should interact with the data source to get the page at the given index
    var index = page === 0 ? 0 : page * pageSize;

    var results = allResults.slice(index, index + pageSize > allResults.length ? allResults.length : index + pageSize);

    return {
      page: page,
      pageSize: pageSize,
      maxPage: maxPage,
      filter: '',
      sortColumn: 'id',
      sortAscending: true,
      results: results,
      isLoading: false,
      infinite: true
    };
  },
  getResults: function() {
    return this.state.results;
  },
  updateResults: function() {

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

    //filtering should generally occur on the server (or wherever)
    //this is a lot of code for what should normally just be a method that is used to pass data back and forth
    var sortedData = sortData(this.state.sortColumn, this.state.sortAscending, allResults);

    if(this.state.filter !== ""){
      var filter = this.state.filter;
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

    //This should interact with the data source to get the page at the given index
    var index = this.state.page === 0 ? 0 : this.state.page * this.state.pageSize;

    this.state.results = sortedData.slice(this.state.infinite ? 0 : index, index + this.state.pageSize > sortedData.length ? sortedData.length : index + this.state.pageSize);
    this.state.maxPage = Math.ceil(sortedData.length / this.state.pageSize);

    this.hasChanged();
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
