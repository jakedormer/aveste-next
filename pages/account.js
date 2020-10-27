import {
  Banner,
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

import LoginForm from '../components/LoginForm'


class AnnotatedLayout extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       displayed_form: 'login',
       enabled: false,
       // logged_in: localStorage.getItem('token') ? true : false,
       logged_in: false,
       username: '1'
     };
   }


  componentDidMount() {
    console.log(localStorage.getItem('token'));
      if (localStorage.getItem('token')) {
        fetch('http://localhost:8000/api/current_user/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Token ${localStorage.getItem('token')}`
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

            console.log(json);
            
          })

        .catch(error => {
            console.log(error)
        });
      };

    }

  handle_login = (e, data) => {
    console.log(data);
    console.log(JSON.stringify(data))

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

            return response.json()
          }
        })


        .then(json => {

            console.log(json);

            const token = json.token;
            localStorage.setItem('token', token);

            this.setState({
              logged_in: true,
              username: JSON.stringify(data).username,
              displayed_form: 'logout',
            });

            
          })

        .catch(error => {
            console.log(error)
        });
      };




  render() {
    let form;
    let message;
    
    switch (this.state.displayed_form) {
      case 'login':
        message = 'Your account needs to be connected in order to sell products on Aveste';
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'logout':
        message = `You are logged in ${this.username}`;
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      default:
        message = 'You are logged in';
        form = '<div>You are logged in</div>';
    }

    const enabled = this.state.enabled;
    const contentStatus = enabled ? 'Disable' : 'Enable';
    const textStatus = enabled ? 'enabled' : 'disabled';


        return (
           <Page>
            <Layout>
              <Layout.AnnotatedSection
                title="Aveste Account"
                description={message}
              >
                <Card sectioned>
                  {form}

                  <Banner title="Incorrect username or password" status="warning">
                    <p>If you do not have an account created yet, reach out to your aveste account manager</p>
                  </Banner>
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