## The `{{route-metadata-title}}` helper

This addon provides a simple class helper that listens for events fired by the RouteMetadata service and updates the 
page's document title. 

To add a titles to an application...

* Call the helper once from the application.hbs template.
* Add a title key to the metadata of any route segment that contributes to the title string.
* Add i18n values for each segment. I18n, provided by [ember-intl](https://github.com/ember-intl/ember-intl), is built-in. 
  Check the source **en-gb.yaml** below against the title you see in this browser.

{{#docs-demo as |demo|}}

  {{demo.snippet name="pods/application/template.hbs" label="Application template"}}

  {{demo.snippet name="pods/application/route.js" label="Metadata : applicaton"}}
  {{demo.snippet name="pods/docs/route.js" label="Metadata : docs"}}
  {{demo.snippet name="pods/docs/components/route.js" label="Metadata : docs.component"}}

  {{demo.snippet name="dummy/route-metadata/en-gb.yaml" label="en-gb.yaml (i18n)"}}

{{/docs-demo}}

This helper is designed to listen to events fired by the RouteMetadata service. It is this simple...

{{#docs-demo as |demo|}}

  {{demo.snippet name="helpers/route-metadata-title.js" label="{{route-metadata-helper}} source"}}

{{/docs-demo}}
