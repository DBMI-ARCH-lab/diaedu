Discourse.KbEvidenceUploadButtonView = Discourse.View.extend({
  templateName: 'javascripts/diaedu/templates/evidence_upload_button',
  classNames: 'evidence-upload-button',

  didInsertElement: function() { var self = this;
    // setup the fileupload widget (jquery file upload plugin)
    this.$('input[type=file]').fileupload({
      acceptFileTypes: /(\.|\/)(pdf|doc|docx)$/i,
      maxFileSize: 10000000, // 10 MiB
    }).on('fileuploadadd', function (e, data) {
      $.each(data.files, function (index, file) {
        // create a KbEvidenceFileView and add to the KbEvidenceFormView
        console.log("file added", index, file);
      });
    });
  }
});

// lastModifiedDate: Fri Oct 25 2013 15:32:59 GMT-0400 (EDT)
// name: "Screen Shot 2013-10-25 at 3.32.53 PM.png"
// size: 118505
// type: "image/png"
// webkitRelativePath: ""
// __proto__: File