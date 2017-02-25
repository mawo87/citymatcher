import Marionette from 'backbone.marionette';
import CitiesCollection from '../collections/cities';
import AutoCompleteInputView from '../views/AutoCompleteInputView';
import template from '../../templates/citiesListItem.jst';

export default Marionette.View.extend({
  template: template,
  tagName: 'tr',
  regions: {
    input: {
      selector: '.autocomplete-input',
      replaceElement: true
    }
  },
  initialize: function() {
    this.suggestions = new CitiesCollection([], {
      mode: 'client',
      comparator: (model) => model.get('name')
    });
  },
  onRender: function() {
    this.getRegion('input').show(new AutoCompleteInputView({
      model: this.model
    }));
  }
});
