# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'discourse_diabetes_educators/version'

Gem::Specification.new do |spec|
  spec.name          = "discourse_diabetes_educators"
  spec.version       = DiscourseDiabetesEducators::VERSION
  spec.authors       = ["Thomas Smyth"]
  spec.email         = ["tom@sassafrastech.com"]
  spec.description   = %q{Diabetes Educators knowledgebase plugin for Discourse}
  spec.summary       = %q{Diabetes Educators knowledgebase plugin for Discourse}
  spec.homepage      = "http://sassafrastech.com"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
