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

ActiveRecord::Schema.define(version: 20150210101243) do

  create_table "classrooms", force: :cascade do |t|
    t.string   "classroom_number"
    t.integer  "school_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "classrooms", ["school_id"], name: "index_classrooms_on_school_id"

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
  end

end
