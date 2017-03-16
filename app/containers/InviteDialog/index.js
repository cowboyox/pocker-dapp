/**
 * Created by helge on 10.03.17.
 */


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FormGroup from '../../components/Form/FormGroup';

import messages from './messages';

const validate = (values) => {
  const errors = {};
  if (!values.get('email')) {
    errors.amount = 'Required';
  }
  return errors;
};

const warn = () => {
  const warnings = {};
  return warnings;
};

/* eslint-disable react/prop-types */
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <FormGroup>
    <Label htmlFor={input.name}>{label}</Label>
    <Input {...input} placeholder={label} type={type} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </FormGroup>
);
/* eslint-enable react/prop-types */

class InviteDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    values.get('email');
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <Field name="email" component={renderField} type="text" placeholder="e-mail" />
          {error && <strong>{error}</strong>}
          <div>
            <Button type="submit" disabled={submitting}>Submit</Button>
          </div>
        </Form>
      </div>
    );
  }
}

InviteDialog.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  error: PropTypes.any,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'join', validate, warn })(InviteDialog));
