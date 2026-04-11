from flask import Flask
from config import Config

def create_app():
    # Tell Flask the static folder is in the parent directory
    app = Flask(__name__, 
                static_folder='../static',      # ← This is the key fix
                static_url_path='/static')      # Keep the URL as /static/...
    
    app.config.from_object(Config)
    
    from app.routes import main_bp
    app.register_blueprint(main_bp)
    
    return app