import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Griddle from 'griddle-react';

var TableButton = React.createClass({

  action: function() {
    // do submit stuff here
  },
  render: function() {
    return (
    <div>
      <button type="button" disabled={this.props.rowData.id > 1} onClick={this.action}>
        {this.props.rowData.id > 1 ? "Freeze" :"Thaw"}
      </button>
    </div>
    );
  }
});

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
  var columnMeta = [
    {
    "columnName": "Action",
    "customComponent": TableButton
    }];
    return (
    <div>
      <Griddle results={this.state.apiResponse} showFilter={true} columns={["id", "title", "body", "Action"]}
       showPager={false} resultsPerPage={5} columnMetadata={columnMeta} />
      <button type="button" onClick={this.retrieveApiResponse}>Refresh</button>
    </div>
    );
  }
});
ReactDOM.render(<App source="http://jsonplaceholder.typicode.com/posts" />,
document.getElementById('example'));
