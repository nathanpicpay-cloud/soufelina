import React from 'react';

type Page = 'home' | 'shop' | 'lookbook' | 'contact' | 'favorites' | 'admin';

const InstagramIcon: React.FC = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c-4.068 0-4.544.018-6.142.09-1.583.073-2.68.337-3.638 1.295-.972.973-1.222 2.059-1.295 3.638C1.018 7.77 1 8.246 1 12.315s.018 4.544.09 6.142c.073 1.582.323 2.68 1.295 3.638.96.96 2.058 1.222 3.638 1.295 1.598.073 2.074.09 6.142.09s4.544-.018 6.142-.09c1.582-.073 2.68-.323 3.638-1.295.972-.96 1.222-2.058 1.295-3.638.072-1.598.09-2.074.09-6.142s-.018-4.544-.09-6.142c-.073-1.582-.323-2.68-1.295-3.638C21.037 2.357 19.952 2.1 18.37 2.028 16.858 2.002 16.382 2 12.315 2zM12 7.045c2.72 0 4.975 2.255 4.975 4.975S14.72 17.005 12 17.005 7.025 14.75 7.025 12.01s2.255-4.965 4.975-4.965zM12 15.25a3.25 3.25 0 100-6.5 3.25 3.25 0 000 6.5zM18.15 7.425a1.425 1.425 0 100-2.85 1.425 1.425 0 000 2.85z" clipRule="evenodd" /></svg>;
const TikTokIcon: React.FC = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.63-1.1-6.12-3.02-2.13-2.76-2.22-6.51-1.21-9.62.91-2.81 3.25-4.78 6.13-5.51v4.03c-1.11.33-2.14.73-3.1 1.25-.06.03-.12.07-.18.09-.34.17-.68.34-1.02.52-.53.27-1.1.27-1.6-.02-1.08-.6-1.22-2.37-.23-3.34.45-.44 1-.79 1.56-1.01.64-.23 1.32-.31 2.02-.23.1.01.19.02.28.03.78.07 1.57.06 2.35.05.02-.01.03-.01.05-.01z" /></svg>;
const WhatsAppIcon: React.FC = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48a12.013 12.013 0 00-17.04 17.04A12.013 12.013 0 0020.52 3.48zm-4.05 13.56c-.23.12-1.34.66-1.55.74-.21.08-.36.12-.5.12-.14 0-.44-.04-.67-.28-.23-.24-1.02-1.02-1.9-2.02s-1.46-1.63-1.64-1.9c-.18-.27-.08-.42.04-.54.12-.12.27-.32.4-.42.14-.1.18-.17.27-.29s.09-.23 0-.42c-.08-.19-.5-1.18-.68-1.62-.18-.44-.36-.36-.5-.36-.14 0-.3 0-.44.04-.14.04-.36.17-.54.33-.18.17-.7.66-.9 1.34-.2.68-.28 1.25.12 1.95.4.7 1.05 1.5 2.32 2.76 1.57 1.5 2.88 2.04 3.3 2.2a1.69 1.69 0 001.05.1c.36-.04.9-.36 1.14-.7.24-.34.36-.66.27-.84-.08-.18-.23-.28-.48-.4z" /></svg>;

interface FooterProps {
    navigateTo: (page: Page) => void;
    isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({ navigateTo, isAdminLoggedIn }) => {
  return (
    <footer id="contato" className="bg-footer-bg text-white/80">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Departamentos */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-playfair text-white">Navegação</h3>
            <ul className="space-y-2">
              <li><a href="#" onClick={(e) => {e.preventDefault(); navigateTo('home')}} className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); navigateTo('shop')}} className="hover:text-primary transition-colors">Loja</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); navigateTo('lookbook')}} className="hover:text-primary transition-colors">Lookbook</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); navigateTo('favorites')}} className="hover:text-primary transition-colors">Favoritos</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); navigateTo('contact')}} className="hover:text-primary transition-colors">Contato</a></li>
              {isAdminLoggedIn && (
                <li><a href="#" onClick={(e) => {e.preventDefault(); navigateTo('admin')}} className="hover:text-primary transition-colors font-bold">Painel Admin</a></li>
              )}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-playfair text-white">Contato</h3>
            <ul className="space-y-2">
              <li>WhatsApp: (11) 98765-4321</li>
              <li>E-mail: contato@soufelina.com</li>
              <li>Endereço: Rua Itaboraí, 13 Campo limpo a Feira de Santana</li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-playfair text-white">Redes Sociais</h3>
            <div className="flex space-x-2">
              <a href="#" className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-all"><InstagramIcon /></a>
              <a href="#" className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-all"><TikTokIcon /></a>
              <a href="#" className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-all"><WhatsAppIcon /></a>
            </div>
          </div>
          
          {/* Formas de Pagamento */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-playfair text-white">Formas de Pagamento</h3>
            <div className="flex flex-wrap gap-2">
                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8 filter grayscale hover:grayscale-0 transition-all" />
                <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-8 filter grayscale hover:grayscale-0 transition-all" />
                <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" className="h-8 filter grayscale hover:grayscale-0 transition-all" />
                <img src="https://img.icons8.com/color/48/000000/pix.png" alt="Pix" className="h-8 filter grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 py-6">
        <p className="text-center text-sm text-white/60">© Sou Felina — Moda Feminina. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};