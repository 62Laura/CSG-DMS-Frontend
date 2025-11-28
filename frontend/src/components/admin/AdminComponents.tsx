import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2, MoreHorizontal, Plus } from "lucide-react";
import { format } from "date-fns";

// Types
type Transaction = {
  id: string;
  date: Date;
  member: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'loan_payment';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
};

type Loan = {
  id: string;
  member: string;
  amount: number;
  interest: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  issueDate: Date;
  dueDate: Date;
};

type Report = {
  id: string;
  title: string;
  type: 'monthly' | 'quarterly' | 'annual' | 'custom';
  date: Date;
  downloadUrl?: string;
};

// Helper functions for status handling
const getTransactionStatusVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'failed':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getLoanStatusVariant = (status: string) => {
  switch (status) {
    case 'approved':
    case 'paid':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// TransactionsList Component
interface TransactionsListProps {
  transactions: Transaction[];
  loading: boolean;
}

export function TransactionsList({ transactions, loading }: TransactionsListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }


  return (
    <div className="rounded-md border">
      <div className="p-4 flex justify-between items-center bg-card border-b">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Member</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {format(new Date(transaction.date), 'PPp')}
                </TableCell>
                <TableCell>{transaction.member}</TableCell>
                <TableCell>
                  <span className="capitalize">
                    {transaction.type.replace('_', ' ')}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>
                  <Badge variant={getTransactionStatusVariant(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {transaction.reference}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// LoansList Component
interface LoansListProps {
  loans: Loan[];
  loading: boolean;
}

export function LoansList({ loans, loading }: LoansListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }


  return (
    <div className="rounded-md border">
      <div className="p-4 flex justify-between items-center bg-card border-b">
        <h2 className="text-xl font-semibold">Loan Applications</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Loan
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.length > 0 ? (
            loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className="font-medium">{loan.member}</TableCell>
                <TableCell>{formatCurrency(loan.amount)}</TableCell>
                <TableCell>{loan.interest}%</TableCell>
                <TableCell>{format(new Date(loan.issueDate), 'PP')}</TableCell>
                <TableCell>{format(new Date(loan.dueDate), 'PP')}</TableCell>
                <TableCell>
                  <Badge variant={getLoanStatusVariant(loan.status)}>
                    {loan.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No loan applications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// ReportsSection Component
interface ReportsSectionProps {
  reports: Report[];
  loading: boolean;
}

export function ReportsSection({ reports, loading }: ReportsSectionProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getReportTypeVariant = (type: string) => {
    switch (type) {
      case 'monthly':
        return 'default';
      case 'quarterly':
        return 'secondary';
      case 'annual':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Reports</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{report.title}</h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <Badge variant={getReportTypeVariant(report.type)}>
                      {report.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(report.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium text-foreground">
              No reports
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by generating a new report.
            </p>
            <div className="mt-6">
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                New Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
