/**
 * Model Base Class
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * Each attribute that is added has a number of events associated with it.
 * `model.add({ foo: 'foo' })`
 * `model.on( 'change:foo', console.log )`
 * `model.foo = 'oof'`
 * This will fire the change event, which will attempt to illegally invocate
 * console.log (but you get the idea).
 *
 * @events
 *   change:attribute-name
 *   add:attribute-name
 *   delete:attribute-name
 */

var Proto = require( 'uberproto' ),
    EventEmitter = require( 'eventemitter3' ),
    each = require( 'lodash-node/modern/collections/forEach' );


/**
 * Model Base Class
 * ---
 * @extends Object
 * @param props {Object} hash of model properties
 */
var Model = module.exports = Proto.extend({

    /**
     * @constructor
     */
    init: function( props ) {
        // Loop through each prop and set up getters and setters for dealing with them
        this.add( props );

        return this;
    },

    /**
     * Adds new property/ies
     * @param props {Object} hash of model properties to add
     */
    add: function( props ) {
        each( props, function( value, key ) {
            this.emit( 'add:' + key );

            Object.defineProperty( this, key, {
                get: function() {
                    return value;
                },

                set: function( val ) {
                    value = val;
                    this.emit( 'change:' + key, value );
                }
            })

        }.bind( this ) );
    }
});

// Model is an instance of EventEmitter
Model.mixin( new EventEmitter() );
