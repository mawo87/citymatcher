import Marionette from 'backbone.marionette';
import DropdownMenuItemView from '../views/DropdownMenuItemView.js';

export default Marionette.CollectionView.extend({
  childView: DropdownMenuItemView,
  childViewOptions: function(model, index) {
    var self = this;
    return {
      onItemSelected: self.onItemSelected
    };
  },
  tagName: 'div',
  className: 'dropdown-menu',
  initialize: function() {
    _.bindAll(
      this,
      'onItemSelected'
    );
  },
  onRender: function() {
    /*
    if (this.collection.length > 0) {
      this.$el.show();
    } else {
      this.$el.hide();
    }
    */
  },
  onItemSelected: function(item) {
    if (_.isFunction(this.options.onItemSelected)) {
      this.options.onItemSelected(item);
      //this.$el.hide();
    }
  }
});
