from rest_framework import response, status, viewsets, views, permissions, generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.utils.translation import gettext_lazy as _
from rest_framework.decorators import action

from .serializers import UserReadSerializer, UserCreateSerializer, PasswordChangeSerializer
from .permissions import PostOnlyPermissions
from apps.users.models import User
from apps.donates.models import Donate
from apps.donates.serializers import UserDonateSerializer
from apps.base.api.serializers import InstitutionReadSerializer
from apps.base.models import Institution


class UserView(viewsets.ModelViewSet):
    model = User
    # PermissionsClasses só permite AllowAny no POST
    permission_classes = [
        PostOnlyPermissions,
    ]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserReadSerializer
        return UserCreateSerializer

    def get_queryset(self):
        return User.objects.filter(is_active=True)

    def list(self, request, *args, **kwargs):
        # return super(UserView, self).list(request, *args, **kwargs)
        return response.Response({}, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user = super(UserView, self).create(request, *args, **kwargs)
        return user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        try:
            qs = User.objects.get(id=instance.id)
            serializer_read = UserReadSerializer(qs)
        except User.DoesNotExist:
            return response.Response({'errors': _('Usuário não encontrado')}, status=status.HTTP_404_NOT_FOUND)
        return response.Response(serializer_read.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        Token.objects.exclude(user=instance)
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['get'], detail=True)
    def donates(self, request, pk=None):
        queryset = Donate.objects.filter(donator_id=pk)
        serializer = UserDonateSerializer(queryset, many=True)
        return response.Response(serializer.data)

    @action(methods=['post'], detail=True)
    def change_password(self, request, pk=None):
        if str(self.request.user.id) != pk:
            return response.Response({'errors': _('Não tem autorização')}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
        serializer.is_valid()

        serializer.save()
        return response.Response({}, status=status.HTTP_200_OK)


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
        try:
            user.auth_token.delete()
        except AttributeError:
            pass
        token, created = Token.objects.get_or_create(user=user)
        serializer_user = UserReadSerializer(user)
        if user.type_user == User.RECEIVER:
            serializer_institution = InstitutionReadSerializer(user.institution_set.get())
        else:
            serializer_institution = None
        return response.Response({
            'token': token.key,
            'user': serializer_user.data,
            'institution': serializer_institution.data if serializer_institution else None
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

