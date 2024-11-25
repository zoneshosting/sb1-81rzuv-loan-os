import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRate, setInterestRate] = useState('3.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [downPayment, setDownPayment] = useState('60000');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<any[]>([]);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payments = parseFloat(loanTerm) * 12;

    const x = Math.pow(1 + rate, payments);
    const monthly = (principal * x * rate) / (x - 1);

    setMonthlyPayment(monthly);

    // Calculate amortization schedule
    let balance = principal;
    const newSchedule = [];

    for (let i = 1; i <= Math.min(payments, 360); i++) {
      const interest = balance * rate;
      const principalPaid = monthly - interest;
      balance -= principalPaid;

      if (i <= 12 || i % 12 === 0) { // Show first year monthly and then annually
        newSchedule.push({
          payment: i,
          principalPaid,
          interest,
          balance: Math.max(balance, 0),
          totalPayment: monthly,
        });
      }
    }

    setSchedule(newSchedule);
  };

  const resetCalculator = () => {
    setLoanAmount('300000');
    setInterestRate('3.5');
    setLoanTerm('30');
    setDownPayment('60000');
    setMonthlyPayment(null);
    setSchedule([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Loan Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loanAmount">Loan Amount ($)</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPayment">Down Payment ($)</Label>
            <Input
              id="downPayment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (Years)</Label>
            <Select value={loanTerm} onValueChange={setLoanTerm}>
              <SelectTrigger>
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 Years</SelectItem>
                <SelectItem value="20">20 Years</SelectItem>
                <SelectItem value="15">15 Years</SelectItem>
                <SelectItem value="10">10 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={calculateLoan} className="flex-1">Calculate</Button>
            <Button onClick={resetCalculator} variant="outline" className="flex-1">Reset</Button>
          </div>

          {monthlyPayment && (
            <div className="pt-4 space-y-2">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="text-sm font-medium text-primary">Monthly Payment</h3>
                <p className="text-2xl font-bold">${monthlyPayment.toFixed(2)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {schedule.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs uppercase text-muted-foreground">
                    <th className="text-left py-2">Payment</th>
                    <th className="text-right py-2">Principal</th>
                    <th className="text-right py-2">Interest</th>
                    <th className="text-right py-2">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {schedule.map((row) => (
                    <tr key={row.payment}>
                      <td className="py-2">{row.payment}</td>
                      <td className="text-right">${row.principalPaid.toFixed(2)}</td>
                      <td className="text-right">${row.interest.toFixed(2)}</td>
                      <td className="text-right">${row.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanCalculator;