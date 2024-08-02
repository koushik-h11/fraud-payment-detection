from flask import Flask,request,jsonify
from flask_cors import CORS
import pandas as pd
import pickle
app=Flask(__name__)
CORS(app)
with open('best_model.pkl','rb') as file:
    model=pickle.load(file)
@app.route("/predict",methods=["POST"])
def predict():
    req=request.get_json(force=True)
    print(req)
    df=pd.DataFrame([req])
    ans=model.predict(df)
    response={"prediction":int(ans[0])}

    return jsonify(response)

if __name__=="__main__":
    app.run(debug=True)
