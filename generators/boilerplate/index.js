'use strict';
var _ = require('lodash');
var Generator = require('yeoman-generator');

module.exports = Generator.extend({
  constructor: function () {
    Generator.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'The new module name.'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(this.options.generateInto, 'lib/index.js')
    );

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath(this.options.generateInto, 'test/index.js'), {
        pkgName: this.options.name,
        pkgSafeName: _.camelCase(this.options.name)
      }
    );
  }
});
