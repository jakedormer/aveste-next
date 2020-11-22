import {
  Badge,
  Card,
  DescriptionList,
  Tooltip
} from '@shopify/polaris';

import React from 'react';


class ProductCounts extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  num_products: 0,
	  num_products_published: 0,
	};
	
};


render() {

	const message = this.props.logged_in ? 'You currently have 200 products for sale on shopify': 'Please login to see your product statuses';
	const title = this.props.logged_in ? 'Product Statuses' : 'Please login to see your product publishing statuses';
	const publishing = this.props.logged_in ? 
	<div>

	<DescriptionList

		  items={[
			{
			  term: <Tooltip active content="These products are live on Aveste">
			  		<Badge status="success" progress="complete">Published</Badge>
			 		</Tooltip>,
			  description:
				`${this.state.num_products_published} Products`,
			},
			{
			  term: <Tooltip active content="These products are unsuitable for Aveste because we don't currently sell products in this category">
			  		<Badge status="" progress="complete">Unsuitable</Badge>
			  		</Tooltip>,
			  description:
				'10 Products',
			},
			{
			  term: <Tooltip active content="These products are missing information and so are not published">
			  		<Badge status="critical" progress="complete">Not Published</Badge>
			  		</Tooltip>,
			  description:
				'20 Products',
			},
		  ]}
		/>
		<Badge>Note - It may take up to 24 hours before products are published to Aveste</Badge>
		</div> : '';

	return (

		publishing
		
	)
	
};
};

export default ProductCounts