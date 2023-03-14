from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from Usuarios.models import User
from Usuarios.serializers import UserSerializer
from django.core.files.storage import default_storage
# Create your views here.


@csrf_exempt
def userAPI(request,pk=0):
    if request.method== 'GET':
        if pk==0:
            users= User.objects.all()
            users_serializer= UserSerializer(users,many=True)
            return JsonResponse(users_serializer.data,safe=False)
        else:
            usuario = User.objects.get(UserId=pk)
            data = {
            'UserId': usuario.UserId,
            'UserNome': usuario.UserNome,
            'UserSobrenome': usuario.UserSobrenome,
            'UserEmail': usuario.UserEmail,
            "UserData_criacao":usuario.UserData_cadastro,
            'url': request.build_absolute_uri()
        }
            return JsonResponse(data)
       
        
    elif request.method=='POST':
        user_data=JSONParser().parse(request)
        users_serializer=UserSerializer(data=user_data)
        if  users_serializer.is_valid():
            user = users_serializer.save()
            url = request.build_absolute_uri(f"/user/{user.UserId}")
            return JsonResponse({'url': url}, status=201, safe=False)            
        return  JsonResponse('Failed to Add',safe=False)
    elif request.method=='PUT':
        user_data=JSONParser().parse(request)
        user=User.objects.get(UserId=pk)
        users_serializer=UserSerializer(data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse("Atualizado com sucesso",safe=False)
        return JsonResponse("Atuazalição falhou", safe=False)
    elif request.method=='DELETE':
        
        user=User.objects.get(UserId=pk)
        user.delete()
        return  JsonResponse("Deletado com sucesso",safe=False)
    

# @csrf_exempt
# def SaveFile(request):
#     file=request.FILES['file']
#     file_name=default_storage.save(file.name,file)
#     return JsonResponse(file_name, safe=False)