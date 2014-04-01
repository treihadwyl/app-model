/**
 * Model Base Class
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 */

var Proto = require( 'uberproto' ),
    EventEmitter = require( 'eventemitter3' ),
    each = require( 'lodash-node/modern/collections/forEach' );

var Model = module.exports = Proto.extend({

    init: function( props ) {
        // Loop through each prop and set up getters and setters for dealing with them

        each( props, function( value, key ) {

            Object.defineProperty( this, key, {
                get: function() {
                    return value;
                },

                set: function( val ) {
                    this.emit( 'change:' + key, value );
                    value = val;
                }
            })

        }.bind( this ) );
    }
});

// Model is an instance of EventEmitter
Model.mixin( new EventEmitter() );
