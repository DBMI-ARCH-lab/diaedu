Diaedu::Engine.routes.draw do
	root(:to => 'home#index')
	resources(:glyprobs, :path => 'glycemic-problems')
end
