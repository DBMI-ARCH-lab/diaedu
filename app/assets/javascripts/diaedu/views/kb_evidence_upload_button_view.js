Discourse.KbEvidenceUploadButtonView = Discourse.View.extend({
  templateName: 'javascripts/diaedu/templates/evidence_upload_button',
  classNames: 'evidence-upload-button',

  didInsertElement: function() { var self = this;

    // setup the fileupload widget (jquery file upload plugin)
    this.$('input[type=file]').fileupload({
      url: '/kb/evidence',
      acceptFileTypes: /(\.|\/)(pdf|doc|docx)$/i,
      maxFileSize: 10000000, // 10 MiB

    }).on('fileuploadadd', function (e, data) {
      $.each(data.files, function (index, file) {
        // trigger the fileAdded action so the controller can handle creating a model
        self.get('controller').send('fileAdded', file);
      });
    }).on('fileuploadfail', function (e, data) {
      $.each(data.files, function (index, file) {
        self.get('controller').send('fileFailed', file);
      });
    }).on('fileuploaddone', function (e, data) {
      $.each(data.files, function (index, file) {
        self.get('controller').send('fileCompleted', file, data.result);
      });
    });
  }
});
