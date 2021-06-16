import React from 'react'
import './App.scss'
import Rain from './Rain'

class App extends React.Component {

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.titleInput.size = this.titleInput.value.length
    this.titleInput.focus();
  }

  handleChange(evt) {
    this.titleCalc.innerText = evt.target.value
  }

  render() {
    return (
      <div className="App">
        <Rain />
        <div className="content">
          <img className="change-me" src="change-me.svg"/>
          <p
            ref={(calc) => { this.titleCalc = calc; }} 
            className="input"
            id="title-calc"
          >WheatleyLabs</p>
          <input
            ref={(input) => { this.titleInput = input; }} 
            type="text"
            spellcheck="false"
            className="input"
            id="title-text" 
            defaultValue="WheatleyLabs"
            onChange={this.handleChange}
          />
          <a href="mailto: craig@wheatleylabs.co.uk">Get in touch</a>
        </div>
      </div>
    )
  }
}

export default App
