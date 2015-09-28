Rails.application.routes.draw do
  root :to => 'pages#home'
  get '/callback' => 'pages#callback'
end
