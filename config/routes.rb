Diaedu::Engine.routes.draw do
  root(:to => 'home#index')
  resources(:glyprobs, :path => 'glycemic-problems')
  match('/glycemic-problems/page/:page' => 'glyprobs#index')
  match('/glycemic-problems/:filter_params/page/:page' => 'glyprobs#index')
  resources(:triggers, :path => 'triggers')
  match('/triggers/page/:page' => 'triggers#index')
  match('/triggers/:filter_params/page/:page' => 'triggers#index')
  resources(:goals, :path => 'goals')
  match('/goals/page/:page' => 'goals#index')
  match('/goals/:filter_params/page/:page' => 'goals#index')
  match('/filter-options' => 'filter_options#fetch')
end
