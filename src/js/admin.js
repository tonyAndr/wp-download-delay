/* eslint-disable camelcase */

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;

const {
    BaseControl,
    Button,
    PanelBody,
    PanelRow,
    Spinner,
    Flex,
    FlexItem,
    FlexBlock,
    RangeControl,
    ToggleControl,
    TextareaControl,
    FormTokenField,
    __experimentalRadio,
    __experimentalRadioGroup,
    ColorPalette,
    ColorIndicator,
    TextControl,
    TabPanel
} = wp.components;

const Radio = __experimentalRadio, RadioGroup = __experimentalRadioGroup;

const {
    render,
    Component,
    Fragment
} = wp.element;

const colors = [
    { name: 'red', color: '#f00' },
    { name: 'white', color: '#fff' },
    { name: 'blue', color: '#00f' },
];

/**
 * Internal dependencies
 */
import '../css/style.scss';

class App extends Component {
    constructor() {
        super(...arguments);

        this.changeOptions = this.changeOptions.bind(this);
        this.parseOptions = this.parseOptions.bind(this);
        this.validateDownloadClassName = this.validateDownloadClassName.bind(this);

        this.state = {
            isAPILoaded: false,
            isAPISaving: false,
            dload_delay_time: false,
            dload_delay_cd_text: '',
            dload_delay_info_text: '',
            dload_delay_success_cd_text: '',
            dload_delay_success_info_text: '',
            dload_delay_failed_cd_text: '',
            dload_delay_failed_info_text: '',
            dload_delay_autowrap: false,
            dload_delay_enable_redirect: false,
            dload_delay_extensions: [],
            dload_delay_drop_shadow: true,
            dload_delay_border_radius: 3,
            dload_delay_layout: 'column',
            dload_delay_column_width: 40,
            dload_delay_normal_bg: '#4397ff',
            dload_delay_success_bg: '#39b400',
            dload_delay_failed_bg: '#ff4625',
            dload_delay_download_class: ''

        };
    }

    componentDidMount() {
        wp.api.loadPromise.then(() => {
            this.settings = new wp.api.models.Settings();

            if (false === this.state.isAPILoaded) {
                this.settings.fetch().then(response => {
                    this.parseOptions(response);
                });
            }
        });
    }

    // on mount and on restore defs
    parseOptions(response) {
        // console.log(response)
        this.setState({
            dload_delay_time: parseInt(response.dload_delay_time),
            dload_delay_cd_text: response.dload_delay_cd_text,
            dload_delay_info_text: response.dload_delay_info_text,
            dload_delay_success_cd_text: response.dload_delay_success_cd_text,
            dload_delay_success_info_text: response.dload_delay_success_info_text,
            dload_delay_failed_cd_text: response.dload_delay_failed_cd_text,
            dload_delay_failed_info_text: response.dload_delay_failed_info_text,
            dload_delay_extensions: response.dload_delay_extensions,
            dload_delay_autowrap: response.dload_delay_autowrap,
            dload_delay_enable_redirect: response.dload_delay_enable_redirect,
            dload_delay_drop_shadow: response.dload_delay_drop_shadow,
            dload_delay_border_radius: response.dload_delay_border_radius,
            dload_delay_layout: response.dload_delay_layout,
            dload_delay_column_width: response.dload_delay_column_width,
            dload_delay_normal_bg: response.dload_delay_normal_bg,
            dload_delay_success_bg: response.dload_delay_success_bg,
            dload_delay_failed_bg: response.dload_delay_failed_bg,
            dload_delay_download_class: response.dload_delay_download_class,
            isAPILoaded: true,
            isAPISaving: false 
        });
    }

    changeOptions() {
        this.setState({ isAPISaving: true });
        const model = new wp.api.models.Settings(this.state);



        model.save().then(response => {
            // console.log('saved', response)
            this.setState({
                // dload_delay_extensions: response["dload_delay_extensions"],
                // dload_delay_time: response["dload_delay_time"],
                // dload_delay_template: response["dload_delay_template"],
                isAPISaving: false
            });
        });
    }

    restoreOptions() {
        this.setState({ isAPISaving: true });

        fetch(dd_admin_vars.ajax_url + '?action=ddlay_restore_defaults' + '&_ajax_nonce='+dd_admin_vars.dd_security)
        .then(res => res.json())
        .then(res => {
            // console.log(res);
            this.parseOptions(res);
        });
    }

    validateDownloadClassName (value) {
        if(/^[a-zA-Z0-9\-]*$/.test(value)) {
            this.setState({dload_delay_download_class: value})
        }
    }

