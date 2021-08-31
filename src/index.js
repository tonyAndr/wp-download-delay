/* eslint-disable camelcase */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
    BaseControl,
    Button,
    ExternalLink,
    PanelBody,
    PanelRow,
    Placeholder,
    Spinner,
    Flex,
    FlexItem,
    FlexBlock,
    TextareaControl,
    FormTokenField
} = wp.components;

const {
    render,
    Component,
    Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import './style.scss';

class App extends Component {
    constructor() {
        super(...arguments);

        this.changeOptions = this.changeOptions.bind(this);

        this.state = {
            isAPILoaded: false,
            isAPISaving: false,
            dload_delay_time: false,
            dload_delay_template: '',
            dload_delay_extensions: []
        };
    }

    componentDidMount() {
        wp.api.loadPromise.then(() => {
            this.settings = new wp.api.models.Settings();

            if (false === this.state.isAPILoaded) {
                this.settings.fetch().then(response => {
                    this.setState({
                        dload_delay_time: parseInt(response.dload_delay_time),
                        dload_delay_template: response.dload_delay_template,
                        dload_delay_extensions: response.dload_delay_extensions,
                        isAPILoaded: true
                    });
                });
            }
        });
    }

    changeOptions() {
        this.setState({ isAPISaving: true });

        // const model = new wp.api.models.Settings({
        //     // eslint-disable-next-line camelcase
        //     [option]: value
        // });

        const model = new wp.api.models.Settings(this.state);

        model.save().then(response => {
            this.setState({
                dload_delay_extensions: response["dload_delay_extensions"],
                dload_delay_time: response["dload_delay_time"],
                dload_delay_template: response["dload_delay_template"],
                isAPISaving: false
            });
        });
    }

    render() {
        if (!this.state.isAPILoaded) {
            return (
                <Flex justify="center">
                    <FlexItem>
                        {__('Loading UI...')}
                    </FlexItem>
                    <FlexItem>
                        <Spinner />
                    </FlexItem>
                </Flex>
            );
        }

        return (
            <Fragment>
                <div className="codeinwp-header">
                    <div className="codeinwp-container">
                        <div className="codeinwp-logo">
                            <h1>{__('Download Delay Options')}</h1>
                        </div>
                    </div>
                </div>

                <div className="codeinwp-main">
                    <PanelBody  >
                    <h2>{__('Display settings')}</h2>
                        <PanelRow>
                            <BaseControl
                                label={__('Delay time')}
                                help={'Specify time in seconds for download delay'}
                                id="codeinwp-options-google-analytics-api"
                                className="codeinwp-text-field"
                            >
                                <input
                                    type="number"
                                    id="codeinwp-options-google-analytics-api"
                                    value={this.state.dload_delay_time}
                                    placeholder={__('Time in seconds')}
                                    disabled={this.state.isAPISaving}
                                    onChange={e => this.setState({ dload_delay_time: e.target.value })}
                                />

                                {/* <div className="codeinwp-text-field-button-group">
                                    <Button
                                        isPrimary
                                        isLarge
                                        disabled={this.state.isAPISaving}
                                        onClick={() => this.changeOptions('dload_delay_time', this.state.dload_delay_time)}
                                    >
                                        {__('Save')}
                                    </Button>

                                    <ExternalLink href="#">
                                        {__('Get API Key')}
                                    </ExternalLink>
                                </div> */}
                            </BaseControl>
                        </PanelRow>

                        <PanelRow>
                            <BaseControl
                                label={__('HTML Template')}
                                help={__('Your beautiful html template code')}
                                id="dd-template-control"
                                className="codeinwp-text-field"
                            >
                                <TextareaControl
                                    id="dd-template-control"
                                    rows="10"
                                    disabled={this.state.isAPISaving}
                                    value={this.state.dload_delay_template}
                                    onChange={value => this.setState({ dload_delay_template: value })} />
                            </BaseControl>
                        </PanelRow>

                        <PanelRow>
                            {/* <BaseControl
                                label={__('Files extensions')}
                                help={__('Add new extensions separated by comma')}
                                id="dd-extensions-control"
                                className="codeinwp-text-field"
                            > */}
                            <FormTokenField
                                label={__('Files extensions')}
                                id="dd-extensions-control"
                                value={this.state.dload_delay_extensions}
                                suggestions={['one', 'two']}
                                disabled={this.state.isAPISaving}
                                onChange={extensions => this.setState({ dload_delay_extensions: extensions })}
                            >

                            </FormTokenField>
                            {/* </BaseControl> */}
                        </PanelRow>

                        <PanelRow>
                            <div className="codeinwp-text-field-button-group">
                                <Button
                                    isPrimary
                                    isLarge
                                    disabled={this.state.isAPISaving}
                                    onClick={() => this.changeOptions()}
                                >
                                    {__('Save')}
                                </Button>
                            </div>
                        </PanelRow>
                    </PanelBody>

                    <PanelBody>
                        <div className="codeinwp-info">
                            <h2>{__('Got a question for us?')}</h2>

                            <p>{__('We would love to help you out if you need any help.')}</p>

                            <div className="codeinwp-info-button-group">
                                <Button
                                    isSecondary
                                    isLarge
                                    target="_blank"
                                    href="#"
                                >
                                    {__('Ask a question')}
                                </Button>

                                <Button
                                    isSecondary
                                    isLarge
                                    target="_blank"
                                    href="#"
                                >
                                    {__('Leave a review')}
                                </Button>
                            </div>
                        </div>
                    </PanelBody>
                </div>
            </Fragment>
        );
    }
}

render(
    <App />,
    document.getElementById('seocherry-dload-delay-container')
);
