import 'package:flutter/material.dart';
import '../models/expense_report.dart';
import '../Homepages/home_page.dart';
import 'add_expense2.dart';

class AddExpense3Page extends StatefulWidget {
  final String reportName;
  final List<Map<String, dynamic>> expenses;
  final double totalAmount;

  const AddExpense3Page({
    super.key,
    required this.reportName,
    required this.expenses,
    required this.totalAmount,
  });

  @override
  State<AddExpense3Page> createState() => _AddExpense3PageState();
}

class _AddExpense3PageState extends State<AddExpense3Page> {
  late List<Map<String, dynamic>> _expenses;
  late double _totalAmount;

  @override
  void initState() {
    super.initState();
    _expenses = List<Map<String, dynamic>>.from(widget.expenses);
    _totalAmount = widget.totalAmount;
  }

  void _editExpense(int index) {
    Navigator.of(context).pop();
  }

  void _removeExpense(int index) {
    setState(() {
      _totalAmount -= _expenses[index]['amount'] as double;
      _expenses.removeAt(index);
    });
  }

  void _finishReport(ExpenseReportStatus status) {
    final report = ExpenseReport(
      name: widget.reportName,
      status: status,
      expenses: _expenses,
      totalAmount: _totalAmount,
    );
    Navigator.of(context).pop(report);
  }

  void _showAddExpenseDialog() async {
    final vendorController = TextEditingController();
    final amountController = TextEditingController();
    final descController = TextEditingController();
    DateTime? selectedDate;
    String? selectedCategory;

    await showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Yeni Gider Ekle'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: vendorController,
                  decoration: const InputDecoration(labelText: 'Satıcı'),
                ),
                TextField(
                  controller: amountController,
                  decoration: const InputDecoration(labelText: 'Tutar'),
                  keyboardType: TextInputType.number,
                ),
                TextField(
                  controller: descController,
                  decoration: const InputDecoration(labelText: 'Açıklama'),
                ),
                // Tarih ve kategori eklemek istersen buraya ekleyebilirsin
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('İptal'),
            ),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _expenses.add({
                    'vendor': vendorController.text,
                    'amount': double.tryParse(amountController.text) ?? 0,
                    'desc': descController.text,
                    'date': DateTime.now(), // veya seçilen tarih
                    'category': selectedCategory,
                  });
                  _totalAmount += double.tryParse(amountController.text) ?? 0;
                });
                Navigator.pop(context);
              },
              child: const Text('Ekle'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isSmallScreen = size.width < 400;
    final horizontalPadding = isSmallScreen ? 16.0 : 32.0;
    final titleFontSize = size.width < 350 ? 14.0 : 16.0;
    final inputFontSize = size.width < 350 ? 12.0 : 14.0;
    final buttonFontSize = size.width < 350 ? 14.0 : 16.0;

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(
            horizontal: horizontalPadding,
            vertical: 16,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Üst bar ve başlık
              Row(
                children: [
                  IconButton(
                    icon: const Icon(
                      Icons.arrow_back_ios_new,
                      color: Colors.black,
                    ),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Gider Kaydı Oluştur',
                    style: TextStyle(
                      fontSize: titleFontSize,
                      fontWeight: FontWeight.w600,
                      color: Colors.black,
                    ),
                  ),
                ],
              ),
              SizedBox(height: size.height * 0.03),
              // Rapor Adı
              Text(
                'Gider Kayıt Adı',
                style: TextStyle(
                  fontSize: inputFontSize,
                  fontWeight: FontWeight.w400,
                  color: Colors.black,
                ),
              ),
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                height: 56,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: const Color(0xFFE8E8E8)),
                ),
                alignment: Alignment.centerLeft,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  widget.reportName,
                  style: TextStyle(
                    fontSize: inputFontSize,
                    color: Colors.black,
                  ),
                ),
              ),
              SizedBox(height: size.height * 0.03),
              // Gider Ekle, Kaydet, Gider Raporu Gönder Butonları
              Row(
                children: [
                  Expanded(
                    child: SizedBox(
                      height: 48,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFE0E0E0),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        onPressed: () async {
                          final newExpense =
                              await Navigator.push<Map<String, dynamic>>(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => AddExpense2Page(
                                    reportName: widget.reportName,
                                    // existingReport ve editingExpense parametreleri gönderilmiyor, form boş açılır
                                  ),
                                ),
                              );
                          if (newExpense != null) {
                            setState(() {
                              _expenses.add(newExpense);
                              _totalAmount += newExpense['amount'] as double;
                            });
                          }
                        },
                        child: Text(
                          'Gider Ekle',
                          style: TextStyle(
                            fontSize: 14.0,
                            fontWeight: FontWeight.w600,
                            color: const Color(0xFF333333),
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: SizedBox(
                      height: 48,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFF57A20),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        onPressed: () {
                          _finishReport(ExpenseReportStatus.created);
                        },
                        child: Text(
                          'Kaydet',
                          style: TextStyle(
                            fontSize: buttonFontSize,
                            fontWeight: FontWeight.w600,
                            color: const Color(0xFF333333),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2C2B5B),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  onPressed: () {
                    _finishReport(ExpenseReportStatus.sent);
                  },
                  child: const Text(
                    'Gider Kaydı Gönder',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              SizedBox(height: size.height * 0.03),
              Divider(color: const Color(0xFFC4C4C4), thickness: 1, height: 32),
              // Gider Listesi
              ..._expenses.asMap().entries.map((entry) {
                final exp = entry.value;
                final index = entry.key;
                return Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFFE8E8E8)),
                  ),
                  padding: const EdgeInsets.all(16),
                  margin: const EdgeInsets.only(bottom: 12),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            exp['vendor'] ?? '',
                            style: TextStyle(
                              fontSize: inputFontSize,
                              color: Colors.black,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${exp['amount']} GBP',
                            style: TextStyle(
                              fontSize: inputFontSize,
                              color: Colors.black,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            exp['date'] != null
                                ? '${exp['date'].day.toString().padLeft(2, '0')}/${exp['date'].month.toString().padLeft(2, '0')}/${exp['date'].year}'
                                : '',
                            style: TextStyle(
                              fontSize: inputFontSize,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          TextButton(
                            onPressed: () async {
                              final updatedExpense =
                                  await Navigator.push<Map<String, dynamic>>(
                                    context,
                                    MaterialPageRoute(
                                      builder: (_) => AddExpense2Page(
                                        reportName: widget.reportName,
                                        existingReport: ExpenseReport(
                                          name: widget.reportName,
                                          expenses: _expenses,
                                          totalAmount: _totalAmount,
                                          status: ExpenseReportStatus.created,
                                        ),
                                        editingExpense: exp,
                                      ),
                                    ),
                                  );
                              if (updatedExpense != null) {
                                setState(() {
                                  _expenses[index] = updatedExpense;
                                  // Toplamı güncelle
                                  _totalAmount = _expenses.fold(
                                    0,
                                    (sum, e) =>
                                        sum + (e['amount'] as num).toDouble(),
                                  );
                                });
                              }
                            },
                            child: const Text('Düzenle'),
                          ),
                          IconButton(
                            icon: const Icon(
                              Icons.close,
                              color: Color(0xFF28303F),
                            ),
                            onPressed: () => _removeExpense(index),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              }),
              if (_expenses.isNotEmpty) ...[
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Toplam Değer',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    Text(
                      '${_totalAmount.toStringAsFixed(2)} GBP',
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
