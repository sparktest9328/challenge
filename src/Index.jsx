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
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
  }
  render() {
    const { data_list, content, maxLength } = this.state;
    const message_obj = { data_list, maxLength, handleMaxLength: this.handleMaxLength };
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
  handleKeyPress (e) {
    const { value } = e.target;
    if (e.key === 'Enter') {
      const new_content = { avatar: true, message: value, createAt: new Date().toLocaleString() };
      this.setState({
        content: '',
        data_list: this.state.data_list.concat(new_content)
      })
    }
  }
};

const MessageBoard = ({ data_list, maxLength, handleMaxLength }) => {
  let exceeded = data_list.length > maxLength;
  let result = data_list
  return (
    <ul>
      { result.map((v, d) => <Message info={ v } key={ d }/>) }
    </ul>
  );
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