import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  SettingToggle,
  Stack,
  TextField,
  TextStyle
} from '@shopify/polaris';

class AnnotatedLayout extends React.Component {
  state = {
    discount: '10%',
    enabled: false,
  };

  render() {
    const { discount, enabled } = this.state;
    const contentStatus = enabled ? 'Disable' : 'Enable';
    const textStatus = enabled ? 'enabled' : 'disabled';

        return (
           <Page>
            <Layout>
              <Layout.AnnotatedSection
                title="Aveste Account"
                description="Your account needs to be connected in order to sell products on Aveste"
              >
                <Card sectioned>
                  <Form onSubmit={this.handleSubmit}>
                    <FormLayout>
                      <TextField
                        value={discount}
                        onChange={this.handleChange('discount')}
                        label="Discount percentage"
                        type="discount"
                      />
                      <Stack distribution="trailing">
                        <Button primary submit>
                          Save
                        </Button>
                      </Stack>
                    </FormLayout>
                  </Form>
                </Card>
              </Layout.AnnotatedSection>
              <Layout.AnnotatedSection
                title="Published"
                description="This enables and disables your products on Aveste"
              >
                <SettingToggle
                  action={{
                    content: contentStatus,
                    onAction: this.handleToggle,
                  }}
                  enabled={enabled}
                >
                  Your store is{' '}
                  <TextStyle variation="strong">{textStatus}</TextStyle>.
                </SettingToggle>
              </Layout.AnnotatedSection>

              

              <Layout.AnnotatedSection
                title="Terms and conditions"
                description="You can view the Aveste Terms and Conditions here at anytime"
              >
              </Layout.AnnotatedSection>

            </Layout>
          </Page>
        );
      }
      handleSubmit = () => {
        this.setState({
          discount: this.state.discount,
        });
        console.log('submission', this.state);
      };
      handleChange = (field) => {
        return (value) => this.setState({[field]: value});
      };
      handleToggle = () => {
        this.setState(({ enabled }) => {
        	console.log("hey");
          return { enabled: !enabled };
        });
      };
    }

    export default AnnotatedLayout;