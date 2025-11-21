import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";

export default function GeneratedPayslip() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const slipRef = useRef(null);

  // FIXED 100% WORKING PRINT FUNCTION
 const handlePrint = () => {
  const content = slipRef.current.innerHTML;

  const printWindow = window.open("", "_blank", "width=900,height=1000");

  printWindow.document.write(`
    <html>
      <head>
        <title>Payslip</title>

        <!-- Inject Tailwind CDN -->
        <script src="https://cdn.tailwindcss.com"></script>

        <style>
          @page { 
            size: A4; 
            margin: 15mm; 
          }
          body { 
            font-family: 'SF Pro Display', sans-serif; 
            padding: 20px; 
          }
        </style>
      </head>

      <body>
        <div class="p-6">
          ${content}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 700);
};

  // PDF DOWNLOAD
  const handleDownload = () => {
    const element = slipRef.current;
    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: "Employee_Payslip.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
      })
      .save();
  };

  return (
    <div className="min-h-screen bg-[#F6FFE8] font-[SF Pro Display] pb-20">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-5 bg-white shadow">
        <div>
          <h1 className="text-2xl font-bold text-[#3C3084]">VETRI IT SYSTEMS</h1>
          <p className="-mt-1 text-gray-600">-Employee Payslip-</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="text-[#3C3084] font-semibold"
            onClick={() => navigate("/payslip")}
          >
            Generate Payslip
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-[#3C3084] text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-center text-xl font-semibold mt-6">EMPLOYEE PAYSLIP</h2>

      {/* PRINT & DOWNLOAD BUTTONS */}
      <div className="flex justify-center gap-6 mt-6 mb-8">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white border shadow text-[#3C3084] font-semibold hover:bg-[#f3f3f3]"
        >
          🖨 Print
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#3C3084] text-white shadow font-semibold hover:opacity-90"
        >
          ⬇ Download
        </button>
      </div>

      {/* PAYSLIP CONTENT (PRINT AREA) */}
      <div
        ref={slipRef}
        id="print-area"
        className="mx-auto w-[900px] bg-white p-10 rounded-2xl shadow border"
      >

        {/* TOP HEADER */}
        <div className="grid grid-cols-2 gap-10 items-start p-6">
          
          {/* LEFT — Logo + Company */}
          <div className="flex flex-col items-start gap-3">
            <img src="/vetri-logo.png" className="w-20 h-20 object-contain" />

            <div>
              <p className="text-lg font-bold text-[#3C3084]">
                VETRI IT SYSTEMS PVT LTD.,
              </p>
              <p className="text-sm leading-6 mt-1">
                Shanthi complex, Second floor,<br />
                Surandai, Tenkasi – 627 859<br />
                India
              </p>
            </div>
          </div>

          {/* RIGHT — Employee Statement */}
          <div className="pl-4">
            <p className="text-xl font-bold text-[#3C3084] underline mb-4">
              Employee Statement
            </p>

            <div className="grid grid-cols-[150px_auto] gap-y-2 text-[15px]">
              <span className="font-semibold">Employee Name</span>
              <span>: {state.employeeName}</span>

              <span className="font-semibold">Employee ID</span>
              <span>: {state.employeeId}</span>

              <span className="font-semibold">Pay Period</span>
              <span>: {state.payPeriod}</span>

              <span className="font-semibold">Paid Days</span>
              <span>: {state.paidDays}</span>

              <span className="font-semibold">Loss of Pay Days</span>
              <span>: {state.lossDays}</span>

              <span className="font-semibold">Payment Date</span>
              <span>: {state.paymentDate}</span>
            </div>
          </div>
        </div>

        {/* EARNING + DEDUCTION */}
        <div className="grid grid-cols-2 gap-6 mt-10">

          {/* Earnings */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-[#EEF7D8] px-4 py-2 font-semibold flex justify-between">
              <span>Earnings</span>
              <span>Amount</span>
            </div>

            <div className="px-4 py-2 flex justify-between">
              <span>Basic</span>
              <span>₹ {Number(state.basic).toLocaleString("en-IN")}</span>
            </div>

            <div className="px-4 py-2 flex justify-between border-b">
              <span>Incentive</span>
              <span>₹ {Number(state.incentive).toLocaleString("en-IN")}</span>
            </div>

            <div className="bg-[#3C3084] text-white px-4 py-3 font-semibold flex justify-between">
              <span>Gross Earnings</span>
              <span>₹ {state.grossEarnings.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Deductions */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-[#EEF7D8] px-4 py-2 font-semibold flex justify-between">
              <span>Deduction</span>
              <span>Amount</span>
            </div>

            <div className="px-4 py-2 flex justify-between">
              <span>Income Tax</span>
              <span>₹ {Number(state.incomeTax).toLocaleString("en-IN")}</span>
            </div>

            <div className="px-4 py-5 border-b"></div>

            <div className="bg-[#3C3084] text-white px-4 py-3 font-semibold flex justify-between">
              <span>Total Deduction</span>
              <span>₹ {state.totalDeduction.toLocaleString("en-IN")}</span>
            </div>
          </div>

        </div>

        {/* NET PAY */}
        <div className="border rounded-xl p-5 bg-[#F7FFE9] mt-10 relative">
          <p className="font-bold text-lg">TOTAL NET PAYABLE</p>
          <p className="text-sm text-gray-700">
            Gross Earnings - Total Deduction
          </p>

          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <div className="bg-[#3C3084] text-white px-6 py-2 rounded-xl text-lg font-semibold shadow">
              ₹ {state.netPayable.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* AMOUNT IN WORDS */}
        <p className="text-right mt-6 text-sm font-medium">
          Amount in words : {state.amountInWords}
        </p>

        <hr className="my-8" />

        {/* SIGNATURE */}
        <h3 className="text-center text-lg font-bold text-[#3C3084] mt-10 mb-10">
          ACKNOWLEDGED BY,
        </h3>

        <div className="grid grid-cols-2 gap-10 px-10">

          <div>
            <div className="border-t-4 border-[#3C3084] mb-3"></div>
            <p className="font-bold text-lg">{state.employeeName}</p>
            <p className="text-sm mt-1">
              Employee,{" "}
              <span className="text-[#3C3084]">VETRI IT SYSTEMS PVT LTD.,</span>
            </p>
          </div>

          <div className="text-right">
            <div className="border-t-4 border-[#3C3084] mb-3"></div>
            <p className="font-bold text-lg">AUTHORISED NAME</p>
            <p className="text-sm mt-1">
              Managing Director,{" "}
              <span className="text-[#3C3084]">VETRI IT SYSTEMS PVT LTD.,</span>
            </p>
          </div>

        </div>

      </div>
      {/* END PRINT AREA */}

    </div>
  );
}
