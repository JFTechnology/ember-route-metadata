## The `{{route-metadata-scroll}}` helper

This addon provides a simple class helper that listens for events fired by the RouteMetadata service and scrolls the
page accordingly.

To add scrolling to an application...

* Call the helper once from the application.hbs template.
* Add a scroll key to the metadata of any route segment that requires scrolling on entry.

<DocsDemo as |demo|>
<demo.snippet @name="pods/application/template.hbs" @label="Application template"/>
<demo.snippet @name="pods/docs/components/scroll-helper/route.js" @label="Metadata : docs.component"/>
</DocsDemo>

This helper is designed to listen to events fired by the RouteMetadata service. It is this simple...

<DocsDemo as |demo|>
<demo.snippet @name="helpers/route-metadata-scroll.js" @label="{{route-metadata-helper}} source"/>
</DocsDemo>
