import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-background shadow-xl z-50 rounded-lg transform transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="relative p-8 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-text-dark/50 hover:text-primary transition-colors"><CloseIcon /></button>
          <h2 className="text-2xl font-playfair font-bold text-text-dark mb-4">
            {title}
          </h2>
          <p className="text-text-dark/80 mb-8">{message}</p>
          <div className="flex justify-center gap-4">
            <button
                onClick={onClose}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-bold text-text-dark bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                Cancelar
            </button>
            <button
                onClick={onConfirm}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-text-dark hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );
};