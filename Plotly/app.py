from flask import Flask, jsonify, render_template, request, send_from_directory
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os

# Create engine using the `demographics.sqlite` database file
engine = create_engine("sqlite:///belly_button_biodiversity.sqlite")

# Declare a Base using `automap_base()`
Base = automap_base()

# Use the Base class to reflect the database tables
Base.prepare(engine, reflect=True)

#Create a session
session = Session(engine)

app = Flask(__name__, static_url_path='',  static_folder='')

root = os.path.dirname(os.path.abspath(__file__))

@app.route("/")
  #Return the dashboard homepage.
def welcome():
	return send_from_directory(root, 'index.html')


@app.route("/names")

def names():
	#Read into pandas from sql
	names_query = pd.read_sql_query("PRAGMA table_info(samples);", engine)
	names = names_query["name"]
	#Convert to json string
	names = names.to_json()
	#Convert to dictionary
	names_dict = json.loads(names)
	#Delete first index
	names_dict = { key:value for key,value in names_dict.items() if key != '0'}
	#Get only values from dict
	names_list = names_dict.values()
	#Return list
	return jsonify(list(names_list))


@app.route('/otu')

def otu():
	#Read into pandas from sql
	otu_query = pd.read_sql_query("SELECT * FROM otu", engine)
	otu = otu_query['lowest_taxonomic_unit_found']
	#Convert to json string
	otu = otu.to_json()
	#Convert to dictionary
	otu_dict = json.loads(otu)
	#Get only values from dict
	otu_list = otu_dict.values()
	#Return list
	return jsonify(list(otu_list))


@app.route('/metadata/<sample>')

def samples(sample):
	#Replace BB with nothing in the sample parameter
	sample = sample.replace("BB_", "")
	#Select all from the samples_metadata table
	samples_query = pd.read_sql_query("SELECT * FROM samples_metadata", engine)
	samples_query['SAMPLEID'] = samples_query['SAMPLEID'].astype(str)
	samples = samples_query.set_index('SAMPLEID')
	#Convert dataframe to dictonary
	samples_dict = samples.to_dict(orient='index')
	#Return sample dictionary
	return jsonify(samples_dict[sample])


@app.route('/wfreq/<sample>')

def wfreq(sample):	
	#Replace BB with nothing in the sample parameter
	sample = sample.replace("BB_", "")
	#Select WFREQ column from samples_query
	wfreq_query = pd.read_sql_query("SELECT SAMPLEID,WFREQ FROM samples_metadata", engine)
	wfreq_query['SAMPLEID'] = wfreq_query['SAMPLEID'].astype(str)
	wfreq_query = wfreq_query.set_index('SAMPLEID')
	#Convert dataframe to dictionary
	wfreq_dict = wfreq_query.to_dict(orient='index')
	#Return sample dictionary
	return jsonify(wfreq_dict[sample])


@app.route('/samples/<sample>')

def last(sample):	
	#Select all from samples table
	last_query = pd.read_sql_query("SELECT * FROM samples", engine)
	last_query = last_query.astype(str)
	#Sort descending
	last_query = last_query.sort_index(ascending=False)
	#Convert dataframe to dictionary
	last_dict = last_query.to_dict(orient='list')

	return_dict = {'otu_id': last_dict['otu_id'], 'sample_data': last_dict[sample]}
	#Return dictionary
	return jsonify(return_dict)	


 

if __name__ == "__main__":
    app.run(debug=True)