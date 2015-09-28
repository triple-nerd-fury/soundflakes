Rails.application.routes.draw do
  root :to => 'pages#home'
  get '/paperjs' => 'pages#main'
  get '/callback' => 'pages#callback'
end
