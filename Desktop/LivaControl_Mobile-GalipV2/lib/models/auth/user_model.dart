class UserModel {

///Kullanıcı bilgisi modeli.

  final String id;
  final String username;

  UserModel({required this.id, required this.username});

  factory UserModel.fromPayload(Map<String, dynamic> payload) {
    return UserModel(
      id: payload['sub']?.toString() ?? '',
      username: payload['username']?.toString() ?? '',
    );
  }
} 