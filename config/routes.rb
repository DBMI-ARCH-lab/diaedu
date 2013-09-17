Diaedu::Engine.routes.draw do
  root(:to => 'home#index')
  
  get('/glycemic-problems' => 'kb_objs#index', :data_type => 'glyprobs')
  get('/glycemic-problems/page/:page' => 'kb_objs#index', :data_type => 'glyprobs')
  get('/glycemic-problems/:filter_params/page/:page' => 'kb_objs#index', :data_type => 'glyprobs')

  get('/triggers' => 'kb_objs#index', :data_type => 'triggers')
  post('/triggers' => 'kb_objs#create', :data_type => 'triggers')
  get('/triggers/page/:page' => 'kb_objs#index', :data_type => 'triggers')
  get('/triggers/:filter_params/page/:page' => 'kb_objs#index', :data_type => 'triggers')
  
  get('/goals' => 'kb_objs#index', :data_type => 'goals')
  get('/goals/page/:page' => 'kb_objs#index', :data_type => 'goals')
  get('/goals/:filter_params/page/:page' => 'kb_objs#index', :data_type => 'goals')

  get('/filter-options' => 'filter_options#fetch')

  get('/tags/suggest' => 'tags#suggest')
end
