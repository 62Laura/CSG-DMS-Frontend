import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownCircle, ArrowUpCircle, Clock, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdrawal' | 'loan_payment' | 'contribution' | 'interest' | 'dividend';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  className?: string;
}

export function RecentTransactions({ transactions, className }: RecentTransactionsProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'interest':
      case 'dividend':
        return <ArrowDownCircle className="h-4 w-4 text-green-500" />;
      case 'withdrawal':
      case 'loan_payment':
      case 'contribution':
        return <ArrowUpCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No recent transactions</div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-muted">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${transaction.type === 'deposit' || transaction.type === 'interest' || transaction.type === 'dividend' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'deposit' || transaction.type === 'interest' || transaction.type === 'dividend' ? '+' : '-'}
                    RWF {transaction.amount.toLocaleString()}
                  </div>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
