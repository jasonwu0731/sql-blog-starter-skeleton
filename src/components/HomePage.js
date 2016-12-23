import React, { Component } from 'react';


class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Hello, {this.props.user.name} </h1>
              <h3>Welcome to Blog!</h3>
              {
                this.props.user ? (<p><a className="btn btn-success btn-lg" href="#/articles" role="button">文章列表</a></p>)
                : (<p>Please <a href="#/login">login</a> to start your own blog!</p>)
              }
              {
                this.props.user ? (<p><a className="btn btn-success btn-lg" href="#/articles/new" role="button">發表新文章</a></p>):null
              }
              <h5>This website is maintained by Chien-Sheng (Jason) Wu!</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
