import React from 'react';
import Link from 'next/link'
import {
  DescriptionList,
  Icon,
  TextStyle
} from '@shopify/polaris';

import {
  CircleTickMajor,
  CircleTickOutlineMinor
} from '@shopify/polaris-icons';

class SetupStatus extends React.Component {

  
  render() {

    let connect = this.props.logged_in ? 'positive' : 'negative';

      return (



        <DescriptionList
          items={[
            {
              term: '1.',
              description:
              <div>
                <TextStyle variation={connect}>Connect to Aveste using the connect link below.</TextStyle>
              </div>

            },
            {
              term: '2. ',
              description:
              <TextStyle variation="subdued">Create a Stripe connected account. This will enable you to get paid. Your Aveste account manager will send you instructions on how to do this. Once completed this will automatically be marked as done'</TextStyle>
            },
            {
              term: '3',
              description:
                'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
            },
          ]}
        />
        
      );
    }
  }

export default SetupStatus