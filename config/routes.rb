Rails.application.routes.draw do

  


  

  resources :events

  resources :examinations do
    resources :exam_schemas
    resources :slots
    resources :examination_results
  end

  resources :attendances

  resources :students
  
  resources :sessions, only: [:create,:destroy]  

  resources :teachings

  resources :lectures

  

  resources :sub_subjects

  

  resources :default_sub_subjects

  resources :default_main_subjects

  resources :default_classrooms, only: [:index]

#custom template start here
get 'template/courses', to: 'template#courses'
get 'template/teacher_profile', to: 'template#teacher_profile'
get 'template/classrooms', to: 'template#classrooms'
get 'template/teacher', to: 'template#teacher'
get 'template/classroom_section',to: 'template#classroom_section'
get 'template/sections', to: 'template#sections'
get 'template/login', to: 'template#login'
get 'template/checklogin', to: 'template#checklogin'
get 'template/classroomHome', to: 'template#classroomHome'
get 'template/classroomTakeAttendance', to: 'template#classroomTakeAttendance'
get 'template/classroomShowAttendance', to: 'template#classroomShowAttendance'
get 'template/examination', to: 'template#examination'
get 'template/selectedExam', to: 'template#selectedExam'
get 'template/examinationSlot', to: 'template#examinationSlot'
get 'template/student_form', to: 'template#student_form'
#custom template end here

root 'schools#product'  
#new routes
get 'sessions/checklogin', to: 'sessions#checklogin'
resources :teachers
resources :sections, only: [:index]
resources :classrooms, only: [:index,:show,:destroy,:create] do

  resources :courses

  resources :main_subjects
  resources :sections do
    resources :students
  end
end

#these routes are to be used when we request schools/:id
#but when using login these are not required at all 
#resources :schools, except: [:destroy] do
#    resources :teachers
#    resources :students
#    resources :sections, only: [:index]
#    
#    resources :classrooms, only: [:index,:show,:destroy,:create] do
#      resources :sections, only: [:index,:show,:create,:destroy] do
#        #to display teacher of that class
#        resources :teachers, only: [:index]
#      end
#    end
#  end


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
