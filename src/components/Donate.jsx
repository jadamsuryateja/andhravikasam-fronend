import { Copy, CheckCheck, Wallet2, QrCode } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Donate() {
  const [copied, setCopied] = useState({
    accountNumber: false,
    ifsc: false,
    upi: false
  });

  const bankDetails = {
    accountName: "Koder Spark Private Limited",
    accountNumber: "50200102024375",
    ifsc: "HDFC0000189",
    upiId: "9866293371@hdfcbank",
    razorpayLink: "https://razorpay.me/@kodersparkprivatelimited"
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [type]: true }));
    toast.success('Copied to clipboard!');
    
    // Reset copy status after 2 seconds
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Main content wrapper with proper padding for header */}
      <div className="pt-16 lg:pt-20"> {/* Adjusted padding-top */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-[#22C55E]/10 to-[#FF6B3D]/10 rounded-xl mb-4">
              <Wallet2 className="h-8 w-8 text-[#FF6B3D]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Support Our Cause</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Your contribution helps us build a better Andhra Pradesh. Every donation makes a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bank Details Section */}
            <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-orange-500">#</span> Bank Transfer Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-400">Account Holder Name</label>
                  <div className="text-lg font-medium">{bankDetails.accountName}</div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Account Number</label>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-medium font-mono">{bankDetails.accountNumber}</div>
                    <button
                      onClick={() => handleCopy(bankDetails.accountNumber, 'accountNumber')}
                      className="p-1.5 rounded-lg hover:bg-[#FF6B3D]/10 transition-colors"
                    >
                      {copied.accountNumber ? (
                        <CheckCheck className="h-4 w-4 text-[#22C55E]" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400 hover:text-[#FF6B3D]" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">IFSC Code</label>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-medium font-mono">{bankDetails.ifsc}</div>
                    <button
                      onClick={() => handleCopy(bankDetails.ifsc, 'ifsc')}
                      className="p-1.5 rounded-lg hover:bg-[#FF6B3D]/10 transition-colors"
                    >
                      {copied.ifsc ? (
                        <CheckCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400 hover:text-[#FF6B3D]" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">UPI ID</label>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-medium font-mono">{bankDetails.upiId}</div>
                    <button
                      onClick={() => handleCopy(bankDetails.upiId, 'upi')}
                      className="p-1.5 rounded-lg hover:bg-[#FF6B3D]/10 transition-colors"
                    >
                      {copied.upi ? (
                        <CheckCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400 hover:text-[#FF6B3D]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Razorpay Button */}
              <a
                href={bankDetails.razorpayLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full bg-gradient-to-r from-[#22C55E] to-[#FF6B3D] hover:from-[#1EA14D] hover:to-[#E55B2D] 
                         text-white py-4 px-6 rounded-xl flex items-center justify-center gap-2 
                         font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Pay with Razorpay
                <img 
                  src="/assets/images/razorpay-icon.png" 
                  alt="Razorpay" 
                  className="h-5 w-5"
                />
              </a>
            </div>

            {/* QR Code Section */}
            <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <QrCode className="h-5 w-5 text-orange-500" /> 
                Scan QR Code
              </h2>
              
              <div className="bg-white p-4 rounded-xl w-fit mx-auto">
                <img 
                  src="/assets/images/upi-qr.png" 
                  alt="UPI QR Code"
                  className="max-w-[240px] w-full h-auto"
                />
              </div>

              <p className="text-center text-gray-400 mt-6">
                Scan the QR code with any UPI app to make a payment
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              For any payment-related queries, please contact us at{' '}
              <a href="mailto:support@andhravikasam.in" className="text-orange-500 hover:underline">
                support@andhravikasam.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;