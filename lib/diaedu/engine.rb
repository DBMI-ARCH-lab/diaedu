require 'diaedu/plugin'

module Diaedu
  class Engine < ::Rails::Engine

    engine_name 'diaedu'
    isolate_namespace Diaedu

    initializer "diaedu.configure_rails_initialization" do |app|

      app.config.after_initialize do
      	DiscoursePluginRegistry.setup(Diaedu::Plugin) if Object.const_defined?('DiscoursePluginRegistry')
      end
    end

  end
end