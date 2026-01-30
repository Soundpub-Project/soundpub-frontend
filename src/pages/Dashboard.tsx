import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, DollarSign, Wrench, Store, Users, LogOut,
  Menu, X, ChevronDown, ListOrdered, PackagePlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PricingManager from '@/components/dashboard/PricingManager';
import ServicesManager from '@/components/dashboard/ServicesManager';
import StorePartnersManager from '@/components/dashboard/StorePartnersManager';
import DistributionStepsManager from '@/components/dashboard/DistributionStepsManager';
import AdditionalServicesManager from '@/components/dashboard/AdditionalServicesManager';

type Tab = 'overview' | 'pricing' | 'services' | 'additional-services' | 'store-partners' | 'distribution-steps';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const tabs = [
    { id: 'overview' as Tab, name: 'Overview', icon: LayoutDashboard },
    { id: 'pricing' as Tab, name: 'Harga', icon: DollarSign },
    { id: 'services' as Tab, name: 'Layanan', icon: Wrench },
    { id: 'additional-services' as Tab, name: 'Layanan Tambahan', icon: PackagePlus },
    { id: 'store-partners' as Tab, name: 'Store Partners', icon: Store },
    { id: 'distribution-steps' as Tab, name: 'Langkah Distribusi', icon: ListOrdered },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'pricing':
        return <PricingManager />;
      case 'services':
        return <ServicesManager />;
      case 'additional-services':
        return <AdditionalServicesManager />;
      case 'store-partners':
        return <StorePartnersManager />;
      case 'distribution-steps':
        return <DistributionStepsManager />;
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border/50 rounded-xl p-6">
                <DollarSign className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-1">Pricing Plans</h3>
                <p className="text-muted-foreground text-sm">Kelola paket harga</p>
              </div>
              <div className="bg-card border border-border/50 rounded-xl p-6">
                <Wrench className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-1">Services</h3>
                <p className="text-muted-foreground text-sm">Kelola layanan</p>
              </div>
              <div className="bg-card border border-border/50 rounded-xl p-6">
                <Store className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-1">Store Partners</h3>
                <p className="text-muted-foreground text-sm">Kelola platform partner</p>
              </div>
            </div>
            
            {!isAdmin && (
              <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-6">
                <h3 className="font-semibold text-yellow-500 mb-2">Perhatian</h3>
                <p className="text-muted-foreground text-sm">
                  Anda belum memiliki role admin. Hubungi administrator untuk mendapatkan akses penuh.
                </p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 0 }}
        className="bg-card border-r border-border/50 overflow-hidden flex-shrink-0"
      >
        <div className="w-64 h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-border/50">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-display">Dashboard</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3 px-4 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground">{isAdmin ? 'Admin' : 'User'}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-muted-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border/50 flex items-center px-6 gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <h1 className="text-lg font-semibold">
            {tabs.find(t => t.id === activeTab)?.name || 'Dashboard'}
          </h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
