import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Griddle from 'griddle-react';

var App = React.createClass({

  getInitialState: function(){
    return {apiResponse : [], ajaxRefreshPeriod: 1};
  },
  retrieveApiResponse: function () {
    this.setState({apiResponse:[]});
    var url = this.props.source;
    $.get(url, function(json) {
      if (this.isMounted()) {
          this.setState({apiResponse: json});
      }
    }.bind(this));
  },
  componentDidMount: function() {
    this.retrieveApiResponse();
  },
  render: function() {
    return (
    <div>
      <Griddle results={this.state.apiResponse} showFilter={true} columns={["userId", "id", "title", "body"]}
       showPager={false} resultsPerPage={100000} />
      <button type="button" onClick={this.retrieveApiResponse}>Refresh</button>
    </div>
    );
  }
});
ReactDOM.render(<App source="http://jsonplaceholder.typicode.com/posts" />,
document.getElementById('example'));
