## Ember Route Metadata utilities and components

This addon leverages the new functionality introduced by the [0398-RouteInfo-Metadata](https://github.com/emberjs/rfcs/blob/master/text/0398-RouteInfo-Metadata.md) 
RFC to implement common route based utilities and components. As route metadata was introduced in Ember 3.7 this
addon is targeted at Ember LTS 3.8+ / Ember Octane edition. 

### Features

* Breadcrumbs based on route metadata.
* Page title management.
* Transition aware scrolling on route entry. 
* Built-in internationalisation using [ember-intl](https://github.com/ember-intl/ember-intl).
* Uses new public [RouterService API](https://api.emberjs.com/ember/release/classes/RouterService) only.
* Uses native classes and decorators.
* No jQuery.

### About route metadata

The [0398-RouteInfo-Metadata](https://github.com/emberjs/rfcs/blob/master/text/0398-RouteInfo-Metadata.md) RFC defines a 
standardised hook for a route to provide information to the Ember [RouterService API](https://api.emberjs.com/ember/release/classes/RouterService). 

An example metadata hook ...

{{#docs-demo as |demo|}}
  {{demo.snippet name="pods/docs/components/route.js"}}
{{/docs-demo}}

The metadata can be access by clients of the RouterService via the metadata property of a 
[RouteInfo](https://api.emberjs.com/ember/release/classes/RouteInfoWithAttributes) object.
