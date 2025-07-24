import 'package:flutter/material.dart';
import '../models/expense_report.dart';

class ExpenseReportDetailPage extends StatelessWidget {
  final ExpenseReport report;
  const ExpenseReportDetailPage({super.key, required this.report});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isSmallScreen = size.width < 400;
    final horizontalPadding = isSmallScreen ? 16.0 : 32.0;
    final titleFontSize = size.width < 350 ? 16.0 : 20.0;
    final labelFontSize = size.width < 350 ? 12.0 : 14.0;
    final valueFontSize = size.width < 350 ? 14.0 : 16.0;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Gider Raporu Detayı'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
      ),
      backgroundColor: Colors.white,
      body: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: horizontalPadding,
          vertical: 24,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Rapor Adı ve Durum
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  report.name,
                  style: TextStyle(
                    fontSize: titleFontSize,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: report.status == ExpenseReportStatus.sent
                        ? Colors.green.shade100
                        : Colors.grey.shade200,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    report.status == ExpenseReportStatus.sent ? 'Gönderildi' : 'Oluşturuldu',
                    style: TextStyle(
                      color: report.status == ExpenseReportStatus.sent
                          ? Colors.green.shade800
                          : Colors.grey.shade700,
                      fontWeight: FontWeight.w600,
                      fontSize: labelFontSize,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            // Toplam Tutar
            Row(
              children: [
                Text(
                  'Toplam Tutar:',
                  style: TextStyle(
                    fontSize: labelFontSize,
                    color: Colors.black54,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  '${report.totalAmount.toStringAsFixed(2)} GBP',
                  style: TextStyle(
                    fontSize: valueFontSize,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            // Gider Sayısı
            Row(
              children: [
                Text(
                  'Gider Sayısı:',
                  style: TextStyle(
                    fontSize: labelFontSize,
                    color: Colors.black54,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  '${report.expenses.length} adet',
                  style: TextStyle(
                    fontSize: valueFontSize,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            // Giderler Listesi
            Text(
              'Giderler',
              style: TextStyle(
                fontSize: labelFontSize + 2,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: ListView.separated(
                itemCount: report.expenses.length,
                separatorBuilder: (_, __) => const Divider(height: 16),
                itemBuilder: (context, index) {
                  final exp = report.expenses[index];
                  return Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade50,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.grey.shade200),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              exp['vendor'] ?? '-',
                              style: TextStyle(
                                fontSize: valueFontSize,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            Text(
                              '${exp['amount']} GBP',
                              style: TextStyle(
                                fontSize: valueFontSize,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          exp['desc'] ?? '',
                          style: TextStyle(
                            fontSize: labelFontSize,
                            color: Colors.black54,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            Icon(
                              Icons.calendar_today,
                              size: 14,
                              color: Colors.grey,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              exp['date'] != null
                                  ? '${exp['date'].day.toString().padLeft(2, '0')}/${exp['date'].month.toString().padLeft(2, '0')}/${exp['date'].year}'
                                  : '-',
                              style: TextStyle(
                                fontSize: labelFontSize,
                                color: Colors.black54,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Icon(Icons.category, size: 14, color: Colors.grey),
                            const SizedBox(width: 4),
                            Text(
                              exp['category'] ?? '-',
                              style: TextStyle(
                                fontSize: labelFontSize,
                                color: Colors.black54,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
