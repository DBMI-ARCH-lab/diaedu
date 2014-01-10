// models a page of objects
Discourse.KbObjPage = Discourse.Model.extend({
  pageId: null,
  isActive: false,
  objs: null,
  otherPages: null,
  filterParams: null,
  dataType: null,

  isEmpty: Ember.computed.empty('objs.[]'),

  multiplePages: function() {
    return this.otherPages.length > 1;
  }.property('otherPages'),

  getStub: function(pageId) {
    return Discourse.KbObjPage.create({pageId: pageId, filterParams: this.get('filterParams')});
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

    return Discourse.cleanAjax(url, {data: {perPage: params.perPage}}).then(function(data) {

      // compute how many pages there will be and generate stub Page objects for them
      var pageCount = Math.ceil(data.totalCount / data.perPage);

      // if the current page is too high, trim it
      if (params.pageNum > pageCount)
        params.pageNum = pageCount;

      // start the obj
      var thisPage = Discourse.KbObjPage.create({
        pageId: params.pageNum,
        filterParams: params.filterParams,
        isActive: true,
        objs: Em.A(),
        otherPages: Em.A(),
        dataType: params.dataType
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
      thisPage.otherPages.pushObject(thisPage);

      // insert some pages to the right of the current page
      for (var i = 1; i < Math.max(6 - params.pageNum, 3); i++)
        if (params.pageNum + i < pageCount)
          thisPage.otherPages.pushObject(thisPage.getStub(params.pageNum + i));

      // insert a gap if needed
      if (params.pageNum + i < pageCount)
        thisPage.otherPages.pushObject(Ember.Object.create({isGap: true}));

      // insert the last page unless we've already done so
      if (params.pageNum != pageCount)
        thisPage.otherPages.pushObject(thisPage.getStub(pageCount));

      // insert some pages to the left of the current page
      for (var i = 1; i < Math.max(6 - (pageCount - params.pageNum), 3); i++)
        if (params.pageNum - i > 1)
          thisPage.otherPages.insertAt(0, thisPage.getStub(params.pageNum - i));

      // insert a gap if needed
      if (params.pageNum - i > 1)
        thisPage.otherPages.insertAt(0, Ember.Object.create({isGap: true}));

      // insert the first page unless we've already done so
      if (params.pageNum != 1)
        thisPage.otherPages.insertAt(0, thisPage.getStub(1));

      return thisPage;
    });
  }
});