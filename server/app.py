from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_restful import Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt



# class Base(DeclarativeBase):
#     pass

app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(app, metadata=metadata)
api = Api(app)

CORS(app, supports_credentials=True)

bcrypt = Bcrypt(app)


# Import routes after app and db initialization to avoid circular imports
from routes import *

if __name__ == '__main__':
    app.run(debug=True)
