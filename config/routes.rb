Diaedu::Engine.routes.draw do
  root(:to => 'home#index')
  
  PATH_PREFIXES = {'glyprobs' => 'glycemic-problems', 'triggers' => 'triggers', 'goals' => 'goals'}

  %w(glyprobs triggers goals).each do |dt|
    prefix = PATH_PREFIXES[dt]
    get("/#{prefix}" => 'kb_objs#index', :data_type => dt)
    post("/#{prefix}" => 'kb_objs#create', :data_type => dt)
    get("/#{prefix}/:id" => 'kb_objs#show', :data_type => dt)
    get("/#{prefix}/page/:page" => 'kb_objs#index', :data_type => dt)
    get("/#{prefix}/:filter_params/page/:page" => 'kb_objs#index', :data_type => dt)
  end

  get('/filter-options' => 'filter_options#fetch')
  get('/tags/suggest' => 'tags#suggest')
  get('/events/suggest' => 'events#suggest')
end
