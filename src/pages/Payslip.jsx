import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Payslip() {
  const navigate = useNavigate();

  // Payslip Month (NEW)
  const [month, setMonth] = useState("October 2025");

  // Employee States
  const [employeeName, setEmployeeName] = useState("Yedidiyah Cherub");
  const [employeeId, setEmployeeId] = useState("1122334455");
  const [paidDays, setPaidDays] = useState(26);
  const [lossDays, setLossDays] = useState(0);
  const [payPeriod, setPayPeriod] = useState("Sep 1, 2025 - Sep 30, 2025");
  const [paymentDate, setPaymentDate] = useState("Oct 15, 2025");

  // Salary States
  const [basic, setBasic] = useState(16000);
  const [incentive, setIncentive] = useState(1000);
  const [incomeTax, setIncomeTax] = useState(500);

  // Calculated States
  const [grossEarnings, setGrossEarnings] = useState(0);
  const [totalDeduction, setTotalDeduction] = useState(0);
  const [netPayable, setNetPayable] = useState(0);
  const [amountInWords, setAmountInWords] = useState("");

  // Convert number to Indian words
  const convertToWords = (num) => {
    if (num === 0) return "Zero";
    const a = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
    "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen",
    "Eighteen","Nineteen"];
    const b = ["","", "Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

    const inWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];
      if (n < 1000)
        return a[Math.floor(n / 100)] + " Hundred " + inWords(n % 100);
      if (n < 100000)
        return inWords(Math.floor(n / 1000)) + " Thousand " + inWords(n % 1000);
      if (n < 10000000)
        return inWords(Math.floor(n / 100000)) + " Lakh " + inWords(n % 100000);
      return inWords(Math.floor(n / 10000000)) + " Crore " + inWords(n % 10000000);
    };

    return inWords(num).trim();
  };

  // Auto calculate values
  useEffect(() => {
    const gross = Number(basic) + Number(incentive);
    const deduction = Number(incomeTax);
    const net = gross - deduction;

    setGrossEarnings(gross);
    setTotalDeduction(deduction);
    setNetPayable(net);

    setAmountInWords(`Indian Rupee ${convertToWords(net)} Only`);
  }, [basic, incentive, incomeTax]);

  return (
    <div className="min-h-screen bg-[#F6FFE8] font-[SF Pro Display] pb-20">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-5 bg-white shadow">
        <div>
          <h1 className="text-2xl font-bold text-[#3C3084]">VETRI IT SYSTEMS</h1>
          <p className="-mt-1 text-gray-600">-Employee Payslip-</p>
        </div>

        <div className="flex gap-4 items-center">
          <button className="text-[#3C3084] font-semibold">Generate Payslip</button>
          <button onClick={() => navigate("/")} className="bg-[#3C3084] text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-center text-xl font-semibold mt-6">
        EMPLOYEE PAYSLIP GENERATOR
      </h2>

      {/* MAIN CARD */}
      <div className="mx-auto w-[900px] bg-white mt-6 p-10 rounded-2xl shadow border">
      
        {/* ============================
              MONTH DROPDOWN (NEW)
        ============================ */}
        <div className="mb-4 flex gap-2 items-center justify-end">
          <span className="font-semibold text-sm w-32">Payslip Month :</span>
          <select
            className="border border-gray-300 px-3 py-1 rounded w-60"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option>January 2025</option>
            <option>February 2025</option>
            <option>March 2025</option>
            <option>April 2025</option>
            <option>May 2025</option>
            <option>June 2025</option>
            <option>July 2025</option>
            <option>August 2025</option>
            <option>September 2025</option>
            <option>October 2025</option>
            <option>November 2025</option>
            <option>December 2025</option>
          </select>
        </div>

        {/* HEADER */}
        <div className="flex justify-between">
          <img src="/vetri-logo.png" className="w-24" />
          <div className="text-right">
            <p className="font-semibold">Payslip for the Month</p>
            <p className="text-xl font-bold">{month}</p>
          </div>
        </div>

        {/* Address */}
        <div className="mt-4 text-sm leading-6">
          <p className="font-bold">VETRI IT SYSTEMS PVT LTD.,</p>
          <p>Shanthi complex, Second floor,</p>
          <p>Surandai, Tenkasi – 627 859</p>
          <p>India</p>
        </div>

        <hr className="my-6" />

        {/* ============================
              EMPLOYEE PAY SUMMARY
        ============================ */}
        <p className="font-bold text-lg mb-3">Employee Pay Summary *</p>

        <div className="space-y-3 text-sm">

          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex items-center gap-2">
              <span className="font-semibold w-32">Employee Name :</span>
              <input className="border border-gray-300 px-3 py-1 rounded w-60"
                value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold w-32">Paid Days :</span>
              <input className="border border-gray-300 px-3 py-1 rounded w-60"
                value={paidDays} onChange={(e) => setPaidDays(e.target.value)} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex items-center gap-2">
              <span className="font-semibold w-32">Employee ID :</span>
              <input className="border border-gray-300 px-3 py-1 rounded w-60"
                value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold w-32">Loss of Pay Days :</span>
              <input className="border border-gray-300 px-3 py-1 rounded w-60"
                value={lossDays} onChange={(e) => setLossDays(e.target.value)} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex items-center gap-2">
              <span className="font-semibold w-32">Pay Period :</span>
              <input className="border border-gray-300 px-3 py-1 rounded w-60"
                value={payPeriod} onChange={(e) => setPayPeriod(e.target.value)} />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold w-32">Payment Date :</span>
              <input className="border border-gray-300 px-3 py-1 rounded w-60"
                value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
            </div>
          </div>
        </div>

        <hr className="my-6" />

        {/* ============================
              INCOME DETAILS
        ============================ */}
        <p className="font-bold text-lg mb-3">Income Details *</p>

        <div className="grid grid-cols-2 gap-6">

          {/* Earnings */}
          <div className="border border-gray-300 rounded-xl overflow-hidden">
            <div className="bg-[#EEF7D8] px-4 py-2 font-semibold flex justify-between">
              <span>Earnings</span><span>Amount</span>
            </div>

            <div className="px-4 py-2 flex justify-between border-b">
              <span>Basic</span>
              <input type="number" className="w-28 text-right outline-none border-none"
                value={basic} onChange={(e) => setBasic(e.target.value)} />
            </div>

            <div className="px-4 py-2 flex justify-between border-b">
              <span>Incentive</span>
              <input type="number" className="w-28 text-right outline-none border-none"
                value={incentive} onChange={(e) => setIncentive(e.target.value)} />
            </div>

            <div className="bg-[#3C3084] text-white px-4 py-4 font-semibold flex justify-between">
              <span>Gross Earnings</span>
              <span>₹ {grossEarnings.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Deductions */}
          <div className="border border-gray-300 rounded-xl overflow-hidden">
            <div className="bg-[#EEF7D8] px-4 py-2 font-semibold flex justify-between">
              <span>Deduction</span><span>Amount</span>
            </div>

            <div className="px-4 py-2 flex justify-between border-b">
              <span>Income Tax</span>
              <input type="number" className="w-28 text-right outline-none border-none"
                value={incomeTax} onChange={(e) => setIncomeTax(e.target.value)} />
            </div>

            {/* EMPTY LINE */}
            <div className="px-4 py-5 border-b"></div>

            <div className="bg-[#3C3084] text-white px-4 py-4 font-semibold flex justify-between">
              <span>Total Deduction</span>
              <span>₹ {totalDeduction.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* TOTAL NET PAYABLE */}
        <div className="border rounded-xl p-5 bg-[#F7FFE9] mt-10 relative">
          <p className="font-bold text-lg">TOTAL NET PAYABLE</p>
          <p className="text-sm text-gray-700">Gross Earnings - Total Deduction</p>

          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <div className="bg-[#3C3084] text-white px-6 py-2 rounded-xl text-lg font-semibold shadow">
              ₹ {netPayable.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* Amount in Words */}
        <p className="text-center mt-6 text-sm font-medium">
          Amount in words : {amountInWords}
        </p>

<div className="flex justify-center mt-6">


        {/* BUTTON */}
        <button
          onClick={() =>
            navigate("/generated", {
              state: {
                month,
                employeeName,
                employeeId,
                payPeriod,
                paidDays,
                lossDays,
                paymentDate,
                basic,
                incentive,
                incomeTax,
                grossEarnings,
                totalDeduction,
                netPayable,
                amountInWords,
              },
            })
          }
          className="w-[330px] bg-[#3C3084] text-white py-3 rounded-full text-lg mt-6"
        >
          Generate Payslip
        </button>
        </div>
      </div>
    </div>
  );
}
