module Diaedu
  # nothington class modeling an evaluation, either high or low
  # separate object so as to work with filtering system
  # actually stored as text field of Glyprob
  class Eval
    # both id and name fields are expected by filter system
    attr_reader :id, :name

    def self.all_by_name
      @@instances = {'high' => new('high'), 'low' => new('low')} unless defined?(@@instances)
      @@instances
    end

    def self.all
      all_by_name.values
    end

    def self.get(value)
      all_by_name[value]
    end

    def initialize(value)
      @id = value
      @name = I18n.t("js.kb.evals.#{value}")
    end
  end
end
