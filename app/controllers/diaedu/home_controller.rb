module Diaedu
  class HomeController < ApplicationController
    def index
    end

    def login
      render(:text => "Please Login")
    end
  end
end