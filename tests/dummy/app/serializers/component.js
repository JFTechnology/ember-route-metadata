import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ComponentSerializer extends JSONAPISerializer {

  keyForAttribute(key) {
    console.debug(`ComponentSerializer attribute ${key}`);
    return key;
  }

  keyForRelationship(key) {
    console.debug(`ComponentSerializer relationship ${key}`);
    return key;
  }
}
