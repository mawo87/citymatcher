import Marionette from 'backbone.marionette';
import template from '../../templates/item.jst';
import CitiesCollection from '../collections/cities';
import CitiesListView from '../views/CitiesListView';
import PaginatedView from '../views/PaginatedView';

export default Marionette.View.extend({
  regions: {
    citiesList: {
      selector: '#citiesList tbody',
      replaceElement: true
    },
    paginator: {
      selector: '#paginator',
      replaceElement: true
    }
  },
  template: template,
  templateContext: {

  },
  initialize() {
    var self = this;

    _.bindAll(
      this,
      'onShowPage'
    );

    this.cities = new CitiesCollection([], {
      mode: 'client',
      state: {
        pageSize: 150
      },
      comparator: (model) => model.get('name')
      //comparator: function(model) { return model.get('name'); }
    });

    this.cities.fetch({
      success: () => {
        console.log('ItemView :: initialize : fetched data ', this.cities);
      }
    });

    this.paginatedView = new PaginatedView({
      collection: this.cities
    });

    this.listenTo(this.paginatedView, 'show:page', self.onShowPage)
  },
  onRender() {
    var self = this;

    //render cities list
    this.getRegion('citiesList').show(new CitiesListView({
      collection: self.cities
    }));

    //render pagination
    this.getRegion('paginator').show(this.paginatedView);

    this.$('#testBtn').tooltip();
  },
  onShowPage(data) {
    if (data && data.page && !isNaN(parseInt(data.page))) {
      this.cities.getPage(data.page);
    }
  }
});
