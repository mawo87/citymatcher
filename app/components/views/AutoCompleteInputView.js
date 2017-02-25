import Marionette from 'backbone.marionette';
import CitiesCollection from '../collections/cities';
import DropdownMenuView from '../views/DropdownMenuView.js';
import Utils from '../Utils.js';
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
    //delay input
    Utils.sleep(500).then(() => {
      var query = this.ui.autocomplete.val();

      if (query && query !== '') {
        this.suggestions.search(query)
          .done((data) => {
            this.renderDropdown();
          });
      } else {
        this.suggestions.reset();
        this.renderDropdown();
      }
    });
  },
  renderDropdown: function() {
    this.getRegion('dropdownMenu').show(new DropdownMenuView({
      collection: this.suggestions,
      onItemSelected: (item) => {
        console.log('City / Selection :: ', this.model.get('name'), ' / ', item.get('name'));
        this.ui.autocomplete.val(item.get('name'));
      }
    }));
  }
});
