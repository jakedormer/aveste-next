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
import AccountConnectionForm from "../components/account_connection.js";

class Account extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       enabled: false,
       logged_in: false,
       username: 'JAke',
     };
  };


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

          } else {
            console.log(response.status)
          }
        })

        .then(json => {

          console.log(json)
            

          this.setState({
            logged_in: true,
            username: json.username,
          });

          })

        .catch(error => {
            console.log(error)
        });
      };

    }

  renderAccountConnection() {
    return <AccountConnectionForm
      logged_in={this.state.logged_in}
      username={this.state.username}
      />;
  };
  
  render() {
     return (
      <Page>
      <DisplayText size="extraLarge">Welcome to Aveste Marketplace</DisplayText>
      <TextStyle variation="subdued">Let's get you setup so that you can sell products on our marketplace</TextStyle>

      <Banner status="success" title="You've been approved to sell on Aveste Marketplace" onDismiss={() => {}}>
      </Banner>

       <Layout>
        {/*<!--Account--> */}
         <Layout.AnnotatedSection
           title="Aveste Account"
           description = "Connect your account by clicking 'Connect'"
         >
           <Card sectioned>

           {this.renderAccountConnection()}

           </Card>

        
         </Layout.AnnotatedSection>


         {/*<!--Fees and Payment-> */}
         <Layout.AnnotatedSection
           title="Fees and Payment"
           description = "You'll pay a 15% transaction fee on all sales made on Aveste Marketplace"
         >

         
         <Card 
            sectioned
            title=""


          >
          <p>You'll receive payments into your bank account</p>

         </Card>

         </Layout.AnnotatedSection>

       {/*<!--Publishing-> */}
         <Layout.AnnotatedSection
           title="Publishing"
           description = "Products that are synced to Aveste or have errors are shown here"
         >

         
         <Card 
            sectioned
            title="Product Status"

          >
          <p>You currently have 200 products for sale on shopify.</p>

          <DescriptionList
            items={[
              {
                term: <Badge status="success" progress="complete">Published</Badge>,
                description:
                  '170 Products',
              },
              {
                term: <Badge status="warning" progress="complete">Unsuitable</Badge>,
                description:
                  '10 Products',
              },
              {
                term: <Badge status="critical" progress="complete">Errors</Badge>,
                description:
                  '20 Products',
              },
            ]}
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
          <p>You have accepted our terms and conditions</p>

         </Card>

         </Layout.AnnotatedSection>

         </Layout>



         <FooterHelp>
           Learn more about{' '}
           <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
             Aveste Marketplace
           </Link>
         </FooterHelp>

        </Page>


     );
  }

};

export default Account;