import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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
     <button type="button" onClick={this.retrieveApiResponse}>Refresh</button>
      <ul>
       {
         this.state.apiResponse.map((item) => {
           return <li key={item.id}>ID: {item.id}, title: {item.title}</li>
         })
       }
      </ul>
    </div>
    );
  }
});
ReactDOM.render(<App source="http://jsonplaceholder.typicode.com/posts" />,
document.getElementById('example'));
