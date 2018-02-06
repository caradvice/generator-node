'use strict';
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node:buildkite', () => {
  it('creates the buildkite config file', () => {
    return helpers.run(require.resolve('../generators/buildkite')).then(() => {
      assert.file('.buildkite/pipeline.yml');
    });
  });
});
