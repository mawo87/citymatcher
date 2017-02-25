import PageableCollection from 'backbone.paginator';
import City from 'components/models/city';
import Config from 'config';

class CitiesCollection extends PageableCollection {
  constructor(models, options) {
    super(models, options);

    //set collection's model
    this.model = City;
  }

  url() {
    return Config.BASE_URL + 'cities';
  }

  search(query) {
    var dfd = new $.Deferred();

    this.fetch({
      url: Config.BASE_URL + 'autocomplete?q=' + encodeURIComponent(query),
      reset: true,
      success: (data) => {
        dfd.resolve(data);
      }
    });

    return dfd.promise();
  }

  parse(response, options) {
    return response;
  }
}

export default CitiesCollection;
