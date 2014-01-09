// models a page of objects
Discourse.KbObjPage = Discourse.Model.extend({
  page_id: null,
  is_active: false,
  objs: null,
  other_pages: null,
  filter_params: null,
  data_type: null,

  isEmpty: Ember.computed.empty('objs.[]'),

  multiple_pages: function() {
    return this.other_pages.length > 1;
  }.property('other_pages'),

  get_stub: function(page_id) {
    return Discourse.KbObjPage.create({page_id: page_id, filter_params: this.get('filter_params')});
  }
});

Discourse.KbObjPage.reopenClass({

  defaultPerPage: 10,

  // fetches data and constructs a KbObjPage based on given params object
  // params.dataType - (KbDataType) the dataType to fetch
  // params.filterParams - (string) the filter param string to use in the URL
  // params.pageNum - (int) the page number to fetch
  // params.perPage - (int) the number of items to fetch per page (optional)
  // params.breadcrumb - (KbBreadcrumb) the breadcrumb upon which the breadcrumbs of all the fetched objects should build
  find: function(params) { var self = this;

    if (!params.perPage)
      params.perPage = self.defaultPerPage;

    var url = "/kb/" + params.dataType.get('name') + "/" + params.filterParams + "/page/" + params.pageNum;

    return Discourse.ajax(url, {data: {per_page: params.perPage}}).then(function(data) {

      // compute how many pages there will be and generate stub Page objects for them
      var pageCount = Math.ceil(data.total_count / data.per_page);

      // if the current page is too high, trim it
      if (params.pageNum > pageCount)
        params.pageNum = pageCount;

      // start the obj
      var thisPage = Discourse.KbObjPage.create({
        page_id: params.pageNum,
        filter_params: params.filterParams,
        is_active: true,
        objs: Em.A(),
        other_pages: Em.A(),
        data_type: params.dataType
      });

      // create the Objs
      data.objs.forEach(function (g) {
        // create Obj object from returned JSON and add to this page
        var newObj = params.dataType.get('modelClass').create(g);

        // add the provided breadcrumb if given
        if (params.breadcrumb)
          newObj.set('breadcrumb', params.breadcrumb.add(newObj));

        thisPage.objs.pushObject(newObj);
      });

      // insert the current page
      thisPage.other_pages.pushObject(thisPage);

      // insert some pages to the right of the current page
      for (var i = 1; i < Math.max(6 - params.pageNum, 3); i++)
        if (params.pageNum + i < pageCount)
          thisPage.other_pages.pushObject(thisPage.get_stub(params.pageNum + i));

      // insert a gap if needed
      if (params.pageNum + i < pageCount)
        thisPage.other_pages.pushObject(Ember.Object.create({is_gap: true}));

      // insert the last page unless we've already done so
      if (params.pageNum != pageCount)
        thisPage.other_pages.pushObject(thisPage.get_stub(pageCount));

      // insert some pages to the left of the current page
      for (var i = 1; i < Math.max(6 - (pageCount - params.pageNum), 3); i++)
        if (params.pageNum - i > 1)
          thisPage.other_pages.insertAt(0, thisPage.get_stub(params.pageNum - i));

      // insert a gap if needed
      if (params.pageNum - i > 1)
        thisPage.other_pages.insertAt(0, Ember.Object.create({is_gap: true}));

      // insert the first page unless we've already done so
      if (params.pageNum != 1)
        thisPage.other_pages.insertAt(0, thisPage.get_stub(1));

      return thisPage;
    });
  }
});