from rest_framework import permissions
from apps.users.models import User


class IsRelated(permissions.BasePermission):
    message = 'Você não está relacionado com esta doação!'

    def has_object_permission(self, request, view, obj):
        if request.user.type_user == User.DONATOR:
            return request.user.id == obj.donator.id 
        else:
            return request.user.id == obj.institution.owner.id


class IsInstitution(permissions.BasePermission):
    message = 'Você precisa ter uma instituição e estar relacionado com esta doação para realizar esta ação!'

    def has_object_permission(self, request, view, obj):
        return request.user.type_user == User.RECEIVER and request.user.id == obj.institution.owner.id


class IsDonator(permissions.BasePermission):
    message = 'Você precisa ser um doador para realizar esta ação!'

    def has_object_permission(self, request, view, obj):
        return request.user.type_user == User.DONATOR


class Nobody(permissions.BasePermission):
    message = 'Ação inválida!'

    def has_permission(self, request, view):
        return False
