import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';

// --- Modeller ---
class Kullanici {
  final String id;
  final String ad;
  final String rol; // 'admin' veya 'staff'
  final String? token;

  Kullanici({
    required this.id,
    required this.ad,
    required this.rol,
    this.token,
  });

  factory Kullanici.fromJson(Map<String, dynamic> json) {
    return Kullanici(
      id: json['id'],
      ad: json['ad'],
      rol: json['rol'],
      token: json['token'],
    );
  }
}

class Harcama {
  final String id;
  final String kullaniciId;
  final String yoneticiId;
  final String baslik;
  final double tutar;
  final DateTime tarih;
  final String durum; // 'pending', 'approved', 'rejected'
  final bool kisisel;
  final String? fotoUrl;

  Harcama({
    required this.id,
    required this.kullaniciId,
    required this.yoneticiId,
    required this.baslik,
    required this.tutar,
    required this.tarih,
    required this.durum,
    required this.kisisel,
    this.fotoUrl,
  });

  factory Harcama.fromJson(Map<String, dynamic> json) {
    return Harcama(
      id: json['id'],
      kullaniciId: json['kullaniciId'],
      yoneticiId: json['yoneticiId'],
      baslik: json['baslik'],
      tutar: (json['tutar'] as num).toDouble(),
      tarih: DateTime.parse(json['tarih']),
      durum: json['durum'],
      kisisel: json['kisisel'] ?? false,
      fotoUrl: json['fotoUrl'],
    );
  }
}

// --- API Servis Katmanı ---
class ApiServis {
  static const String baseUrl = 'https://api.ornek.com'; // Değiştirilebilir

  // Kullanıcı girişi
  static Future<Kullanici?> girisYap(String ad, String sifre) async {
    final url = Uri.parse('$baseUrl/giris');
    final response = await http.post(url, body: {'ad': ad, 'sifre': sifre});
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return Kullanici.fromJson(data);
    } else {
      return null;
    }
  }

  // Harcama ekle
  static Future<bool> harcamaEkle({
    required String token,
    required String baslik,
    required double tutar,
    required DateTime tarih,
    required bool kisisel,
    String? fotoUrl,
  }) async {
    final url = Uri.parse('$baseUrl/harcama');
    final response = await http.post(
      url,
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: json.encode({
        'baslik': baslik,
        'tutar': tutar,
        'tarih': tarih.toIso8601String(),
        'kisisel': kisisel,
        'fotoUrl': fotoUrl,
      }),
    );
    return response.statusCode == 200;
  }

  // Harcamaları listele (kullanıcıya veya yöneticiye göre)
  static Future<List<Harcama>> harcamalariGetir({
    required String token,
    String? kullaniciId,
    String? yoneticiId,
    String? durum, // 'pending', 'approved', 'rejected'
  }) async {
    final params = <String, String>{};
    if (kullaniciId != null) params['kullaniciId'] = kullaniciId;
    if (yoneticiId != null) params['yoneticiId'] = yoneticiId;
    if (durum != null) params['durum'] = durum;
    final url = Uri.parse(
      '$baseUrl/harcamalar',
    ).replace(queryParameters: params);
    final response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $token'},
    );
    if (response.statusCode == 200) {
      final List data = json.decode(response.body);
      return data.map((e) => Harcama.fromJson(e)).toList();
    } else {
      return [];
    }
  }

  // Harcama onayla/reddet
  static Future<bool> harcamaOnayla({
    required String token,
    required String harcamaId,
    required bool onay, // true: onayla, false: reddet
  }) async {
    final url = Uri.parse('$baseUrl/harcama/onay');
    final response = await http.post(
      url,
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: json.encode({'harcamaId': harcamaId, 'onay': onay}),
    );
    return response.statusCode == 200;
  }

  // Fotoğraf yükle
  static Future<String?> fotografYukle({
    required String token,
    required String dosyaYolu,
  }) async {
    final url = Uri.parse('$baseUrl/fotograf/yukle');
    final request = http.MultipartRequest('POST', url)
      ..headers['Authorization'] = 'Bearer $token'
      ..files.add(await http.MultipartFile.fromPath('dosya', dosyaYolu));
    final response = await request.send();
    if (response.statusCode == 200) {
      final respStr = await response.stream.bytesToString();
      final data = json.decode(respStr);
      return data['url'];
    } else {
      return null;
    }
  }
}
