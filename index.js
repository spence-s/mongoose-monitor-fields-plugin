const captainHook = require('captain-hook');
const _ = require('lodash');

module.exports = function(schema, globalCallback) {
  if (typeof schema.postUpdate !== 'function') schema.plugin(captainHook);

  const callbacks = {};

  const fieldSet = new Set(getFields(schema));

  schema
    .virtual('__previous')
    .get(function() {
      return this._previous;
    })
    .set(function(doc) {
      this._previous = doc;
    });

  schema
    .virtual('__last_modified_paths')
    .get(function() {
      return this._last_modified_paths;
    })
    .set(function(modifiedPaths) {
      this._last_modified_paths = modifiedPaths;
    });

  schema.post('init', doc => {
    doc.__previous = doc.toObject({ depopulate: true });
  });

  schema.preUpdate((doc, next) => {
    doc.__last_modified_paths = doc.modifiedPaths({ includeChildren: true });
    next();
  });

  schema.postUpdate(function(doc) {
    const { __previous, __last_modified_paths, ...updated } = doc.toObject({
      virtuals: true,
      depopulate: true
    });

    const original = doc.__previous || {};

    const changes = [];
    for (const path of __last_modified_paths) {
      const test = path.replace(/\.\d+\./g, '.$.');
      if (fieldSet.has(test)) {
        const pathArr = path.split('.');

        const og = _.get(original, pathArr);
        const ud = _.get(updated, pathArr);

        if (!_.isEqual(og, ud)) {
          changes.push({
            path,
            prev: og,
            update: ud
          });

          if (_.isFunction(callbacks[path]))
            callbacks[path].call(doc, {
              path,
              prev: og,
              update: ud
            });
        }
      }
    }

    if (_.isFunction(globalCallback)) globalCallback.call(doc, changes);
  });

  function getFields(schema) {
    return Object.keys(schema.paths).reduce((paths, path) => {
      const schemaType = schema.path(path);

      const monitor = _.get(schemaType, 'options.monitor');
      if (monitor) {
        paths.push(path);
        if (_.isFunction(monitor)) callbacks[path] = monitor;
      }

      if (_.has(schemaType, 'schema')) {
        const subPaths = getFields(schemaType.schema, 'options.monitor').map(
          subPath => `${path}${'.$.'}${subPath}`
        );
        paths.push(...subPaths);
      }

      return paths;
    }, []);
  }
};
