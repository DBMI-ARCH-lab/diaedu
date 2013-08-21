require 'discourse_plugin'

module Diaedu

  class Plugin < DiscoursePlugin

    def setup
      register_js('diaedu')
      register_css('diaedu')
    end

  end
end