# name: diaedu
# about: Diabetes educator knowledge base
# version: 0.1
# authors: Tom Smyth, Jill Dimond

# load the engine definition, which is in a separate file so that script/rails can use it
require File.expand_path('../lib/diaedu/engine', __FILE__)

# ensure plugin translations get loaded
I18n.load_path << "#{File.dirname(__FILE__)}/config/locales/client.en.yml"

# register the two main assets (sprockets will take over from here)
register_asset('javascripts/diaedu.js')
register_asset('stylesheets/diaedu.css')

after_initialize do

  # add plugin route
  Discourse::Application.routes.prepend do
    mount ::Diaedu::Engine, at: "/kb"
  end

end