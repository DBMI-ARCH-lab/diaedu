Discourse.KbEvidenceUploadButtonView = Discourse.View.extend({
  templateName: 'javascripts/diaedu/templates/evidence_upload_button',
  classNames: 'evidence-upload-button',

  didInsertElement: function() { var self = this;

    // setup the fileupload widget (jquery file upload plugin)
    this.$('input[type=file]').fileupload({
      url: '/kb/evidence',
      autoUpload: false,
      add: function (e, data) {
        // trigger the fileAdded action so the controller can handle creating a model
        self.get('controller').send('fileAdded', data.files[0], data);
      },
      fail: function (e, data) {
        self.get('controller').send('fileFailed', data.files[0]);
      },
      done: function (e, data) {
        self.get('controller').send('fileCompleted', data.files[0], data.result);
      }
    });
  }
});
