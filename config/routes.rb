Rails.application.routes.draw do

  

  resources :teachings

  resources :lectures

  resources :courses

  resources :sub_subjects

  resources :main_subjects

  resources :default_sub_subjects

  resources :default_main_subjects

resources :default_classrooms, only: [:index]

#custom template start here
get 'template/classrooms', to: 'template#classrooms'
get 'template/teacher', to: 'template#teacher'
get 'template/sections', to: 'template#sections'
#custom template end here

root 'schools#index'  

resources :schools, except: [:destroy] do
    resources :teachers
    resources :students
    resources :sections, only: [:index]
    
    resources :classrooms, only: [:index,:show,:destroy,:create] do
      resources :sections, only: [:index,:show,:create,:destroy] do
        #to display teacher of that class
        resources :teachers, only: [:index]
      end
    end
  end


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
