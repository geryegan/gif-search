import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormControl } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      gifs: []
    };
  }
  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }
  submit(){
    console.log(this.state.searchValue);
    axios.get('http://api.giphy.com/v1/gifs/search?q=' + this.state.searchValue + '&api_key=dc6zaTOxFJmzC')
      .then(
        (data) => {
          console.log(this);
          this.setState({
            gifs: data.data.data
          })
          console.log(data.data.data);
        }
      )
    this.setState({searchValue: ''})
  }
  gifRender(){
    console.log('gifs array in render', this.state.gifs);
    console.log('gifRender called');
    return this.state.gifs.map(
      (gif) => <img key={gif.id} src={gif.images.fixed_height.url} alt='a gif' />
    )
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <FormControl
            value={this.state.searchValue}
            onChange={this.handleChange.bind(this)}
            type='text'
          />
          <Button onClick={this.submit.bind(this)}>Submit</Button>
        </div>
        <div>
          {this.gifRender()}
          
        </div>
      </div>
    );
  }
}

export default App;
