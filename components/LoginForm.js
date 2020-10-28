import React from 'react';
import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  SettingToggle,
  Stack,
  TextField,
  TextStyle
} from '@shopify/polaris';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handle_change = this.handle_change.bind(this);

  }

 handle_change = (field) => {
    return (value) => this.setState({ [field]: value });
  };

 

  render() {
    return (
      <Form onSubmit={e => this.props.handle_login(e, this.state)}>
      	<FormLayout>
		      <TextField
		        name='username'
		        onChange={this.handle_change('username')}
		        label="Email"
		        type="email"
		        value={this.state.username}
            disabled={this.props.username_disabled}
		      />
		      <TextField
		        name='password'
		        onChange={this.handle_change('password')}
		        label="Password"
		        type="password"
		        value={this.state.password}
            disabled={this.props.password_disabled}
		      />
		      <Button primary={this.props.button_primary} destructive={this.props.button_destructive} submit>
		        {this.props.in_out}
		      </Button>
		  </FormLayout>
      </Form>
    );
  }
}

export default LoginForm;