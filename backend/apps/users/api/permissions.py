from rest_framework.permissions import IsAuthenticated


class PostOnlyPermissions(IsAuthenticated):
    def has_permission(self, request, view):
        if view.action == 'create':
            return True
        return super(PostOnlyPermissions, self).has_permission(request, view)
