// models a link or a file attachment
Discourse.KbEvidenceItem = Discourse.Model.extend({

  type: null, // link or file
  title: null,
  url: null,
  file: null // data about the file

});