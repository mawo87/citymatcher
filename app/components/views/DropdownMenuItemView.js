import Marionette from 'backbone.marionette';
import template from '../../templates/dropdownMenuItem.jst';

export default Marionette.View.extend({
  template: template,
  tagName: 'a',
  className: 'dropdown-item',
  events: {
    'click': 'onItemSelect'
  },
  initialize: function() {
    _.bindAll(
      this,
      'onItemSelect'
    );
  },
  onRender: function() {

  },
  onItemSelect: function(ev) {
    if (_.isFunction(this.options.onItemSelected)) {
      this.options.onItemSelected(this.model);
    }
  }
});
