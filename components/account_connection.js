import {
  AccountConnection,
  Link
} from '@shopify/polaris';

import React, { useState, useCallback } from 'react';


function AccountConnectionForm(props) {
  const [connected, setConnected] = useState(props.logged_in);
  const accountName = connected ? props.username : '';

  const handleAction = useCallback(() => {
    setConnected(connected => !connected);
  }, [connected]);

  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : <p>
      By clicking <strong>Connect</strong> and then logging in, you agree to accept Aveste Marketplace’s{' '}
      <Link url="Example App" external="True">terms and conditions</Link>. You’ll pay a
      commission rate as agreed with your Aveste account manager on sales made through Sample App.
    </p>;

  return <AccountConnection accountName={accountName} title="Aveste Account" action={{
    content: buttonText,
    onAction: handleAction
  }} details={details} termsOfService={terms} connected={true} />;
}

export default AccountConnectionForm;