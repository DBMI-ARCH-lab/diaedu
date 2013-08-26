Diaedu::Engine.routes.draw do
  root(:to => 'home#index')
  resources(:glyprobs, :path => 'glycemic-problems')
  match('/glycemic-problems/page/:page' => 'glyprobs#index')
  resources(:triggers, :path => 'triggers')
  match('/triggers/page/:page' => 'triggers#index')
  resources(:goals, :path => 'goals')
  match('/goals/page/:page' => 'goals#index')
end
