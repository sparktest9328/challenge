import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles/test.less';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_list: [],
      content: '',
      maxLength: 3
    }
    this.handleMaxLength = this.handleMaxLength.bind(this);
    this.handleData_list = this.handleData_list.bind(this); /* Add handleData_list function*/
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
  }
  render() {
    const { data_list, content, maxLength } = this.state;
    const message_obj = { data_list, maxLength, handleMaxLength: this.handleMaxLength, handleData_list: this.handleData_list }; /* input handleData_list function*/
    return (
      <div className="container">
        <div>
          <input type="text" name="content" value={ content }
            onChange={ e => this.handleChangeContent(e) }
            onKeyPress={ e => this.handleKeyPress(e) }
          />
        </div>
        <div>
          <MessageBoard { ...message_obj } />
        </div>
      </div>
    );
  }
  handleChangeContent (e) {
    const { value } = e.target;
    this.setState({
      content: value
    })
  }
  handleMaxLength (maxLength) {
    this.setState({ maxLength })
  }
  handleData_list (data_list) { /* Add handleData_list function, reset data_list*/
    this.setState({ data_list })
  }
  handleKeyPress (e) {
    const { value } = e.target;
    if (e.key === 'Enter') {
      this.state.maxLength = 3 /* reset maxLength to show 3 messages*/
      const new_content = [{ avatar: true, message: value, createAt: new Date().toLocaleString() }]; /* change object to an array. ie:add []*/
      this.setState({
        content: '',
        data_list: new_content.concat(this.state.data_list) /* reverse the order */
      })
    }
  }
};

const MessageBoard = ({ data_list, maxLength, handleMaxLength, handleData_list }) => { /* input handleData_list function*/
  let exceeded = data_list.length > maxLength;
  let result = data_list
  /* determine whether data_list > max-maxLength or not */
  if(exceeded) {
    result = result.slice(0, maxLength) /* slice data_list */
    return (
      <div>
        <button onClick={() => handleData_list([])}>Delete All</button> {/* Delete data_list */}
        <ul>
          { result.map((v, d) => <Message info={ v } key={ d }/>) }
        </ul>
        <button onClick={() => handleMaxLength(data_list.length)}>More</button> {/* Show all data_list */}
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => handleData_list([])}>Delete All</button> {/* Delete data_list */}
        <ul>
          { result.map((v, d) => <Message info={ v } key={ d }/>) }
        </ul>
      </div>
    );
  }
}

const Message = ({ info }) => {
  return (
    <li>
      <div className="info">
        <div className="content">
          <div>
            { info.message }
          </div>
          <div>
            { info.createAt }
          </div>
        </div>
      </div>
    </li>
  );
}

render(
  <Index />,
  document.getElementById('react-root')
);
