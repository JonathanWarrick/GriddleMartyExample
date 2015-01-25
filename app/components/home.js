/** @jsx React.DOM */

var React = require('react');
var GriddleFluxyWrapper = require('./GriddleFluxyWrapper');

var Home = React.createClass({
  render: function () {
    return (
      <div className="home">
        <h1 ref="title">Hello world</h1>
        <GriddleFluxyWrapper />
      </div>
    );
  }
});

module.exports = Home;
