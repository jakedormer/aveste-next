import React from 'react';
import Link from 'next/link'
import {
  Card,
  Layout,
  
} from '@shopify/polaris';

class TermsConditions extends React.Component {

  render() {

    return (

      <Layout.AnnotatedSection
       title="Terms and conditions"
       description = "Visit Aveste's terms and conditions here at anytime"
     >
           
     <Card 
        sectioned
        title=""
      >
      <p>Click to read our general seller <Link href="https://google.com" external="true">terms and conditions</Link></p>

      </Card>

      </Layout.AnnotatedSection>

    );
    }
  }

  export default TermsConditions
 
