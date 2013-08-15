require 'discourse_plugin'

module DiscourseDiabetesEducators

  class Plugin < DiscoursePlugin

    def setup
      register_js('discourse_diabetes_educators')
      register_css('discourse_diabetes_educators')
    end

  end
end