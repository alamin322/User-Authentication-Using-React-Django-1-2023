from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
def signup_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    print("username: ", username)
    print("password: ", password)

    if User.objects.filter(username=username).exists():
        return Response(status=status.HTTP_409_CONFLICT)  # Username already exists

    user = User.objects.create_user(username=username, password=password)
    user.save()
    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def signin_view(request):
    username = request.data.get('username_login')
    password = request.data.get('password_login')

    print("username: ", username)
    print("password: ", password)

    user = authenticate(request, username=username, password=password)

    # print("Hello this is user: ", user)
    # print("Hello this is userpassword: ", password)

    if user is not None:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
        }, status=status.HTTP_200_OK)
    else:
        print("User not found")
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def signout_view(request):
    try:
        refresh_token = request.data['refresh_token']
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)
