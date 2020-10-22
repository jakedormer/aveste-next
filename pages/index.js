import Head from 'next/head'
import Link from 'next/link'
import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
//import { Layout, Page, TextStyle } from '@shopify/polaris';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';


class Index extends React.Component {
  state = { open: false };
  render() {
    return (
      <Page>
      <TitleBar
           title=""
           primaryAction={{
             content: 'Create Size Guide',
             onAction: () => this.setState({ open: true }),
           }}
         />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={this.state.open}
        onSelection={(resources) => this.handleSelection(resources)}
        onCancel={() => this.setState({ open: false })}
      />
        <Layout>
          <EmptyState
            heading="Start selling on Aveste Marketplace"
            action={{
              content: 'Create a size guide',
              onAction: () => this.setState({ open: true }),
            }}
            image={img}
          >
            <p>Sizing is super important to us and our customers!</p>
          </EmptyState>
        </Layout>
      </Page>
);
}
handleSelection = (resources) => {
  const idsFromResources = resources.selection.map((product) => product.id);
  this.setState({ open: false })
  // console.log(resources)
  console.log(idsFromResources)
  };

}


export default Index;