from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        token["user_id"] = user.id
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        user = self.user
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        data["username"] = user.get_username()
        data["user_id"] = user.id
        return data
