import requests

from navigo.settings import GOOGLE_RECAPTCHA_SECRET_KEY

def validate_recaptcha(recaptcha_response):
    values = {
        'secret': GOOGLE_RECAPTCHA_SECRET_KEY,
        'response': recaptcha_response
    }
    
    response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=values)

    return response.json().get("success")