## The `{{route-metadata-title}}` helper

By default the title for a route will be calculated using the route segment names as i18n lookup keys. Custom keys can
be defined in the metadata as follows...

{{#docs-demo as |demo|}}

  {{demo.snippet name="pods/docs/components/title-helper-alt-label/route.js" label="Metadata"}}

  {{demo.snippet name="dummy/en-gb.yaml" label="en-gb.yaml (i18n)"}}

{{/docs-demo}}
