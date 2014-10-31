var template = require('./templates/app_view_template.js');

module.exports = Marionette.ItemView.extend({
  template: _.template(template)
});
