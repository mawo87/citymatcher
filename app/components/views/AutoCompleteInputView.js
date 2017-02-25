import Marionette from 'backbone.marionette';
import CitiesCollection from '../collections/cities';
import DropdownMenuView from '../views/DropdownMenuView.js';
import template from '../../templates/autocompleteInput.jst';

export default Marionette.View.extend({
  template: template,
  ui: {
    autocomplete: 'input'
  },
  events: {
    'keyup @ui.autocomplete': 'fetchData'
  },
  regions: {
    dropdownMenu: {
      selector: '#dropdownMenu',
      replaceElement: true
    }
  },
  initialize: function() {
    this.suggestions = new CitiesCollection([], {
      reset: true,
      mode: 'client',
      comparator: (model) => model.get('name')
    });
  },
  onRender: function() {

  },
  fetchData: function() {
    var self = this;
    var query = this.ui.autocomplete.val();

    if (query && query !== '') {
      this.suggestions.search(query)
        .done(function(data) {
          self.renderDropdown();
        });
    } else {
      this.suggestions.reset();
      this.renderDropdown();
    }
  },
  renderDropdown: function() {
    var self = this;

    this.getRegion('dropdownMenu').show(new DropdownMenuView({
      collection: this.suggestions,
      onItemSelected: function(item) {
        console.log('City / Selection :: ', self.model.get('name'), ' / ', item.get('name'));
        self.ui.autocomplete.val(item.get('name'));
      }
    }));
  }
});
