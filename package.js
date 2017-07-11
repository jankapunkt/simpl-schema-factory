Package.describe({
  name: 'jkuester:simpl-schema-factory',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'Factory for your SimpleSchema instances, using npm simpl-schema package.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jankapunkt/simpl-schema-factory.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.5');
  api.use('ecmascript');
  api.use('tmeasday:check-npm-versions@0.3.1');
  api.mainModule('simpl-schema-factory.js');
});
