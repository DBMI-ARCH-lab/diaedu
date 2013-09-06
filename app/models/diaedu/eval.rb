module Diaedu
  # models an evaluation, either high or low
  # separate object so as to work with filtering system
  # actually stored as text field of Glyprob
  class Eval
    # both id and name fields are expected by filter system
    attr_reader :id, :name

    def initialize(value)
      @id = @name = value
    end
  end
end
