class Diaedu::EventsController < ::ApplicationController

  # returns json-formatted list of events matching params[:term]
  def suggest
    render(:json => Diaedu::Event.suggestions(params[:term]).map(&:name))
  end
end