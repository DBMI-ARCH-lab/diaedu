Diaedu::Engine.routes.draw do
  root(:to => 'home#index')
  
  match('/glycemic-problems' => 'kb_objs#index', :data_type => 'glyprobs')
  match('/glycemic-problems/page/:page' => 'kb_objs#index', :data_type => 'glyprobs')
  match('/glycemic-problems/:filter_params/page/:page' => 'kb_objs#index', :data_type => 'glyprobs')

  match('/triggers' => 'kb_objs#index', :data_type => 'triggers')
  match('/triggers/page/:page' => 'kb_objs#index', :data_type => 'triggers')
  match('/triggers/:filter_params/page/:page' => 'kb_objs#index', :data_type => 'triggers')
  match('/triggers/:filter_params/page/:page/new' => 'kb_objs#index', :data_type => 'triggers')
  
  match('/goals' => 'kb_objs#index', :data_type => 'goals')
  match('/goals/page/:page' => 'kb_objs#index', :data_type => 'goals')
  match('/goals/:filter_params/page/:page' => 'kb_objs#index', :data_type => 'goals')

  match('/filter-options' => 'filter_options#fetch')
end
