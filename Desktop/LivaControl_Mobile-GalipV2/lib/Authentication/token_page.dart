import 'package:flutter/material.dart';

class TokenPage extends StatefulWidget {
  final VoidCallback onTokenSuccess;
  const TokenPage({super.key, required this.onTokenSuccess});

  @override
  State<TokenPage> createState() => _TokenPageState();
}

class _TokenPageState extends State<TokenPage> {
  final TextEditingController _tokenController = TextEditingController();
  String? _errorMessage;
  bool _isLoading = false;

  @override
  void dispose() {
    _tokenController.dispose();
    super.dispose();
  }

  void _checkToken() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });
    await Future.delayed(const Duration(milliseconds: 500)); // Simülasyon
    // Şimdilik her şey doğru kabul edilecek
    if (_tokenController.text.trim().isNotEmpty) {
      widget.onTokenSuccess();
    } else {
      setState(() {
        _errorMessage = 'Lütfen geçerli bir anahtar girin.';
      });
    }
    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isSmallScreen = size.width < 400;
    final horizontalPadding = isSmallScreen ? 16.0 : 32.0;
    final logoHeight = size.height * 0.13 > 120 ? 120.0 : size.height * 0.13;
    final inputFontSize = size.width < 350 ? 12.0 : 14.0;
    final buttonFontSize = size.width < 350 ? 14.0 : 16.0;
    final inputVertical = size.height * 0.018 < 12 ? 12.0 : size.height * 0.018;

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 400),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Logo
                  Padding(
                    padding: EdgeInsets.only(bottom: size.height * 0.04),
                    child: Image.asset(
                      'assets/livacontrol_logo.png',
                      height: logoHeight,
                    ),
                  ),
                  Text(
                    'Anahtar Doğrulama',
                    style: TextStyle(
                      fontSize: size.width < 350 ? 20 : 24,
                      fontWeight: FontWeight.w600,
                      color: Colors.black,
                    ),
                  ),
                  SizedBox(height: size.height * 0.04),
                  Text(
                    'Lütfen size verilen anahtarı giriniz',
                    style: TextStyle(
                      fontSize: inputFontSize,
                      fontWeight: FontWeight.w400,
                      color: Colors.black,
                    ),
                  ),
                  SizedBox(height: 8),
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: const Color(0xFFE8E8E8)),
                    ),
                    child: TextField(
                      controller: _tokenController,
                      style: TextStyle(fontSize: inputFontSize),
                      decoration: InputDecoration(
                        hintText: 'Anahtar / Token',
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: inputVertical,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: size.height * 0.04),
                  if (_errorMessage != null) ...[
                    Text(
                      _errorMessage!,
                      style: const TextStyle(color: Colors.red, fontSize: 14),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 12),
                  ],
                  SizedBox(
                    height: 48,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFF57A20),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      onPressed: _isLoading ? null : _checkToken,
                      child: _isLoading
                          ? const CircularProgressIndicator(
                              valueColor: AlwaysStoppedAnimation<Color>(
                                Colors.white,
                              ),
                            )
                          : Text(
                              'Devam',
                              style: TextStyle(
                                fontSize: buttonFontSize,
                                fontWeight: FontWeight.w600,
                                color: const Color.fromRGBO(255, 255, 255, 1),
                              ),
                            ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
