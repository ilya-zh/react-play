import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
global.jQuery = require('jquery');
import Griddle from 'griddle-react';
import { Button } from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');
require("../css/styles.css");


var TableButton = React.createClass({

  action: function() {
    // do submit stuff here
  },
  render: function() {
    return (
    <div>
      <Button disabled={this.props.rowData.id > 1} onClick={this.action}>
        {this.props.rowData.id > 1 ? "Freeze" :"Thaw"}
      </Button>
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
      <div className="container-fluid">
        <div className="form-group">
        <Button bsStyle="primary" onClick={this.retrieveApiResponse}>
          Refresh
        </Button>
        </div>
        <Griddle results={this.state.apiResponse} showFilter={true} columns={["id", "title", "body", "Action"]}
         showPager={false} resultsPerPage={3} columnMetadata={columnMeta}
         tableClassName="table-hover" />
      </div>
    );
  }
});
ReactDOM.render(<App source="http://jsonplaceholder.typicode.com/posts" />,
document.getElementById('example'));
