import {
  AccountConnection,
  Banner,
  Button,
  Card,
  Form,
  FormLayout,
  Heading,
  Layout,
  Page,
  SettingToggle,
  Stack,
  Subheading,
  TextField,
  TextStyle
} from '@shopify/polaris';

import LoginForm from '../components/LoginForm'


class AnnotatedLayout extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       enabled: false,
       logged_in: false,
       username: '',
       password: '',
     };

   }


  componentDidMount() {
    console.log(localStorage.getItem('aveste_token'));
      if (localStorage.getItem('aveste_token')) {
        fetch('http://localhost:8000/api/current_user/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Token ${localStorage.getItem('aveste_token')}`
            },

        })

        // A list of promises

        .then(function(response) {

          if (response.status == 200) {
            console.log(response.status)

            return response.json()
          }
        })

        .then(json => {

          console.log(json)
            

          this.setState({
            logged_in: true,
            username: json.username,
            password: ''
          });

          })

        .catch(error => {
            console.log(error)
        });
      };

    }

  handle_login = (e, data) => {
    console.log(data);
    console.log(JSON.stringify(data))
    console.log(data.username)

    e.preventDefault();

    fetch('http://localhost:8000/api-token-auth/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
       body: JSON.stringify(data)
      })

      // A list of promises

        .then(function(response) {

          if (response.status == 200) {
            console.log(response.status)
            console.log(JSON.stringify(data).username)


            return response.json()
          }
        })


        .then(json => {

            console.log(json);

            const token = json.token;
            localStorage.setItem('aveste_token', token);

            this.setState({
              logged_in: true,
              username: data.username,
              password: ''
            });

            
            
          })

        .catch(error => {
            console.log(error)
        });
      };

handle_logout = (e, data) => {
    localStorage.removeItem('aveste_token');

    this.setState({
      logged_in: false,
      username: '',
    })
  }


  render() {
    let form;
    let message;
    let alert;
    let alert_status;
    let button_primary;
    let button_destructive;
    
    switch (this.state.logged_in) {
      case false:
        message = 'Your account needs to be connected in order to sell products on Aveste';
        form = <LoginForm 
          handle_login={this.handle_login} 
          in_out='Login'
          button_primary={true}
          button_destructive = {false} />;
        alert = 'Please log in';
        alert_status = 'warning';
        button_destructive = false;


        break;

      case true:
        message = `You are logged in as ${this.state.username}`;
        form = <LoginForm 
          handle_login={this.handle_logout} 
          username={this.state.username} 
          in_out="Logout"
          password_disabled={true}
          username_disabled={true}
          button_primary={false}
          button_destructive = {true} />;
        alert = 'You are logged in';
        alert_status = 'success';
        button_primary = 'true';
        

        break;
    }

    const enabled = this.state.enabled;
    const contentStatus = enabled ? 'Disable' : 'Enable';
    const textStatus = enabled ? 'enabled' : 'disabled';

        <p>
          By clicking <strong>Connect</strong>, you agree to accept Aveste Marketplace's{' '}
          <Link url="Example App">terms and conditions</Link>. You’ll pay a
          commission rate as agreed with your Aveste account manager on sales made through Sample App.
        </p>;


        return (
           <Page>
           <Heading element="h1">Welcome to Aveste Marketplace</Heading>
           <Subheading>Account</Subheading>

           <Banner status="success" title="You've been approved to sell on Aveste Marketplace" onDismiss={() => {}}>
             <p>Please continue setup</p>
           </Banner>

            <Layout>
              <Layout.AnnotatedSection
                title="Aveste Account"
                description = 
                <Banner title={alert} status={alert_status}>
                  <p>{message}</p>
                </Banner>
              >
                <Card sectioned>
                  {form}

                </Card>

              </Layout.AnnotatedSection>

              <Layout.AnnotatedSection
                title="Published"
                description="This enables and disables your products on Aveste"
              >
                <SettingToggle
                  action={{
                    content: contentStatus,
                    onAction: this.handleToggle,
                  }}
                  enabled={enabled}
                >
                  Your store is{' '}
                  <TextStyle variation="strong">{textStatus}</TextStyle>.
                </SettingToggle>
              </Layout.AnnotatedSection>

              <Layout.AnnotatedSection
                title="Terms and conditions"
                description="You can view the Aveste Terms and Conditions here at anytime"
              >
              </Layout.AnnotatedSection>
              

              <Layout.AnnotatedSection
                title="Connect to Aveste"
                description="You can view the Aveste Terms and Conditions here at anytime"
              >
              <AccountConnection
                    accountName=''
                    connected=''
                    title="Aveste Account"
                    action={{
                      content: 'Connect',
                      onAction: '',
                    }}
                    details=''
                    termsOfService=''
                  />
              </Layout.AnnotatedSection>

            </Layout>
          </Page>
        );
      }


      handleChange = (field) => {
        return (value) => this.setState({[field]: value});
      };
      handleToggle = () => {
        this.setState(({ enabled }) => {
        	console.log("hey");
          return { enabled: !enabled };
        });
      };
    }

    export default AnnotatedLayout;