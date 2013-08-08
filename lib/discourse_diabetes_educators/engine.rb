require 'discourse_diabetes_educators/plugin'

module DiscourseDiabetesEducators
  class Engine < Rails::Engine

    engine_name 'discourse_diabetes_educators'

    initializer "discourse_diabetes_educators.configure_rails_initialization" do |app|

      app.config.after_initialize do 
        DiscoursePluginRegistry.setup(DiscourseDiabetesEducators::Plugin)
      end
    end

  end
end