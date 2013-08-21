# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'diaedu/version'

Gem::Specification.new do |spec|
  spec.name          = "diaedu"
  spec.version       = Diaedu::VERSION
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

  # building factories for testing -- stupid and offensive name but it's a good gem :(
  spec.add_development_dependency "factory_girl_rails", "~> 4.0"

  # foreign key maintenance
  spec.add_development_dependency 'foreigner'
end
