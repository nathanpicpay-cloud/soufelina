import React from 'react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose, children }) => {
    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <div className={`fixed top-0 left-0 h-full w-full max-w-sm bg-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-playfair font-bold text-text-dark">Filtrar Produtos</h2>
                        <button onClick={onClose} className="text-text-dark hover:text-accent transition-colors"><CloseIcon /></button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-6">
                        {children}
                    </div>

                    <div className="p-6 border-t border-gray-200">
                        <button onClick={onClose} className="w-full bg-text-dark text-white font-bold py-4 rounded-full hover:bg-accent transition-colors duration-300">
                            Ver Produtos
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};