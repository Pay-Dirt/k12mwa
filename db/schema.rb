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

ActiveRecord::Schema.define(version: 20150301165751) do

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
    t.boolean  "attendance"
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

  create_table "default_classrooms", force: :cascade do |t|
    t.string   "classroom_name"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "default_main_subjects", force: :cascade do |t|
    t.string   "name"
    t.integer  "max_marks"
    t.boolean  "is_graded"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "default_sub_subjects", force: :cascade do |t|
    t.string   "name"
    t.integer  "max_marks"
    t.integer  "default_main_subject_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "default_sub_subjects", ["default_main_subject_id"], name: "index_default_sub_subjects_on_default_main_subject_id"

  create_table "lectures", force: :cascade do |t|
    t.integer  "teacher_id"
    t.integer  "sub_subject_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.boolean  "combined_section"
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