    render() {
        const allowedContentFree = <span>{__('HTML tags are allowed. Enable support for shortcodes and script tags by switching to the ','dload-delay-td')}<a href={dd_admin_vars.upgrade_url}>Files Download Delay Pro</a>!</span>;
        const allowedContentPro = <span>{__('Shortcodes and HTML tags (including script tags) are allowed.','dload-delay-td')}</span>;
        if (!this.state.isAPILoaded) {
            return (
                <Flex justify="center" className="ui-loading">
                    <FlexItem>
                        {__('Loading UI...', 'dload-delay-td')}
                    </FlexItem>
                    <FlexItem>
                        <Spinner />
                    </FlexItem>
                </Flex>
            );
        }

        return (
            <Fragment>

                <Flex className="fdd-content-flex">
                    <FlexItem>                
                        <div className="fdd-main">
                            <PanelBody>
                                <PanelRow>
                                    <div className="fdd-header">
                                        <div className="fdd-container">
                                            <div className="fdd-logo">
                                                <img src="/wp-content/plugins/files-download-delay/img/icon-256x256.png" />
                                                <h1>{__('Files Download Delay', 'dload-delay-td')}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </PanelRow>
                                <PanelRow>
                                        <Button
                                            isSecondary
                                            disabled={this.state.isAPISaving}
                                            onClick={() => this.restoreOptions()}
                                        >
                                            {__('Restore defaults', 'dload-delay-td')}
                                        </Button>
                                        <Button
                                            // variant="primary"
                                            isPrimary
                                            disabled={this.state.isAPISaving}
                                            onClick={() => this.changeOptions()}
                                        >
                                            {__('Save', 'dload-delay-td')}
                                        </Button>
                                        
                                </PanelRow>
                            </PanelBody>
                            <PanelBody>
                            <h2>{__('Display settings', 'dload-delay-td')}</h2>
                                <PanelRow>
                                    <ToggleControl
                                        label={__('Open in new tab', 'dload-delay-td')}
                                        help={Boolean(this.state.dload_delay_enable_redirect) ? 
                                            __('Enabled: Will redirect user to the special download page with a timer block', 'dload-delay-td')
                                            : __('Disabled: Timer will be shown on the same page below the download link', 'dload-delay-td')
                                        }
                                        disabled={this.state.isAPISaving}
                                        checked={ Boolean(this.state.dload_delay_enable_redirect) }
                                        onChange={ value => this.setState({dload_delay_enable_redirect: Number(value)}) }
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <BaseControl
                                        label={__('Delay time', 'dload-delay-td')}
                                        help={__('Specify time in seconds for download delay', 'dload-delay-td')}
                                        id="fdd-input-delay-time"
                                        className="codeinwp-text-field"
                                    >
                                        <input
                                            type="number"
                                            id="fdd-input-delay-time"
                                            value={this.state.dload_delay_time}
                                            placeholder={__('Time in seconds')}
                                            disabled={this.state.isAPISaving}
                                            onChange={e => this.setState({ dload_delay_time: e.target.value })}
                                        />

                                    </BaseControl>
                                </PanelRow>

                                <TabPanel
                                    className="tab-panel-texts"
                                    activeClass="tabs-active"
                                    onSelect={ (selected) => {} }
                                    initialTabName='tab_countdown'
                                    tabs={ [
                                        {
                                            name: 'tab_countdown',
                                            title: __('Countdown', 'dload-delay-td'),
                                        },
                                        {
                                            name: 'tab_success',
                                            title: __('Success', 'dload-delay-td'),
                                        },
                                        {
                                            name: 'tab_failed',
                                            title: __('Failed', 'dload-delay-td'),
                                        },
                                    ] }
                                >
                                    { ( tab ) => 
                                        {
                                        if (tab.name === 'tab_countdown') {
                                            return <>
                                                <PanelRow className="border-normal">
                                                    <BaseControl
                                                        label={__('Header (timer)', 'dload-delay-td')}
                                                        help={__('This text will appear by the countdown timer. Ex.: "Download will start soon"', 'dload-delay-td')}
                                                        id="fdd-input-cd-head"
                                                        className="codeinwp-text-field"
                                                    >
                                                        <TextareaControl
                                                            id="fdd-input-cd-head"
                                                            rows="1"
                                                            disabled={this.state.isAPISaving}
                                                            value={this.state.dload_delay_cd_text}
                                                            onChange={value => this.setState({ dload_delay_cd_text: value })} />
                                                    </BaseControl>
                                                </PanelRow>

                                                <PanelRow className="border-normal">
                                                    <BaseControl
                                                        label={__('Body', 'dload-delay-td')}
                                                        // help={__('Insert any text, subsciption form, advertisments, etc. HTML and shortcodes are allowed.', 'dload-delay-td')}
                                                        help={dd_admin_vars.free_version === 'true' ? allowedContentFree : allowedContentPro}
                                                        id="fdd-input-cd-info"
                                                        className="codeinwp-text-field"
                                                    >
                                                        <TextareaControl
                                                            id="fdd-input-cd-info"
                                                            rows="10"
                                                            disabled={this.state.isAPISaving}
                                                            value={this.state.dload_delay_info_text}
                                                            onChange={value => this.setState({ dload_delay_info_text: value })} />
                                                    </BaseControl>
                                                </PanelRow>
                                                <PanelRow className="border-normal">
            
                                                        <p>{__("Header color", 'dload-delay-td')}</p>
                                                        <ColorPalette
                                                            // colors={ colors }
                                                            id='dload_delay_normal_bg'
                                                            value={ this.state.dload_delay_normal_bg }
                                                            onChange={ ( value ) => {
                                                                // console.log(value)
                                                                this.setState({ dload_delay_normal_bg: value })
                                                            } }
                                                            clearable={false}
                                                            disableAlpha
                                                        />
                                                        
                                                </PanelRow>
                                            </>
                                        }
                                        if (tab.name === 'tab_success') {
                                            return <>
                                                <PanelRow className="border-success">
                                                    <BaseControl
                                                        label={__('Header', 'dload-delay-td')}
                                                        help={__('Header when download started', 'dload-delay-td')}
                                                        id="fdd-input-success-head"
                                                        className="codeinwp-text-field"
                                                    >
                                                        <TextareaControl
                                                            id="fdd-input-success-head"
                                                            rows="1"
                                                            disabled={this.state.isAPISaving}
                                                            value={this.state.dload_delay_success_cd_text}
                                                            onChange={value => this.setState({ dload_delay_success_cd_text: value })} />
                                                    </BaseControl>
                                                </PanelRow>

                                                <PanelRow className="border-success">
                                                    <BaseControl
                                                        label={__('Body', 'dload-delay-td')}
                                                        help={dd_admin_vars.free_version === 'true' ? allowedContentFree : allowedContentPro}
                                                        id="fdd-input-success-info"
                                                        className="codeinwp-text-field"
                                                    >
                                                        <TextareaControl
                                                            id="fdd-input-success-info"
                                                            rows="10"
                                                            disabled={this.state.isAPISaving}
                                                            value={this.state.dload_delay_success_info_text}
                                                            onChange={value => this.setState({ dload_delay_success_info_text: value })} />
                                                    </BaseControl>
                                                </PanelRow>
                                                <PanelRow className="border-success">
                                                    <p>{__("Header color", 'dload-delay-td')}</p>
                                                    <ColorPalette
                                                        value={ this.state.dload_delay_success_bg }
                                                        onChange={ ( value ) => {
                                                            // console.log(value)
                                                            this.setState({ dload_delay_success_bg: value })
                                                        } }
                                                        clearable={false}
                                                        disableAlpha
                                                    />
                                                </PanelRow>
                                            </>
                                        }

                                        if (tab.name === 'tab_failed') {
                                            return <>
                                                <PanelRow className="border-failed" style="">
                                                    <BaseControl
                                                        label={__('Header', 'dload-delay-td')}
                                                        help={__('Header when download failed', 'dload-delay-td')}
                                                        id="fdd-input-failed-head"
                                                        className="codeinwp-text-field"
                                                    >
                                                        <TextareaControl
                                                            id="fdd-input-failed-head"
                                                            rows="1"
                                                            disabled={this.state.isAPISaving}
                                                            value={this.state.dload_delay_failed_cd_text}
                                                            onChange={value => this.setState({ dload_delay_failed_cd_text: value })} />
                                                    </BaseControl>
                                                </PanelRow>
                                                
                                                <PanelRow className="border-failed">
                                                    <BaseControl
                                                        label={__('Body', 'dload-delay-td')}
                                                        help={dd_admin_vars.free_version === 'true' ? allowedContentFree : allowedContentPro}
                                                        id="fdd-input-failed-info"
                                                        className="codeinwp-text-field"
                                                    >
                                                        <TextareaControl
                                                            id="fdd-input-failed-info"
                                                            rows="10"
                                                            disabled={this.state.isAPISaving}
                                                            value={this.state.dload_delay_failed_info_text}
                                                            onChange={value => this.setState({ dload_delay_failed_info_text: value })} />
                                                    </BaseControl>
                                                </PanelRow>
                                                <PanelRow className="border-failed">
                                                    <p>{__("Header color", 'dload-delay-td')}</p>
                                                    <ColorPalette
                                                        value={ this.state.dload_delay_failed_bg }
                                                        onChange={ ( value ) => {
                                                            // console.log(value)
                                                            this.setState({ dload_delay_failed_bg: value })
                                                        } }
                                                        clearable={false}
                                                        disableAlpha
                                                    />
                                                </PanelRow>
                                            </>
                                        }
                                        }
                                        
                                    }
                                </TabPanel>

                                
                                <hr/>
                                <hr/>
                            </PanelBody>
                            <PanelBody>
                                <h2>{__('Auto-wrap settings', 'dload-delay-td')}</h2>
                                <PanelRow>
                                    <ToggleControl
                                        label={__('Enable auto wrap', 'dload-delay-td')}
                                        help={__('Automatically wrap all file links in articles with corresponding file extensions', 'dload-delay-td')}
                                        disabled={this.state.isAPISaving}
                                        checked={ Boolean(this.state.dload_delay_autowrap) }
                                        onChange={ value => this.setState({dload_delay_autowrap: Number(value)}) }
                                    />
                                </PanelRow>

                                <PanelRow>
                                    
                                        <FormTokenField
                                            label={__('Files extensions', 'dload-delay-td')}
                                            value={this.state.dload_delay_extensions}
                                            suggestions={['pdf', 'mp3']}
                                            disabled={this.state.isAPISaving}
                                            onChange={extensions => this.setState({ dload_delay_extensions: extensions })}
                                        />
                                    
                                </PanelRow>
                                <PanelRow>
                                    <BaseControl
                                            label={__('With class', 'dload-delay-td')}
                                            id="fdd-input-auto-class"
                                            className="codeinwp-text-field"
                                        >
                                    <TextControl 
                                        id="fdd-input-auto-class"
                                        help={__('Finds all <a> tags with selected class. Also works if <a> tag\'s parent has this classname. Allowed characters: [a-z], [0-9], [-].', 'dload-delay-td')}
                                        value={this.state.dload_delay_download_class}
                                        disabled={this.state.isAPISaving}
                                        onChange={value => this.validateDownloadClassName( value )}
                                    />
                                    </BaseControl>
                                </PanelRow>
                            </PanelBody>
                            {dd_admin_vars.free_version !== 'true' && 
                            (
                                <PanelBody>
                                    <h2>{__('Block Customizer', 'dload-delay-td')}</h2>
                                    {!this.state.dload_delay_enable_redirect && (
                                    <>
                                        <PanelRow>
                                            <ToggleControl
                                                label={__('Enable shadow', 'dload-delay-td')}
                                                checked={ Boolean(this.state.dload_delay_drop_shadow) }
                                                disabled={this.state.isAPISaving}
                                                onChange={ value => this.setState({dload_delay_drop_shadow: Number(value)}) }
                                            />
                                        </PanelRow>
                                        <PanelRow>                        
                                            <BaseControl
                                                label={__('Border radius', 'dload-delay-td')}
                                                id="fdd-input-border-radius"
                                                help={__('Specify border radius in px', 'dload-delay-td')}
                                                className="codeinwp-text-field"
                                            >
                                                <input
                                                    id="fdd-input-border-radius"
                                                    type="number"
                                                    min={0}
                                                    max={100}
                                                    value={this.state.dload_delay_border_radius}
                                                    disabled={this.state.isAPISaving}
                                                    onChange={e => this.setState({ dload_delay_border_radius: e.target.value })}
                                                />
                                            </BaseControl>
                                        </PanelRow>

                                        <h3>{__('Layout settings', 'dload-delay-td')}</h3>
                                        <PanelRow>
                                            <FlexBlock>
                                                <RadioGroup 
                                                    label={__('Layout Direction', 'dload-delay-td')}
                                                    onChange={ value => this.setState({ dload_delay_layout: value }) } 
                                                    checked={ this.state.dload_delay_layout }
                                                    help={__('Switch between 2 fullwidth rows or 2 columns. ', 'dload-delay-td')}>
                                                    <Radio value="column">{__('Rows', 'dload-delay-td')}<img className='fdd-layout-icon' src='/wp-content/plugins/files-download-delay/img/row.svg' /></Radio>
                                                    <Radio value="row">{__('Columns', 'dload-delay-td')}<img className='fdd-layout-icon' src='/wp-content/plugins/files-download-delay/img/column.svg' /></Radio>
                                                </RadioGroup>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <RangeControl
                                                    label={__('Columns width', 'dload-delay-td')}
                                                    help={__('Relative width in %. Set left column\'s width, right column will be 100-[selected value]%.', 'dload-delay-td')}
                                                    value={ this.state.dload_delay_column_width }
                                                    onChange={ ( value ) => this.setState({ dload_delay_column_width: value }) }
                                                    min={ 20 }
                                                    max={ 80 }
                                                    step={10}
                                                />
                                            </FlexBlock>
                                        </PanelRow>
                                    </>
                                    )}
                                    
                                </PanelBody>
                            )}
                            
                            <PanelBody>
                                <PanelRow>
                                        <Button
                                            isSecondary
                                            disabled={this.state.isAPISaving}
                                            onClick={() => this.restoreOptions()}
                                        >
                                            {__('Restore defaults', 'dload-delay-td')}
                                        </Button>
                                        <Button
                                            // variant="primary"
                                            isPrimary
                                            disabled={this.state.isAPISaving}
                                            onClick={() => this.changeOptions()}
                                        >
                                            {__('Save', 'dload-delay-td')}
                                        </Button>
                                        
                                </PanelRow>
                            </PanelBody>
                        </div>
                    </FlexItem>
                    <FlexItem>
                        <div className="fdd-sidebar">
                            {dd_admin_vars.free_version === 'true' && (
                                <PanelBody className="free-version">
                                    <h2>💎 {__('Upgrade to Pro Now!', 'dload-delay-td')}</h2>
                                    <p>{__('Premium version has some nice extra options available:', 'dload-delay-td')} </p>
                                    <ol>
                                        <li>{__('Layout Customization', 'dload-delay-td')}</li>
                                        <li>{__('Separate delay and new tab option for each link', 'dload-delay-td')}</li>
                                        <li>{__('JavaScript Permitted (Ads Support)', 'dload-delay-td')}</li>
                                        <li>{__('Priority Tech Support via Email', 'dload-delay-td')}</li>
                                    </ol>
                                    <p>{__('Check out our upgrade plans here:', 'dload-delay-td')} <a href={dd_admin_vars.upgrade_url}>{__('Get FDD Pro', 'dload-delay-td')}</a>.</p>
                                </PanelBody>
                            )}
                            {(dd_admin_vars.free_version === 'false' && dd_admin_vars.is_paying === 'true') && (
                                <PanelBody className="pro-version">
                                    <h2>😃 {__('Pro Plan Activated', 'dload-delay-td')}</h2>
                                    <p>{__('You can check your license status and account settings here:', 'dload-delay-td')} <a href={dd_admin_vars.freemium.account_url}>{__('Account Page', 'dload-delay-td')}</a></p>
                                    <p>{__('In trouble?', 'dload-delay-td')} <a href={dd_admin_vars.freemium.contact_url}>{__('Contact Us', 'dload-delay-td')}</a></p>
                                </PanelBody>
                            )}
                            {(dd_admin_vars.free_version === 'false' && dd_admin_vars.is_paying === 'false') && (
                                <PanelBody className="expired-version">
                                    <h2>😟 {__('Activate Your License', 'dload-delay-td')}</h2>
                                    <p>{__('You have premium version of the plugin installed but your license key is missing or expired.', 'dload-delay-td')}</p>
                                    <p>{__('Go to your account page to activate the plugin:', 'dload-delay-td')} <a href={dd_admin_vars.freemium.account_url}>{__('Account Page', 'dload-delay-td')}</a>.</p>
                                    <p>{__('You won\'t be getting new plugin updates or the Priority Tech Support, but all other premium features are still available to use.', 'dload-delay-td')}</p> 
                                    <p>{__('You can renew your license key here:', 'dload-delay-td')} <a href={dd_admin_vars.upgrade_url}>{__('Upgrade page', 'dload-delay-td')}</a>.</p>
                                    <p>{__('Have any questions?', 'dload-delay-td')} <a href={dd_admin_vars.freemium.contact_url}>{__('Contact Us', 'dload-delay-td')}</a></p>
                                </PanelBody> 
                            )}
                        </div> 
                    </FlexItem>
                </Flex>
            </Fragment>
        );
    }
}

render(
    <App />,
    document.getElementById('seocherry-dload-delay-container')
);
