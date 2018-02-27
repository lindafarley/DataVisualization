import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from flask import Flask, jsonify
from flask import Flask, jsonify

#Create an app, being sure to pass __name__
app = Flask(__name__)

#Define precipitation route
@app.route("/api/v1.0/precipitation")
def prcp():
    engine = create_engine("sqlite:///hawaii.db")
    prcp_query = pd.read_sql_query("SELECT date,prcp FROM measurement_sql WHERE date between '2017-01-01' AND '2018-01-01';", engine)
    return jsonify(prcp_query)

#Define station route
@app.route("/api/v1.0/stations")
def stations():
    engine = create_engine("sqlite:///hawaii.db")
    active_query = pd.read_sql_query("SELECT station,SUM(tobs) FROM measurement_sql GROUP BY station ORDER BY tobs DESC", engine)
    return jsonify(active_query["station"])

#Define tobs route
@app.route("/api/v1.0/tobs")
def tobs():
    engine = create_engine("sqlite:///hawaii.db")
    temp_queryAll = pd.read_sql_query("SELECT date,tobs FROM measurement_sql WHERE date between '2017-01-01' AND '2018-01-01'", engine)
    return jsonify(temp_queryAll)

if __name__ == "__main__":
    app.run(debug=True)

