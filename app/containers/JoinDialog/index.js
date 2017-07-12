import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { createStructuredSelector } from 'reselect';
import SubmitButton from '../../components/SubmitButton';
import H2 from '../../components/H2';

import { makeSbSelector } from '../Table/selectors';
import { makeSelectProxyAddr } from '../AccountProvider/selectors';
import { formatNtz } from '../../utils/amountFormatter';

export class JoinDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      amount: props.sb * 40,
    };
    this.updateAmount = this.updateAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateAmount(value) {
    const amount = value;
    this.setState({ amount });
  }

  handleSubmit() {
    this.props.handleJoin(this.props.pos, this.state.amount);
  }

  render() {
    const min = this.props.sb * 40;
    const tableMax = this.props.sb * 200;
    const max = (this.props.balance < tableMax) ? this.props.balance - (this.props.balance % this.props.sb) : tableMax;
    if (this.props.balance < min) {
      return (
        <div style={{ minWidth: '20em' }}>
          <H2>Sorry!</H2>
          <p>Your balance is not sufficient to join this table!</p>
          <SubmitButton onClick={this.props.modalDismiss}>OK</SubmitButton>
        </div>
      );
    }
    return (
      <div style={{ minWidth: '20em' }}>
        <Slider
          data-orientation="vertical"
          value={this.state.amount}
          tooltip={false}
          min={min}
          max={max}
          step={this.props.sb}
          onChange={this.updateAmount}
        >
        </Slider>
        <div>Max: {formatNtz(max)} NTZ</div>
        <div>{ (this.state) ? formatNtz(this.state.amount) : formatNtz(min) } NTZ</div>
        <SubmitButton onClick={this.handleSubmit}>Join</SubmitButton>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  sb: makeSbSelector(),
  proxyAddr: makeSelectProxyAddr(),
});

JoinDialog.propTypes = {
  handleJoin: PropTypes.func,
  modalDismiss: PropTypes.func,
  pos: PropTypes.any,
  sb: PropTypes.number,
  balance: React.PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinDialog);
