from django.urls import re_path,path
from Usuarios import views
from .views import userAPI
from django.conf.urls.static import static
from django.conf import settings

urlpatterns =[
    # re_path(r'^user/',views.userAPI),
    # re_path(r'^user/{UserId}',views.userAPI),]
    path('', views.userAPI),
    path('user/<pk>', views.userAPI),]

#     re_path(r'^user/savefile', views.SaveFile)
# ] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)