enum ExpenseReportStatus { created, sent }

///Gider raporu modeli.

class ExpenseReport {
  final String name;
  final ExpenseReportStatus status;
  final List<Map<String, dynamic>> expenses;
  final double totalAmount;

  ExpenseReport({
    required this.name,
    required this.status,
    required this.expenses,
    required this.totalAmount,
  });
}
