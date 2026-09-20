import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  User,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartTotalItems,
    setCartDrawerOpen,
    wishlist,
    categories,
    navigateToCategory,
    navigateToShop,
    setSearchQuery,
    currentAdmin,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigateToShop();
      setSearchInput('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'الرئيسية', action: () => setCurrentPage('home'), active: currentPage === 'home' },
    { label: 'المتجر', action: () => navigateToShop(), active: currentPage === 'shop' },
    { label: 'من نحن', action: () => setCurrentPage('about'), active: currentPage === 'about' },
    { label: 'تواصل معنا', action: () => setCurrentPage('contact'), active: currentPage === 'contact' },
    { label: 'تتبع الطلب', action: () => setCurrentPage('order-tracking'), active: currentPage === 'order-tracking' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand logo matching base44 reference */}
          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 shrink-0 cursor-pointer text-right"
          >
            <span className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
              TATA<span className="text-gold">.</span>STORE
            </span>
          </button>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={link.action}
                className={`transition-colors cursor-pointer ${
                  link.active
                    ? 'text-primary font-bold'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions: Search bar + Wishlist + Cart + Admin */}
          <div className="flex items-center gap-2 md:gap-3">
            <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-muted rounded-full px-3 py-2 w-56">
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="bg-transparent outline-none px-2 text-sm w-full text-foreground placeholder:text-muted-foreground"
              />
            </form>

            {/* Wishlist */}
            <button
              onClick={() => navigateToShop('wishlist')}
              className="relative p-2 hover:text-primary transition-colors cursor-pointer text-foreground/80"
              aria-label="المفضلة"
            >
              <Heart size={22} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -left-1 bg-red-600 text-white text-[11px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Gold Count Badge */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2 hover:text-primary transition-colors cursor-pointer text-foreground/80"
              aria-label="السلة"
            >
              <ShoppingBag size={22} />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -left-1 bg-gold text-accent text-[11px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartTotalItems}
                </span>
              )}
            </button>

            {/* Admin icon link */}
            <button
              onClick={() => setCurrentPage(currentAdmin ? 'admin' : 'admin-login')}
              className="p-2 text-foreground/60 hover:text-primary transition-colors hidden sm:block cursor-pointer"
              title="لوحة الإدارة"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-1">
            <form onSubmit={handleSearch} className="flex items-center bg-muted rounded-full px-3 py-2 mb-3">
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="bg-transparent outline-none px-2 text-sm w-full text-foreground placeholder:text-muted-foreground"
              />
            </form>

            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-right py-2.5 font-medium ${
                  link.active ? 'text-primary font-bold' : 'text-foreground/90 hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            ))}

            {categories.length > 0 && (
              <div className="pt-3 mt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2 font-medium">الفئات</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        navigateToCategory(c.slug);
                        setMobileMenuOpen(false);
                      }}
                      className="text-right py-1.5 px-2 text-xs rounded-lg hover:bg-muted text-foreground/80 hover:text-primary"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
