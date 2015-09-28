Rails.application.routes.draw do
  root :to => 'pages#main'
  get '/soundcloud' => 'pages#soundcloud_login' # DO THIS OR ELSE
  get '/callback' => 'pages#callback'
end
