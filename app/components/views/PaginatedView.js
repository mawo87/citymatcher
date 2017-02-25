import Marionette from 'backbone.marionette';
import template from '../../templates/pagination.jst';

export default Marionette.View.extend({
  events: {
    'click @ui.pageItem': 'paginate'
  },
  ui: {
    pageItem: '.page-link'
  },
  template: template,
  templateContext: function() {
    return {
      collection: this.collection
    }
  },
  initialize: function(options) {
    this.collection = options.collection;

    this.collection.on('reset', this.render, this);
    this.collection.on('change', this.render, this);
  },
  paginate: function(ev) {
    var $target = $(ev.currentTarget);
    var page = this.collection.state.currentPage;

    if (!$target.hasClass('page-prev') && !$target.hasClass('page-next')) {
      page = $target.data('page')
    } else if ($target.hasClass('page-prev')) {
      page--;
    } else if ($target.hasClass('page-next')) {
      page++;
    }

    this.trigger('show:page', { page: page });
  }
});
