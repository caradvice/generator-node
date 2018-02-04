'use strict';
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node:eslint', () => {
  it('fill package.json', () => {
    return helpers.run(require.resolve('../generators/eslint')).then(() => {
      assert.jsonFileContent('package.json', {
        eslintConfig: {
          extends: ['airbnb'],
          env: {
            mocha: true,
            node: true
          }
        },
        scripts: {
          pretest: 'eslint .'
        }
      });
      assert.file('.eslintignore');
    });
  });

  it('respect --generate-into option as the root of the scaffolding', () => {
    return helpers
      .run(require.resolve('../generators/eslint'))
      .withOptions({ generateInto: 'other/' })
      .then(() => {
        assert.jsonFileContent('other/package.json', {
          eslintConfig: {
            extends: ['airbnb']
          }
        });
        assert.file('other/.eslintignore');
      });
  });
});
