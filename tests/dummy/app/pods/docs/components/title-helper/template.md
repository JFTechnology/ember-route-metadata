## The `{{route-metadata-title}}` helper

This addon provides a simple class helper that listens for events fired by the RouteMetadata service and updates the 
page's document title. 

To add a titles to an application...

* Call the helper once from the application.hbs template.
* Add a title key to the metadata of any route segment that contributes to the title string.
* Add i18n values for each segment. I18n, provided by [ember-intl](https://github.com/ember-intl/ember-intl), is built-in. 
  Check the source **en-gb.yaml** below against the title you see in this browser.

{{docs/components/title-helper/demo}}
