var Marty = require('marty');
var GridConstants = require('../constants/gridConstants');

var GridActionCreators = Marty.createActionCreators({
  setPage: GridConstants.SET_CURRENT_PAGE(function (page) {
    this.dispatch(page);
  }),
  setPageSize: GridConstants.SET_CURRENT_PAGE_SIZE(function (pageSize) {
    this.dispatch(pageSize);
  }),
});

module.exports = GridActionCreators;