# Treihadwyl Base Model Class

> Base Model Class

## Installation

App-model is the base class that adds some basic methods for dealing with models. It is created using [uberproto](https://github.com/daffl/uberproto) and can be extended normally.

```
var Model = require( 'app-model' );

var exModel = Model.extend({

  init: function( props ) {

    this._super( props );

    // Additional initialisation
  }
});
```

## Modelling Data

```
exModel.add({
  foo: 'foo'
});
```

__@props__ `object` attributes to add

Each property of the object passed in is added as a member on the model. Internally this uses [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) to _watch_ the properties.

This function also emits an `add` event passing the value of the added property.

## Changing Data

```
exModel.foo = 'oof';
```

Properties are added directly to the `Model` object so changing data is trivial.

## Events

```
exModel.on( 'change:foo', function( value ) {
  console.log( 'foo is changing to', value );
});

exModel.foo = 'bar';

-> 'foo is changing to bar'
```

Each instance of a `Model` is an instance of an [EventEmitter](https://www.npmjs.org/package/eventemitter3) and will emit events when things change, allowing you to be data-driven.

__add__

Fired when a property is added to the model.

__change__

Fired whenever a property is reassigned.
