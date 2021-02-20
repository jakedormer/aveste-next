import React from 'react';
import Head from 'next/head';
import {
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
  ProgressBar,
  SettingToggle,
  Stack,
  Subheading,
  TextField,
  TextStyle,
  Title,
} from '@shopify/polaris';

import AccountConnectionComponent from "../components/AccountConnection.js"
import SetupStatus from "../components/SetupStatus.js"
import TermsConditions from "../components/TermsConditions.js"

// import ReactDOM from 'react-dom';
// import "../components/base.css";
import ProductCounts from "../components/product_counts.js";


class Parent extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       logged_in: false,
       username: '',
       popup: false,
     };
    // this.disconnect = this.disconnect.bind(this)
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


  
  render() {

    const description = !this.state.logged_in ? "Connect your account by clicking 'Connect'" : 'You are logged in to Aveste';
    const bannerStatus = this.state.logged_in ? 'success' : 'warning';
    const bannerText = this.state.logged_in ? 'You are logged in to Aveste' : 'Please log in';
    const publishMessage = this.state.logged_in ? 'Products that are synced to Aveste or have errors are shown here' : 'Please log in';

    return (

    <Page>
    <DisplayText size="extraLarge">Welcome to Aveste Marketplace</DisplayText>

    <Banner status={bannerStatus} title={bannerText} onDismiss={() => {}}>
    </Banner>

    <Layout>

    <Layout.AnnotatedSection
      title="Account Setup"
      description = "Please complete these steps in order to complete your account setup"
    >
      <Card sectioned>

      <ProgressBar progress={75} />

      <SetupStatus
         logged_in = {this.state.logged_in}
      />

      </Card>

    
    </Layout.AnnotatedSection>

    <Layout.AnnotatedSection
      title="Aveste Account"
      description = {description}
    >
      <Card sectioned>

      <AccountConnectionComponent 
        logged_in = {this.state.logged_in}
        username = {this.state.username}
      />

      </Card>

    
    </Layout.AnnotatedSection>

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

      <TermsConditions/>

    </Layout>
    </Page>

    )
    
  }
}


export default Parent;
