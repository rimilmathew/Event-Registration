from django.db.models import Q
from rest_framework import generics, status
from events.models import Event, User, Registration
from events.serializers import EventSerializer, UserSerializer, MyRegistrationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class EventListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class SearchEventView(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            e=Event.objects.filter(Q(title__icontains=query)|Q(location__icontains=query))
            if not e.exists():
                return Response({'message': 'no result found'}, status=status.HTTP_200_OK)
            events=EventSerializer(e,many=True,context={'request':request})
            return Response(events.data,status=status.HTTP_200_OK)
        else:
            return Response({'message':'no result found'},status=status.HTTP_200_OK)


class EventDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def retrieve(self, request, *args, **kwargs):
        event = self.get_object()
        serializer = self.get_serializer(event)
        data = serializer.data
        data["is_registered"] = Registration.objects.filter(
            user=request.user,
            event=event
        ).exists()
        return Response(data)

class EventRegisterView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        registered, created = Registration.objects.get_or_create(user=request.user, event=event)
        if not created:
            return Response({"message":"Already registered for the event"}, status=status.HTTP_409_CONFLICT)
        return Response({"message":"Successfully registered"}, status=status.HTTP_201_CREATED)


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

class MyRegistrationsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MyRegistrationSerializer

    def get_queryset(self):
        return self.request.user.registrations.all().select_related("event")


