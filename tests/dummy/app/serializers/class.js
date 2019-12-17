import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ClassSerializer extends JSONAPISerializer {

  keyForAttribute(key) {
    console.debug(`ClassSerializer attribute ${key}`);
    return key;
  }

  keyForRelationship(key) {
    console.debug(`ClassSerializer relationship ${key}`);
    return key;
  }
}
