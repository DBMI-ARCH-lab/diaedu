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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130821140440) do

  create_table "diaedu_glyprobs", :force => true do |t|
    t.string   "evaluation"
    t.integer  "event_id"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "diaedu_glyprobs", ["evaluation"], :name => "index_diaedu_glyprobs_on_evaluation"
  add_index "diaedu_glyprobs", ["event_id"], :name => "index_diaedu_glyprobs_on_event_id"

  create_table "glyprobs", :force => true do |t|
    t.string   "evaluation"
    t.integer  "event_id"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "glyprobs", ["evaluation"], :name => "index_glyprobs_on_evaluation"
  add_index "glyprobs", ["event_id"], :name => "index_glyprobs_on_event_id"

  create_table "test_engine_bars", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "test_engine_foos", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
