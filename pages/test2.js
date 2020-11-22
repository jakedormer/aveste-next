import {
  AccountConnection,
  Banner,
  Badge,
  Button,
  Card,
  DescriptionList,
  DisplayText,
  FooterHelp,
  Form,
  FormLayout,
  Heading,
  Layout,
  Link,
  Page,
  SettingToggle,
  Stack,
  Subheading,
  TextField,
  TextStyle,
  Title,
} from '@shopify/polaris';

import React from 'react';
// import ReactDOM from 'react-dom';
import Head from 'next/head';
import "../components/base.css";
import ProductCounts from "../components/product_counts.js";

class Child extends React.Component {
  
  render() {

      const accountName = this.props.username ? this.props.username : '';
      const buttonText = this.props.logged_in ? 'Disconnect' : 'Connect';
      const details = this.props.logged_in ? 'Account connected' : 'No account connected';
      const terms = this.props.logged_in ? null : (
        <p>
          By clicking <strong>Connect</strong>, you agree to accept Aveste Marketplace's{' '}
          <Link url="Example App">terms and conditions</Link>. You’ll pay a
          commission rate as agreed with Aveste on sales made our marketplace.
        </p>
      );

      return (

        <AccountConnection
          accountName={this.props.username}
          connected={this.props.logged_in}
          title="Aveste App"
          action={{
            content: buttonText,
            onAction: this.props.onAction
          }}
          details={details}
          termsOfService={terms}
        />
        
      );
    }
  }


class Parent extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       logged_in: false,
       username: '',
       popup: false,
     };
    this.disconnect = this.disconnect.bind(this)
    this.api = this.api.bind(this)
  }

  api(token, url) {
    if (token) {
      fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${token}`
          },
        })
        // A list of promises
        .then(function(response) {
          if (response.status == 200) {
            console.log(response.status)
            return response.json()
          } else {
            console.log(response.status)
          }
        }).then(json => {
          console.log(json)
          this.setState({
            logged_in: true,
            username: json.username,
          });
        }).catch(error => {
          console.log(error)
        });
    };
  }

  openSignInWindow() {

     // remove any existing event listeners
     // window.removeEventListener('message', receiveMessage);
     // console.log(typeof window);
     if (typeof window !== 'undefined') {

        // client-side-only code
        var windowObjectReference = null;
        var previousUrl = null;

        // window features
        const url = "http://127.0.0.1:8000/login-vendor"
        const name = "jake"
        const specs =
          'toolbar=no, menubar=no, width=500, height=500, top=100, left=100';

        if (windowObjectReference === null || windowObjectReference.closed) {
          /* if the pointer to the window object in memory does not exist
           or if such pointer exists but the window was closed */
          window.open(url, name, specs);
        } else if (previousUrl !== url) {
          /* if the resource to load is different,
           then we load it in the already opened secondary window and then
           we bring such window back on top/in front of its parent window. */
          windowObjectReference = window.open(url, name, specs);
          windowObjectReference.focus();
        } else {
          /* else the window reference must exist and the window
           is not closed; therefore, we can bring it back on top of any other
           window with the focus() method. There would be no need to re-create
           the window or to reload the referenced resource. */
          windowObjectReference.focus();
        }
        // add the listener for receiving a message from the popup
        // window.addEventListener('message', event => receiveMessage(event), false);
        // assign the previous URL
        previousUrl = url;
      };
       
     }

  componentDidMount() {
    this.api(localStorage.getItem('aveste_token'), 'http://localhost:8000/api/current_user/')

    const receiveMessage = event => {

      console.log(event.origin)
      console.log(event)
      console.log(event.data)
     // Do we trust the sender of this message? (might be
     // different from what we originally opened, for example).
     if (event.origin !== "http://127.0.0.1:8000") {
       return;
     }


     localStorage.setItem("aveste_token", event.data)
     this.api(localStorage.getItem('aveste_token'), 'http://localhost:8000/api/current_user/')

      };

    window.addEventListener('message', event => receiveMessage(event), false);
    
  }


  disconnect() {
    this.setState({
      logged_in: !this.state.logged_in,
    })

    localStorage.removeItem("aveste_token");
  }

  render() {

    const description = !this.state.logged_in ? "Connect your account by clicking 'Connect'" : 'You are logged in to Aveste';
    const bannerStatus = this.state.logged_in ? 'success' : 'warning';
    const bannerText = this.state.logged_in ? 'You are logged in to Aveste' : 'Please log in';
    const onAction = this.state.logged_in ? this.disconnect : this.openSignInWindow;
    const publishMessage = this.state.logged_in ? 'Products that are synced to Aveste or have errors are shown here' : 'Please log in';

    return (

    <Page>
    <DisplayText size="extraLarge">Welcome to Aveste Marketplace</DisplayText>
    <TextStyle variation="subdued">Let's get you setup so that you can sell products on our marketplace</TextStyle>

    <Banner status={bannerStatus} title={bannerText} onDismiss={() => {}}>
    </Banner>

    <Layout>
    <Layout.AnnotatedSection
      title="Aveste Account"
      description = {description}
    >
      <Card sectioned>

      <Child 
        logged_in = {this.state.logged_in}
        username = {this.state.username}
        onAction = {onAction}
      />

      </Card>

    
    </Layout.AnnotatedSection>

    {/*<!--Publishing-> */}
      <Layout.AnnotatedSection
        title="Publishing"
        description = {publishMessage}
      >

      
      <Card 
         sectioned

       >
       

       <ProductCounts
        logged_in={this.state.logged_in}
        num_products="2"
        num_product_published="3"
        />

      </Card>

      </Layout.AnnotatedSection>

    {/*<!--Terms and conditions-> */}
      <Layout.AnnotatedSection
        title="Terms and conditions"
        description = "Visit Aveste's terms and conditions here at anytime"
      >

      
      <Card 
         sectioned
         title=""

       >
       <p>Click to read our general seller <Link url="https://google.com" external="true">terms and conditions</Link></p>

      </Card>

      </Layout.AnnotatedSection>

    </Layout>
    </Page>

    )
    
  }
}


export default Parent;
