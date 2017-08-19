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
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleClearMessage = this.handleClearMessage.bind(this);
  }
  render() {
    const message_obj = { ...this.state, clearMessage: this.handleClearMessage };
    return (
      <div className="container">
        <div>
          <input type="text" name="content" value={this.state.content}
            onChange={e => this.handleChangeContent(e)}
            onKeyPress={e => this.handleKeyPress(e)}
          />
        </div>
        <div>
          <MessageBoard { ...message_obj } />
        </div>
      </div>
    );
  }
  handleChangeContent(e) {
    const { value } = e.target;
    this.setState({
      content: value
    })
  }
  handleKeyPress(e) {
    const { value } = e.target;
    if (e.key === 'Enter') {
      const new_content = { avatar: true, message: value, createAt: new Date().toLocaleString() };
      this.setState({
        content: '',
        data_list: [new_content, ...this.state.data_list]
      })
    }
  }
  handleClearMessage() {
    this.setState({
      data_list: []
    })
  }
};

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    }
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleDisplay(e) {
    this.setState({
      flag: !this.state.flag
    })
  }

  handleClear(e) {
    this.props.clearMessage();
    this.setState({
      flag: false,
    })
  }

  render() {
    let { data_list, maxLength } = this.props;
    let result = (data_list.length > maxLength && !this.state.flag) ? data_list.filter((list, index) => index < 3) : data_list;
    let mode = null;
    return (
      <div>
        <ul>
          {result.map((current, index) => <Message {...current} key={index} />)}
        </ul>
        {data_list[0] && <button onClick={this.handleClear}>CLEAR ALL</button>}
        {(data_list.length >= 4) ? <button onClick={this.handleDisplay}>{(this.state.flag) ? 'LESS' : 'MORE'}</button> :
          null
        }
      </div>
    )
  }
}

const Message = ({ message, createAt }) => {
  return (
    <li>
      <div className="info">
        <div className="content">
          <div>
            {message}
          </div>
          <div>
            {createAt}
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