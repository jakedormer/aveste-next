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
  state = {
    username: '',
    password: ''
  };

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
		      />
		      <TextField
		        name='password'
		        onChange={this.handle_change('password')}
		        label="Password"
		        type="password"
		        value={this.state.password}
		      />
		      <Button primary submit>
		        Login
		      </Button>
		  </FormLayout>
      </Form>
    );
  }
}

export default LoginForm;