require_dependency "diaedu/application_controller"

module Diaedu
  class GlyprobsController < ::ApplicationController
    def index
      render(:json => Diaedu::Glyprob.by_event_name.limit(80).all.as_json(:include => :event))
    end
  end
end
