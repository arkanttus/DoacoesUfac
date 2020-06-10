import os
import uuid
import unicodedata
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.utils import timezone

User = get_user_model()


class BaseModel(models.Model):
    id = models.UUIDField('ID', default=uuid.uuid4, editable=False, primary_key=True)
    created_at = models.DateTimeField(_('Criado em'), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_('Última atualização'), editable=False, null=True, blank=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if self.created_at:
            self.updated_at = timezone.now()
        return super(BaseModel, self).save(*args, **kwargs)


class TypeInstitution(BaseModel):
    name = models.CharField(_('Nome'), max_length=100, unique=True)

    class Meta:
        verbose_name = _('Tipo de Instituição')
        verbose_name_plural = _('Tipos de Instituição')

    def __str__(self):
        return f'{self.name}'


def path_image_institution(instance, filename):
    extension = os.path.splitext(filename)[-1]
    name_format = ''.join(
        ch for ch in unicodedata.normalize('NFKD', instance.name) if not unicodedata.combining(ch)
    )
    return f'institution/{instance.id}_{name_format}{extension}'


class Institution(BaseModel):
    # Info
    name = models.CharField(_('Instituição'), max_length=200)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name=_('Responsável pela Instituição'), related_name='institution'
    )
    type_institution = models.ForeignKey(
        TypeInstitution, on_delete=models.PROTECT, verbose_name=_('Tipo de Instituição')
    )
    other_type = models.CharField(_('Outro tipo'), max_length=100, null=True, blank=True)
    description = models.TextField(_('Descrição da Instituição'), max_length=500)
    image = models.ImageField(_('Foto da instituição'), upload_to=path_image_institution)

    # Geo
    latitude = models.CharField(_('Latitude'), max_length=20, null=True, blank=True)
    longitude = models.CharField(_('Longitude'), max_length=20, null=True, blank=True)
    uf = models.CharField(_('Estado'), max_length=100)
    city = models.CharField(_('Cidade'), max_length=150)

    # Social
    link_twitter = models.CharField(_('Twitter'), null=True, blank=True, max_length=200)
    link_instagram = models.CharField(_('Instagram'), null=True, blank=True, max_length=200)
    link_facebook = models.CharField(_('Facebook'), null=True, blank=True, max_length=200)

    class Meta:
        verbose_name = _('Instituição')
        verbose_name_plural = _('Instituições')

    def __str__(self):
        return f'{self.name} - Owner: {self.owner.name}'

    def clean(self):
        if self.type_institution and self.type_institution.name.startswith('Outro') and not self.other_type:
            raise ValidationError(_('Especifique o tipo de instituição'))

    def save(self, *args, **kwargs):
        try:
            obj = Institution.objects.get(id=self.id)
            if obj.image != self.image:
                obj.image.delete(save=False)
        except:
            pass
        return super(Institution, self).save(*args, **kwargs)

    @property
    def get_institution(self):
        if self.type_institution.name.startswith('Outro'):
            return f'{self.other_type}'
        else:
            return self.type_institution.name if self.type_institution else ''


class Contact(models.Model):
    name = models.CharField(_('Nome'), max_length=150)
    email = models.EmailField(_('Email'))
    subject = models.CharField(_('Titulo'), max_length=200)
    message = models.TextField(_('Mensagem'), max_length=700)

    class Meta:
        verbose_name_plural = _('Contatos')
        verbose_name = _('Contato')

    def __str__(self):
        return f'{self.name}'


