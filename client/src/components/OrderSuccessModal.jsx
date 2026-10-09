import React from 'react';
import { Check, Package, Copy, ArrowRight, Sparkles, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const OrderSuccessModal = ({ order, onClose, onTrackOrder }) => {
  if (!order) return null;
  const { addToast } = useToast();

  const copyTracking = () => {
    navigator.clipboard?.writeText(order.trackingNumber || order.orderId);
    addToast('Tracking number copied!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="neo-card bg-white max-w-xl w-full border-3 border-black shadow-brutal-2xl overflow-hidden my-auto animate-bounce-subtle"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-neo-lime border-b-3 border-black p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-black" />
            <span className="font-display font-black text-lg tracking-tight uppercase">
              ORDER CONFIRMED & PACKED!
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 bg-black text-white hover:bg-neo-pink border border-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 flex flex-col gap-5">
          {/* STAMP */}
          <div className="border-3 border-dashed border-black bg-neo-yellow/30 p-4 text-center flex flex-col items-center">
            <span className="neo-badge bg-black text-white text-xs mb-2">
              STATUS: PREPARING SHIPMENT
            </span>
            <h3 className="font-display font-black text-2xl uppercase tracking-tight">
              THANK YOU, {order.shippingDetails?.fullName?.toUpperCase() || 'REBEL'}!
            </h3>
            <p className="font-mono text-xs text-neutral-600 mt-1 max-w-sm">
              Your brutal gear is being pulled from the warehouse vault and boxed with custom vinyl stickers.
            </p>
          </div>

          {/* TRACKING INFO BOX */}
          <div className="bg-[#FAF8F2] border-2 border-black p-3.5 flex items-center justify-between font-mono text-xs shadow-brutal-sm">
            <div>
              <span className="text-[10px] text-neutral-500 block">TRACKING ID:</span>
              <span className="font-black text-sm text-black">{order.trackingNumber || 'BRUTAL-99214X'}</span>
            </div>
            <button
              onClick={copyTracking}
              className="neo-btn-sm bg-white text-black font-bold flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>COPY</span>
            </button>
          </div>

          {/* SUMMARY DETAILS */}
          <div className="border-2 border-black p-3.5 bg-white font-mono text-xs flex flex-col gap-2">
            <div className="flex justify-between border-b border-neutral-200 pb-1.5">
              <span className="text-neutral-500">ORDER NUMBER:</span>
              <span className="font-bold">{order.orderId}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-1.5">
              <span className="text-neutral-500">SHIP TO:</span>
              <span className="font-bold text-right truncate max-w-56">
                {order.shippingDetails?.street}, {order.shippingDetails?.city}
              </span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-1.5">
              <span className="text-neutral-500">TOTAL CHARGED:</span>
              <span className="font-bold bg-neo-yellow px-1.5 border border-black">${order.total}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-500">ESTIMATED ARRIVAL:</span>
              <span className="font-bold text-neo-pink">2 - 4 BUSINESS DAYS</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                if (onTrackOrder) onTrackOrder(order.orderId);
              }}
              className="flex-1 neo-btn bg-neo-cyan hover:bg-black hover:text-white py-3 text-xs font-black flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>TRACK THIS SHIPMENT</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 neo-btn bg-black text-white hover:bg-neutral-800 py-3 text-xs font-black"
            >
              CONTINUE SHOPPING
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
