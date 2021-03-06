'use strict';
const Generator = require('yeoman-generator');
const rootPkg = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.'
    });
  }

  writing() {
    const pkgJson = {
      'lint-staged': rootPkg['lint-staged'],
      eslintConfig: {
        extends: ['airbnb'],
        env: {
          mocha: true,
          node: true
        },
        rules: {
          'arrow-body-style': 'off',
          'arrow-parens': ['error', 'always'],
          'comma-dangle': 'off',
          'func-names': 'off',
          'global-require': 'off',
          'max-len': ['error', 120],
          'no-console': 'off',
          'no-underscore-dangle': 'off',
          'no-use-before-define': 'off',
          semi: ['error', 'never'],
          'space-before-function-paren': ['error', 'never'],
          'import/no-extraneous-dependencies': 'off'
        }
      },
      scripts: {
        pretest: rootPkg.scripts.pretest,
        precommit: rootPkg.scripts.precommit
      }
    };

    this.fs.extendJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkgJson
    );

    this.fs.copy(
      this.templatePath('eslintignore'),
      this.destinationPath(this.options.generateInto, '.eslintignore')
    );
  }

  install() {
    const dependencies = [
      'eslint',
      'husky',
      'lint-staged',
      'eslint-config-airbnb',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react'
    ];

    this.npmInstall(dependencies, { saveDev: true });
  }
};
