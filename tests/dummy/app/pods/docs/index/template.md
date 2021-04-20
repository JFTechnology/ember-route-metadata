# Ember Route Metadata

This addon leverages the new functionality introduced by
the [0398-RouteInfo-Metadata](https://github.com/emberjs/rfcs/blob/master/text/0398-RouteInfo-Metadata.md)
RFC to implement common route based utilities and components. As route metadata was introduced in Ember 3.7 this addon
is targeted at Ember LTS 3.8+ / Ember Octane edition.

## Features

* RouteMetadata service provides events and lookup methods.
* Breadcrumbs based on route metadata.
* Page title management.
* Transition aware scrolling on route entry.
* Built-in internationalisation using [ember-intl](https://github.com/ember-intl/ember-intl).
* Uses new public [RouterService API](https://api.emberjs.com/ember/release/classes/RouterService) only.
* Uses native classes and Stage 1 decorators.
* No jQuery.
* [Ember engine](https://github.com/ember-engines/ember-engines) friendly.

## About route metadata

The [0398-RouteInfo-Metadata](https://github.com/emberjs/rfcs/blob/master/text/0398-RouteInfo-Metadata.md) RFC defines a
standardised hook for a route to provide information to the
Ember [RouterService API](https://api.emberjs.com/ember/release/classes/RouterService).

An example metadata builder method on a route...

<DocsDemo as |demo|>
<demo.snippet @name="pods/docs/components/route.js"/>
</DocsDemo>

The metadata can be access by clients of the RouterService via the metadata property of the
[RouteInfo](https://api.emberjs.com/ember/release/classes/RouteInfoWithAttributes) object.

## The RouteMetadata service

This addon provides a service that listens to the
Ember [RouterService API](https://api.emberjs.com/ember/release/classes/RouterService)
for settled transitions. It does the following...

### Events

The service interpolates the route segments along the 'traversal' path of a settled transition. For example a successful
transition from route `A.B.C` to `A.B.D` has a traversal path `C -> D`.

The service triggers an event (_`metadata.[key]`_) for each and every key found in all the metadata objects discovered
along the traversal path.

For example if we have route segments with keyed metadata denoted by `Route[Metadata Keys]`...

* Transitioning from route **A[]** to route **A[].B[scroll,title].C[title]** would fire both _`metadata.scroll`_
  and _`metadata.title`_ events.

* Transitioning from route **A[].B[scroll,title].C[title]** to route **A[].B[scroll,title].D[title]** would fire only a
  _`metadata.title`_ event.

* Transitioning from route **A[].B[scroll,title].C[title]** to route **A[]** would fire both _`metadata.scroll`_
  and _`metadata.title`_ events.

* Transitioning from route **A[].B[scroll].C[]** to route **A[].B[scroll].D[]** would fire no events.

This allows for listeners to be notified of transitionally aware changes to metadata as routes are traversed. This is
important as metadata behaviours may depend on the traversal path rather than the absolute settled path. For example
page scrolling might be desirable on entering a path 'branch' but undesirable when traversing between 'leaves'.

### Methods

* Provides methods to access arrays of RouteInfo objects that contain metadata matching any given key.
