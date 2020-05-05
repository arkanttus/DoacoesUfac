from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    
    message = 'Você não tem permissão para realizar esta ação!'

    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.owner.id