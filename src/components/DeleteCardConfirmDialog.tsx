import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteCardConfirmDialogProps {
  businessName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteCardConfirmDialog: React.FC<DeleteCardConfirmDialogProps> = ({
  businessName,
  onConfirm,
  onCancel
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleConfirm = () => {
    if (inputValue.trim() === businessName.trim()) {
      onConfirm();
    } else {
      setError('Business name does not match. Please try again.');
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Delete Review Card</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            title="Close"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-slate-300 mb-4">
            This action cannot be undone. This will permanently delete the review card for:
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-4">
            <p className="text-white font-semibold text-center">{businessName}</p>
          </div>

          <p className="text-slate-300 mb-2 text-sm">
            Please type <span className="font-semibold text-white">{businessName}</span> to confirm deletion:
          </p>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter business name"
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 mb-1"
          />

          {error && (
            <p className="text-red-400 text-sm mb-4 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {error}
            </p>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-white/10 text-slate-300 rounded-lg hover:bg-white/20 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!inputValue.trim()}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
