import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email?: string, password?: string) => void;
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [view, setView] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleViewChange = (e: React.MouseEvent<HTMLAnchorElement>, newView: 'login' | 'signup') => {
      e.preventDefault();
      setEmail('');
      setPassword('');
      setView(newView);
  }

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-background shadow-xl z-50 rounded-lg transform transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="relative p-10">
          <button onClick={onClose} className="absolute top-4 right-4 text-text-dark hover:text-primary transition-colors"><CloseIcon /></button>
          <h2 className="text-3xl font-playfair font-bold text-text-dark text-center mb-8">
            {view === 'login' ? 'Minha Conta' : 'Criar Conta'}
          </h2>
          
          {view === 'login' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-text-dark/80 mb-1">E-mail</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cliente@soufelina.com"
                  className="mt-1 block w-full px-5 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors placeholder:text-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password"className="block text-sm font-semibold text-text-dark/80 mb-1">Senha</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="mt-1 block w-full px-5 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                  <a href="#" className="text-sm font-medium text-primary hover:text-accent transition-colors">Esqueceu a senha?</a>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-text-dark hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                  Entrar
                </button>
              </div>
              <div className="text-center text-sm text-text-dark/70">
                  <p>Não tem uma conta? <a href="#" onClick={(e) => handleViewChange(e, 'signup')} className="font-semibold text-primary hover:text-accent cursor-pointer transition-colors">Cadastre-se</a></p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                <label htmlFor="signup-name" className="block text-sm font-semibold text-text-dark/80 mb-1">Nome</label>
                <input
                  type="text"
                  id="signup-name"
                  placeholder="Seu nome completo"
                  className="mt-1 block w-full px-5 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors placeholder:text-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-semibold text-text-dark/80 mb-1">E-mail</label>
                <input
                  type="email"
                  id="signup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="mt-1 block w-full px-5 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors placeholder:text-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-password"className="block text-sm font-semibold text-text-dark/80 mb-1">Senha</label>
                <input
                  type="password"
                  id="signup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crie uma senha forte"
                  className="mt-1 block w-full px-5 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors placeholder:text-gray-500"
                  required
                />
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-text-dark hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                  Criar Conta
                </button>
              </div>
              <div className="text-center text-sm text-text-dark/70">
                  <p>Já tem uma conta? <a href="#" onClick={(e) => handleViewChange(e, 'login')} className="font-semibold text-primary hover:text-accent cursor-pointer transition-colors">Entrar</a></p>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};