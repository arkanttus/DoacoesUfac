
from random import choice
import string


def gerar_token(tam=6):
    token = ''
    choices = string.ascii_letters + string.digits
    for i in range(tam):
        token += choice(choices)
    return token