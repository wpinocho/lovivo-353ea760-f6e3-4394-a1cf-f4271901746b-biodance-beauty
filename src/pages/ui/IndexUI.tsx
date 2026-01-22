import { Button } from '@/components/ui/button';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { useState, useEffect } from 'react';
import { Sparkles, Zap, Shield, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const { filteredProducts } = logic;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { addItem } = useCart();
  const navigate = useNavigate();

  const biodanceProduct = filteredProducts.find(p => 
    p.title.includes('BIODANCE') || p.slug.includes('biodance')
  );

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleAddToCart = () => {
    if (biodanceProduct) {
      addItem(biodanceProduct);
    }
  };

  const handleBuyNow = () => {
    if (biodanceProduct) {
      addItem(biodanceProduct);
      navigate('/carrito');
    }
  };

  return (
    <EcommerceTemplate showCart={true}>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Cursor Glow Effect */}
      <div 
        className="pointer-events-none fixed top-0 left-0 w-64 h-64 rounded-full opacity-20 blur-3xl transition-transform duration-200 ease-out z-0"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-magenta)) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`,
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient mesh-gradient">
        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Viral Badge */}
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm font-medium animate-pulse-glow">
                <span className="text-2xl">🔥</span>
                <span className="gradient-text font-semibold">VIRAL ON TIKTOK - 4M+ VIEWS</span>
              </div>

              {/* Headline */}
              <h1 className="font-space-grotesk font-bold leading-tight gradient-text"
                style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
                GLASS SKIN<br />IN ONE USE
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-foreground/80 max-w-2xl">
                The TikTok-viral Korean mask with probiotics + collagen serum that delivers glowing, hydrated skin
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={handleBuyNow}
                  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300 neon-glow-magenta text-lg px-8 py-6 font-semibold"
                >
                  GET YOURS NOW
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                  className="glass-card border-white/20 hover:bg-white/10 text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span>4.9★ Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative animate-float">
                <img
                  src="/hero-product.jpg"
                  alt="BIODANCE Bio-Collagen Real Deep Mask"
                  className="w-full h-auto rounded-2xl"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl pointer-events-none" />
              </div>
              
              {/* Price Badge */}
              {biodanceProduct && (
                <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl neon-glow-magenta">
                  <div className="text-sm text-foreground/60 line-through">
                    ${biodanceProduct.compare_at_price?.toFixed(2)}
                  </div>
                  <div className="text-4xl font-bold gradient-text">
                    ${biodanceProduct.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-primary font-semibold">33% OFF</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold gradient-text mb-4">
              Why Everyone's Obsessed
            </h2>
            <p className="text-xl text-foreground/70">
              The science-backed formula that delivers instant results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'Instant Glass Skin Glow',
                description: 'See visible results in just 20 minutes. Your skin will look radiant, plump, and luminous.',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Deep Hydration Serum',
                description: 'Packed with hyaluronic acid that holds 1000x its weight in water for long-lasting moisture.',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Probiotic + Collagen Power',
                description: 'Strengthens skin barrier while boosting collagen production for firmer, healthier skin.',
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:neon-glow-magenta transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">320M+</span> Skincare Routines
            </h2>
            <p className="text-2xl italic text-foreground/80 font-light mb-4">
              "Like a facial in a sachet"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Sarah K.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                text: 'My skin has NEVER looked this good. Instant glow!',
                stars: 5,
              },
              {
                name: 'Jessica M.',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
                text: 'TikTok was right. This mask is absolute magic ✨',
                stars: 5,
              },
              {
                name: 'Emily R.',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
                text: 'Worth every penny. My skin feels so hydrated!',
                stars: 5,
              },
              {
                name: 'Michelle L.',
                image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop',
                text: 'I buy 5 at a time now. Can\'t live without it!',
                stars: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold gradient-text mb-4">
              Real Results, Real Fast
            </h2>
            <p className="text-xl text-foreground/70">
              See the transformation after just one use
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden glass-card">
            <img
              src="/before-after.jpg"
              alt="Before and After Results"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <Button
                size="lg"
                variant="outline"
                className="glass-card border-white/20 hover:bg-white/10 neon-glow-blue"
              >
                SEE THE TRANSFORMATION
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold gradient-text mb-4">
              Powered by Science
            </h2>
            <p className="text-xl text-foreground/70">
              Clean, effective ingredients that actually work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Probiotics',
                badge: 'LIVE CULTURES',
                description: 'Strengthens skin barrier and balances microbiome',
              },
              {
                name: 'Marine Collagen',
                badge: 'ANTI-AGING',
                description: 'Boosts elasticity and reduces fine lines',
              },
              {
                name: 'Hyaluronic Acid',
                badge: 'HYDRATION',
                description: 'Locks in moisture for plump, dewy skin',
              },
              {
                name: 'Niacinamide',
                badge: 'BRIGHTENING',
                description: 'Evens skin tone and minimizes pores',
              },
            ].map((ingredient, idx) => (
              <div key={idx} className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-bold mb-4">
                  {ingredient.badge}
                </div>
                <h3 className="text-xl font-bold mb-3 gradient-text">
                  {ingredient.name}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {ingredient.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-space-grotesk text-5xl md:text-6xl font-bold text-white mb-6">
            READY FOR GLASS SKIN?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join millions who've transformed their skincare routine with the viral mask everyone's talking about
          </p>

          <Button
            size="lg"
            onClick={handleBuyNow}
            className="bg-white text-primary hover:bg-white/90 hover:scale-110 transition-all duration-300 text-xl px-12 py-8 font-bold animate-pulse-glow shadow-2xl"
          >
            SHOP NOW - FREE SHIPPING
          </Button>

          <div className="flex flex-wrap gap-8 justify-center mt-12 text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span className="font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Cruelty Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 glass-card border-t border-white/10 z-40">
        <Button
          onClick={handleBuyNow}
          className="w-full bg-gradient-to-r from-primary to-secondary neon-glow-magenta font-bold"
          size="lg"
        >
          GET YOURS NOW - ${biodanceProduct?.price.toFixed(2)}
        </Button>
      </div>
    </EcommerceTemplate>
  );
};