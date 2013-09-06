Diaedu::Engine.routes.draw do
  root(:to => 'home#index')
  
  resources(:glyprobs, :path => 'glycemic-problems')
  match('/glycemic-problems/page/:page' => 'glyprobs#index')
  match('/glycemic-problems/:filter_params/page/:page' => 'glyprobs#index')
  
  resources(:triggers, :path => 'triggers')
  match('/triggers/page/:page' => 'triggers#index')
  match('/triggers/:filter_params/page/:page' => 'triggers#index')
  
  match('/goals' => 'kb_objs#index', :data_type => 'goals')
  match('/goals/page/:page' => 'kb_objs#index', :data_type => 'goals')
  match('/goals/:filter_params/page/:page' => 'kb_objs#index', :data_type => 'goals')

  match('/filter-options' => 'filter_options#fetch')
end
