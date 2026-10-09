import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, MapPin } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const OrderTrackerModal = ({ initialOrderId, onClose }) => {
  const { addToast } = useToast();
  const [orderQuery, setOrderQuery] = useState(initialOrderId || '');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  React.useEffect(() => {
    if (initialOrderId) {
      handleLookup(initialOrderId);
    }
  }, [initialOrderId]);

  const handleLookup = async (idToLook) => {
    const target = idToLook || orderQuery;
    if (!target.trim()) {
      addToast('Please enter an order ID', 'error');
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      const res = await api.getOrderById(target.trim());
      setOrderData(res);
    } catch (err) {
      setOrderData(null);
      addToast('Order not found. Try placing an order or checking ID.', 'info');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: 'CONFIRMED', desc: 'Payment verified & order captured', icon: CheckCircle2, done: true },
    { title: 'VAULT PACKING', desc: 'Screenprinted tags & heavy boxing', icon: Package, done: true },
    { title: 'IN TRANSIT', desc: 'Dispatched via express road freight', icon: Truck, done: true },
    { title: 'DELIVERED', desc: 'Signed & deposited at doorstep', icon: MapPin, done: false }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="neo-card bg-white max-w-xl w-full border-3 border-black shadow-brutal-2xl overflow-hidden my-auto animate-bounce-subtle"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-neo-cyan border-b-3 border-black p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-black" />
            <h2 className="font-display font-black text-lg tracking-tight uppercase">
              RADICAL SHIPMENT RADAR
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 bg-black text-white hover:bg-neo-pink border border-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 flex flex-col gap-6">
          {/* SEARCH BOX */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLookup();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="ENTER ORDER ID (e.g. ORD-...)"
              className="flex-1 neo-input text-xs"
            />
            <button
              type="submit"
              disabled={loading}
              className="neo-btn bg-black text-white hover:bg-neutral-800 text-xs px-4 py-2 font-mono"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'LOCATING...' : 'TRACK'}</span>
            </button>
          </form>

          {/* ORDER RESULT DETAILS */}
          {orderData ? (
            <div className="flex flex-col gap-5">
              {/* STATUS BANNER */}
              <div className="bg-neo-yellow border-2 border-black p-3.5 shadow-brutal-sm flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[10px] text-neutral-600 block">ORDER ID:</span>
                  <span className="font-black text-sm">{orderData.orderId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-600 block">STATUS:</span>
                  <span className="bg-black text-neo-lime px-2 py-0.5 font-bold">
                    {orderData.orderStatus || 'DISPATCHED'}
                  </span>
                </div>
              </div>

              {/* TIMELINE STEPS */}
              <div className="border-2 border-black p-4 bg-[#FAF8F3] flex flex-col gap-4 font-mono text-xs">
                <span className="font-black tracking-wider uppercase">RADAR TIMELINE:</span>
                <div className="flex flex-col gap-3">
                  {steps.map((st, i) => {
                    const Icon = st.icon;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className={`w-7 h-7 rounded-full border-2 border-black flex items-center justify-center shrink-0 ${
                            st.done ? 'bg-neo-lime text-black' : 'bg-neutral-200 text-neutral-400'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-display font-black text-xs">{st.title}</h4>
                          <p className="text-[11px] text-neutral-500">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DESTINATION */}
              <div className="font-mono text-xs border border-black p-3 bg-white flex justify-between items-center">
                <span className="text-neutral-500">RECIPIENT DESTINATION:</span>
                <span className="font-bold">
                  {orderData.shippingDetails?.city}, {orderData.shippingDetails?.country}
                </span>
              </div>
            </div>
          ) : (
            searched && (
              <div className="p-8 border-2 border-dashed border-black text-center font-mono text-xs text-neutral-500">
                No dispatch record matches that identifier. Please check your order confirmation email or receipt.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
