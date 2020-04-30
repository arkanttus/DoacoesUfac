from rest_framework import response, status, viewsets, views, permissions, generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.utils.translation import gettext_lazy as _
from rest_framework.decorators import action

from .serializers import (UserReadSerializer, UserCreateSerializer)
from .permissions import PostOnlyPermissions
from apps.users.models import User
from apps.donates.models import Donate
from apps.donates.serializers import DonateSerializer


class UserView(viewsets.ModelViewSet):
    model = User
    # PermissionsClasses só permite AllowAny no POST
    permission_classes = [
        PostOnlyPermissions,
    ]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer
        return UserReadSerializer

    def get_queryset(self):
        return User.objects.filter(is_active=True)

    def list(self, request, *args, **kwargs):
        # return super(UserView, self).list(request, *args, **kwargs)
        return response.Response({}, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user = super(UserView, self).create(request, *args, **kwargs)
        return user

    def update(self, request, *args, **kwargs):
        return super(UserView, self).update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        Token.objects.exclude(user=instance)
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['get'], detail=True)
    def donates(self, request, pk=None):
        queryset = Donate.objects.filter(donator_id=pk)
        serializer = DonateSerializer(queryset, many=True)
        return response.Response(serializer.data)


class Login(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        # if not user.email_confirm:
        #     return response.Response(data={
        #         'detail': "Usuário não confirmou e-mail"
        #     }, status=status.HTTP_406_NOT_ACCEPTABLE
        #     )
        token, created = Token.objects.get_or_create(user=user)
        serializer_user = UserReadSerializer(user)
        return response.Response({
            'token': token.key,
            'user': serializer_user.data
        }, status=status.HTTP_200_OK
        )


class LogoutView(views.APIView):
    """
    Calls Django logout method and delete the Token object
    assigned to the current User object.

    Accepts/Returns nothing.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        return self.logout(request)

    def logout(self, request):
        try:
            request.user.auth_token.delete()
        except AttributeError:
            pass
        res = response.Response({"detail": _("Deslogado com sucesso.")}, status=status.HTTP_200_OK)

        return res

