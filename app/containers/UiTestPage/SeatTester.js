import React from 'react';
import SeatComponent from '../../components/Seat2';

  // statusMsg={{
  //   type: 'danger',
  //   text: 'Raise',
  //   recent: true,
  // }}

const buttonStyle = {
  margin: '0.5em',
  backgroundColor: 'gray',
};

class SeatTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlayer: false,
      cards: null,
      chipCount: '0',
      username: 'bob',
      statusMsg: {},
    };
    this.handleActiveClick = this.handleActiveClick.bind(this);
    this.handleChipCountChange = this.handleChipCountChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }
  handleActiveClick(e) {
    if (e.target.value === 'sit-out') {
      this.setState({
        activePlayer: false,
        statusMsg: {
          type: 'info',
          text: 'Sitting-out',
          recent: true,
        },
      });
    }
    if (e.target.value === 'stand-up') {
      this.setState({
        activePlayer: false,
        statusMsg: {
          type: 'info',
          text: 'Standing-up',
          recent: true,
        },
      });
    }
    if (e.target.value === 'join-table') {
      this.setState({
        activePlayer: true,
        statusMsg: {},
      });
    }
  }
  handleChipCountChange(e) {
    e.preventDefault();
    this.setState({ chipCount: e.target.value });
  }
  handleStatusChange(e) {
    let status = {};
    if (e.target.value === 'all-in') {
      status = {
        type: 'warning',
        text: 'All-in',
        recent: true,
      };
    }
    if (e.target.value === 'bet') {
      status = {
        type: 'danger',
        text: 'Bet',
        recent: true,
      };
    }
    if (e.target.value === 'call') {
      status = {
        type: 'success',
        text: 'Call',
        recent: true,
      };
    }
    if (e.target.value === 'check') {
      status = {
        type: 'success',
        text: 'Check',
        recent: true,
      };
    }
    if (e.target.value === 'fold') {
      status = {
        type: 'info',
        text: 'Fold',
        recent: true,
      };
    }
    if (e.target.value === 'raise') {
      status = {
        type: 'danger',
        text: 'Raise',
        recent: true,
      };
    }
    if (e.target.value === 'winner') {
      status = {
        type: 'warning',
        text: 'Winner!',
        recent: true,
      };
    }
    this.setState({ statusMsg: status });
  }
  handleUsernameChange(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }
  render() {
    return (
      <div>
        <form>
          <div style={{ display: 'flex', backgroundColor: 'lightblue' }}>
            <div>
              Username <input
                style={{ backgroundColor: 'white' }}
                type="text"
                onChange={(e) => this.handleUsernameChange(e)}
              /><br />
              ChipCount <input
                style={{ backgroundColor: 'white' }}
                type="text"
                onChange={(e) => this.handleChipCountChange(e)}
              /><br />
              <button style={buttonStyle} onClick={() => this.handleActiveClick('join-table')}> Join Table</button>
              <button style={buttonStyle} onClick={() => this.handleActiveClick('sit-out')}> Sit-out</button>
              <button style={buttonStyle} onClick={() => this.handleActiveClick('stand-up')}> Stand-up</button>
            </div>
            <div style={{ marginLeft: '2em' }}>
              <input type="radio" name="status" value="call" onClick={(e) => this.handleStatusChange(e)} /> Call<br />
              <input type="radio" name="status" value="check" onClick={(e) => this.handleStatusChange(e)} /> Check<br />
              <input type="radio" name="status" value="bet" onClick={(e) => this.handleStatusChange(e)} /> Bet<br />
              <input type="radio" name="status" value="raise" onClick={(e) => this.handleStatusChange(e)} /> Raise<br />
              <input type="radio" name="status" value="all-in" onClick={(e) => this.handleStatusChange(e)} /> All-In<br />
              <input type="radio" name="status" value="fold" onClick={(e) => this.handleStatusChange(e)} /> Fold<br />
              <input type="radio" name="status" value="winner" onClick={(e) => this.handleStatusChange(e)} /> Winner<br />
            </div>
          </div>
        </form>
        <SeatComponent
          activePlayer={this.state.activePlayer}
          cards={this.state.cards}
          chipCount={this.state.chipCount}
          username={this.state.username}
          statusMsg={this.state.statusMsg}
        />
      </div>
    );
  }
}

export default SeatTester;
