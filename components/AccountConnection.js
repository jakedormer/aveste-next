import React from 'react';
import Link from 'next/link'
import {
  AccountConnection
} from '@shopify/polaris';

class AccountConnectionComponent extends React.Component {

  openSignInWindow() {

     // remove any existing event listeners
     // window.removeEventListener('message', receiveMessage);
     // console.log(typeof window);
     if (typeof window !== 'undefined') {

        // client-side-only code
        var windowObjectReference = null;
        var previousUrl = null;

        // window features
        const url = "http://shopify.aveste-test.com:8000/login"
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

   disconnect() {
     this.setState({
       logged_in: !this.state.logged_in,
     })

     localStorage.removeItem("aveste_token");
   }

  
  render() {

      const accountName = this.props.username ? this.props.username : '';
      const buttonText = this.props.logged_in ? 'Disconnect' : 'Connect';
      const details = this.props.logged_in ? 'Account connected' : 'No account connected';
      const onAction = this.props.logged_in ? this.disconnect : this.openSignInWindow;
      const terms = this.props.logged_in ? null : (
        <p>
          By clicking <strong>Connect</strong>, you agree to accept Aveste Marketplace's{' '}
          <Link href="https://google.com">terms and conditions</Link>. You’ll pay a
          commission rate as agreed with Aveste on sales made the marketplace.
        </p>
      );



      return (

        <AccountConnection
          accountName={this.props.username}
          connected={this.props.logged_in}
          title="Aveste App"
          action={{
            content: buttonText,
            onAction: onAction
          }}
          details={details}
          termsOfService={terms}
        />
        
      );
    }
  }

  export default AccountConnectionComponent