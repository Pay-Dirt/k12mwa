# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150410052503) do

  create_table "accounts", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "account_type"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "accounts", ["user_id"], name: "index_accounts_on_user_id"

  create_table "attendances", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "school_id"
    t.integer  "section_id"
    t.date     "date"
    t.string   "attendance"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "attendances", ["school_id"], name: "index_attendances_on_school_id"
  add_index "attendances", ["section_id"], name: "index_attendances_on_section_id"
  add_index "attendances", ["student_id"], name: "index_attendances_on_student_id"

  create_table "classrooms", force: :cascade do |t|
    t.string   "classroom_number"
    t.integer  "school_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "classrooms", ["school_id"], name: "index_classrooms_on_school_id"

  create_table "course_combinations", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "main_subject_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "course_combinations", ["course_id"], name: "index_course_combinations_on_course_id"
  add_index "course_combinations", ["main_subject_id"], name: "index_course_combinations_on_main_subject_id"

  create_table "courses", force: :cascade do |t|
    t.string   "name"
    t.integer  "classroom_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "courses", ["classroom_id"], name: "index_courses_on_classroom_id"

  create_table "courses_sections", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "section_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "courses_sections", ["course_id"], name: "index_courses_sections_on_course_id"
  add_index "courses_sections", ["section_id"], name: "index_courses_sections_on_section_id"

  create_table "default_classrooms", force: :cascade do |t|
    t.string   "classroom_name"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "default_main_subjects", force: :cascade do |t|
    t.string   "name"
    t.integer  "max_marks"
    t.boolean  "is_graded"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "classroom_number"
  end

  create_table "default_sub_subjects", force: :cascade do |t|
    t.string   "name"
    t.integer  "max_marks"
    t.integer  "default_main_subject_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.boolean  "is_practical"
  end

  add_index "default_sub_subjects", ["default_main_subject_id"], name: "index_default_sub_subjects_on_default_main_subject_id"

  create_table "events", force: :cascade do |t|
    t.date     "event_date"
    t.string   "details"
    t.string   "context"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "school_id"
  end

  add_index "events", ["school_id"], name: "index_events_on_school_id"

  create_table "exam_schemas", force: :cascade do |t|
    t.integer  "examination_id"
    t.date     "exam_date"
    t.integer  "duration"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "classroom_id"
    t.integer  "sub_subject_id"
    t.integer  "slot_id"
  end

  add_index "exam_schemas", ["classroom_id"], name: "index_exam_schemas_on_classroom_id"
  add_index "exam_schemas", ["examination_id"], name: "index_exam_schemas_on_examination_id"
  add_index "exam_schemas", ["slot_id"], name: "index_exam_schemas_on_slot_id"
  add_index "exam_schemas", ["sub_subject_id"], name: "index_exam_schemas_on_sub_subject_id"

  create_table "examination_results", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "examination_id"
    t.integer  "sub_subject_id"
    t.integer  "marks"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "examination_results", ["examination_id"], name: "index_examination_results_on_examination_id"
  add_index "examination_results", ["student_id"], name: "index_examination_results_on_student_id"
  add_index "examination_results", ["sub_subject_id"], name: "index_examination_results_on_sub_subject_id"

  create_table "examinations", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "school_id"
  end

  add_index "examinations", ["school_id"], name: "index_examinations_on_school_id"

  create_table "lectures", force: :cascade do |t|
    t.integer  "teacher_id"
    t.integer  "sub_subject_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.boolean  "combined_section"
    t.string   "name"
  end

  add_index "lectures", ["sub_subject_id"], name: "index_lectures_on_sub_subject_id"
  add_index "lectures", ["teacher_id"], name: "index_lectures_on_teacher_id"

  create_table "main_subjects", force: :cascade do |t|
    t.string   "name"
    t.integer  "max_marks"
    t.boolean  "is_graded"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "classroom_id"
  end

  add_index "main_subjects", ["classroom_id"], name: "index_main_subjects_on_classroom_id"

  create_table "results", force: :cascade do |t|
    t.integer  "exam_schema_id"
    t.integer  "student_id"
    t.integer  "obtained_marks"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "results", ["exam_schema_id"], name: "index_results_on_exam_schema_id"
  add_index "results", ["student_id"], name: "index_results_on_student_id"

  create_table "schools", force: :cascade do |t|
    t.string   "name"
    t.string   "username"
    t.string   "city"
    t.string   "locality"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sections", force: :cascade do |t|
    t.string   "section"
    t.integer  "classroom_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "teacher_id"
  end

  add_index "sections", ["classroom_id"], name: "index_sections_on_classroom_id"

  create_table "slots", force: :cascade do |t|
    t.integer  "examination_id"
    t.time     "start_time"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "name"
  end

  add_index "slots", ["examination_id"], name: "index_slots_on_examination_id"

  create_table "students", force: :cascade do |t|
    t.integer  "roll_number"
    t.string   "name"
    t.integer  "course_id"
    t.integer  "section_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "school_id"
  end

  add_index "students", ["course_id"], name: "index_students_on_course_id"
  add_index "students", ["school_id"], name: "index_students_on_school_id"
  add_index "students", ["section_id"], name: "index_students_on_section_id"

  create_table "sub_subjects", force: :cascade do |t|
    t.string   "name"
    t.integer  "max_marks"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "main_subject_id"
    t.boolean  "is_practical"
  end

  add_index "sub_subjects", ["main_subject_id"], name: "index_sub_subjects_on_main_subject_id"

  create_table "teachers", force: :cascade do |t|
    t.string   "name"
    t.string   "fathers_name"
    t.string   "contact"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "school_id"
  end

  add_index "teachers", ["school_id"], name: "index_teachers_on_school_id"

  create_table "teachings", force: :cascade do |t|
    t.integer  "lecture_id"
    t.integer  "section_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "teachings", ["lecture_id"], name: "index_teachings_on_lecture_id"
  add_index "teachings", ["section_id"], name: "index_teachings_on_section_id"

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "mobile"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "password_digest"
    t.integer  "school_id"
  end

  add_index "users", ["mobile"], name: "index_users_on_mobile"
  add_index "users", ["school_id"], name: "index_users_on_school_id"
  add_index "users", ["username"], name: "index_users_on_username", unique: true

end
