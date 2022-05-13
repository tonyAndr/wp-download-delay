/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n"
import { addFilter } from "@wordpress/hooks"
import { Fragment, useEffect } from "@wordpress/element"
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from "@wordpress/compose"
import { ToggleControl, __experimentalInputControl as InputControl, PanelBody } from '@wordpress/components';
//restrict to specific block names
const allowedBlocks = [ 'core/file' ];

/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes( settings ) {
    
    //check if object exists for old Gutenberg version compatibility
    //add allowedBlocks restriction
    if( typeof settings.attributes !== 'undefined' && allowedBlocks.includes( settings.name ) ){
    
        settings.attributes = Object.assign( settings.attributes, {
            enableDelay:{ 
                type: 'boolean',
                default: false,
            },
            enableRedirect:{ 
                type: 'boolean',
                default: fdd_options.page_redirect === 'true',
            },
            delayTime: {
                type: 'integer',
                default: fdd_options.delay_time ?? 10
            }
        });


    
    }

    return settings;
}

/**
 * Add mobile visibility controls on Advanced Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {

    return ( props ) => {

        const {
            name,
            attributes,
            setAttributes,
            isSelected,
        } = props;

        const {
            enableDelay,
            enableRedirect,
            delayTime,
        } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                { isSelected && allowedBlocks.includes( name ) &&
                    <InspectorControls>
                        <PanelBody
                            title={ __( 'Download Delay Options', 'dload-delay-td' ) }
                            initialOpen={ true }
                        >
                            <ToggleControl
                                label={ __( 'Enable Download Delay', 'dload-delay-td' ) }
                                checked={ !! enableDelay }
                                onChange={ () => setAttributes( {  enableDelay: ! enableDelay } ) }
                                help={ !! enableDelay ? __( 'Show countdown.', 'dload-delay-td', 'dload-delay-td' ) : __( 'Download normally.', 'dload-delay-td' ) }
                            />
                            { (enableDelay) && (
                                <>
                                    <ToggleControl
                                        label={ __( 'Open in new tab', 'dload-delay-td' ) }
                                        checked={ !! enableRedirect }
                                        onChange={ () => setAttributes( {  enableRedirect: ! enableRedirect } ) }
                                    />
                                    <InputControl
                                        label={ __('Delay Time in Seconds', 'dload-delay-td') }
                                        type="number"
                                        value={ delayTime }
                                        onChange={ (newTime) => setAttributes( {  delayTime: Number(newTime) } ) }
                                    />
                                </>
                            )
                            }
                        </PanelBody>
                    </InspectorControls>
                }

            </Fragment>
        );
    };
}, 'withAdvancedControls');

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
function applyExtraClass( extraProps, blockType, attributes ) {

    const { enableDelay, enableRedirect, delayTime } = attributes;
        
        //check if attribute exists for old Gutenberg version compatibility
        //add allowedBlocks restriction
    if ( typeof enableDelay !== 'undefined' && enableDelay && allowedBlocks.includes( blockType.name ) ) {
        extraProps.className = classnames( extraProps.className, 'dloaddelay-link-wrapper' );
        if (delayTime) {
            extraProps['data-time'] = delayTime;
            extraProps['data-redirect'] = enableRedirect;
        }
    }

    return extraProps;
}

//add filters

addFilter(
    'blocks.registerBlockType',
    'seocherry/custom-attributes',
    addAttributes
);

addFilter(
    'editor.BlockEdit',
    'seocherry/custom-advanced-control',
    withAdvancedControls
);

addFilter(
    'blocks.getSaveContent.extraProps',
    'seocherry/applyExtraClass',
    applyExtraClass
);