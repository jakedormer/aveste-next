import {
  AccountConnection,
  Link
} from '@shopify/polaris';

import React, { useState, useCallback } from 'react';

function authenticateToken(token) {
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

    const receiveMessage = event => {

      // console.log(event.origin)
      // console.log(event)
      // console.log(event.data)
     // Do we trust the sender of this message? (might be
     // different from what we originally opened, for example).
     if (event.origin !== "http://127.0.0.1:8000") {
       return;
     }

     localStorage.setItem("aveste_token", event.data)

     const { data } = event;
     // If we trust the origin and the source is our popup
     // Get the URL params and redirect to our server to use Passport to auth/login
       const { payload } = data;
       const redirectUrl = `/auth/google/login${payload}`;
       // window.location.pathname = redirectUrl;
    };

    let windowObjectReference = null;
    let previousUrl = null;

    const openSignInWindow = (url, name) => {
       // remove any existing event listeners
       window.removeEventListener('message', receiveMessage);

       // window features
       const strWindowFeatures =
         'toolbar=no, menubar=no, width=500, height=500, top=100, left=100';

       if (windowObjectReference === null || windowObjectReference.closed) {
         /* if the pointer to the window object in memory does not exist
          or if such pointer exists but the window was closed */
         windowObjectReference = window.open(url, name, strWindowFeatures);
       } else if (previousUrl !== url) {
         /* if the resource to load is different,
          then we load it in the already opened secondary window and then
          we bring such window back on top/in front of its parent window. */
         windowObjectReference = window.open(url, name, strWindowFeatures);
         windowObjectReference.focus();
       } else {
         /* else the window reference must exist and the window
          is not closed; therefore, we can bring it back on top of any other
          window with the focus() method. There would be no need to re-create
          the window or to reload the referenced resource. */
         windowObjectReference.focus();
       }

       // add the listener for receiving a message from the popup
       window.addEventListener('message', event => receiveMessage(event), false);
       // assign the previous URL
       previousUrl = url;
     };



function AccountConnectionForm(props) {
  const [connected, setConnected] = useState(props.logged_in);
  const accountName = connected ? props.username : '';

  // const handleAction = useCallback(() => {
  //   setConnected(connected => !connected);
  // }, [connected]);

  const handleAction = () => {
    if (connected) {
      setConnected(connected => !connected)
    } else {

      openSignInWindow("http://127.0.0.1:8000/login-vendor", "_blank");


      // setConnected(connected => !connected)
    }
  }

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