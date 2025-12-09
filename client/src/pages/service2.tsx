import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowUp, Home, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import logoImage from "@assets/logo.webp";
import { ConsultationButton } from "@/components/consultation-button";

export default function Service2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "거주청소 - 정기 가정집 청소 서비스 | 홈클린리치";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '서울, 경기, 인천 거주청소 전문 홈클린리치. 주방, 욕실, 거실 정기 청소 서비스. 친환경 세제로 가족 건강을 지키는 깨끗한 집을 만들어드립니다. 무료 상담 070-1361-1659');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { label: "입주청소", href: "/service1", active: false },
    { label: "거주청소", href: "/service2", active: true },
    { label: "상가청소", href: "/service3", active: false },
    { label: "특수청소", href: "/service4", active: false },
  ];

  const benefits = [
    {
      title: "건강한 환경 유지",
      description: "매일 생활하는 공간의 먼지와 오염물질을 제거하여 건강한 환경을 유지합니다.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "전문 장비와 친환경 세제",
      description: "전문 장비와 친환경 세제를 사용해 구석구석 깨끗하게 청소합니다.",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "가족 건강 보호",
      description: "정기적인 청소로 쾌적한 공간을 유지하며 가족의 건강을 보호합니다.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-gray-50/98 backdrop-blur-sm border-b border-border shadow-sm" : "bg-gray-50/95"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link 
              href="/"
              className="hover-elevate active-elevate-2 px-2 py-1 rounded-md mt-1"
              data-testid="link-logo"
            >
              <img src={logoImage} alt="홈클린리치 로고" className="h-16 md:h-24 w-auto object-contain contrast-110 saturate-110" style={{ imageRendering: 'crisp-edges' }} />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    item.active ? "text-primary" : "text-foreground"
                  }`}
                  data-testid={`link-${item.label}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <ConsultationButton />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
              data-testid="button-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-border"
            >
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-left px-4 py-2 hover-elevate active-elevate-2 rounded-md text-base font-medium ${
                      item.active ? "text-primary" : ""
                    }`}
                    data-testid={`link-mobile-${item.label}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <ConsultationButton className="mx-4" fullWidth />
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <main className="pt-20">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&auto=format&fit=crop&q=80')"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              >
                <Home className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-white">거주청소 전문</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white" data-testid="heading-service2">
                거주청소, <span className="text-primary">왜 필요할까요?</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-10">
                일상의 쾌적함을 위한 정기 청소, 홈클린리치가 함께합니다
              </p>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChevronDown className="w-8 h-8 text-white/60 mx-auto" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28" data-testid="section-benefits">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-16">
              {benefits.map((benefit, index) => (
                <div key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}
                    data-testid={`card-benefit-${index + 1}`}
                  >
                    <div className="w-full md:w-1/2">
                      <motion.div 
                        className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src={benefit.image} 
                          alt={benefit.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </motion.div>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                          0{index + 1}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">{benefit.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {benefit.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {index < benefits.length - 1 && (
                    <div className="flex justify-center py-8">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                      >
                        <ChevronDown className="w-6 h-6 text-primary" />
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-background" data-testid="section-cta">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-primary">홈클린리치</span>와 함께
                <br />쾌적한 일상을 만드세요
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                전문가의 정기 청소로 항상 깨끗한 집에서 생활하세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ConsultationButton size="lg" className="w-full sm:w-auto text-lg px-8" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <motion.div 
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          size="icon"
          variant="outline"
          className="rounded-full w-12 h-12 bg-background shadow-lg"
          onClick={scrollToTop}
          data-testid="button-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </motion.div>

      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link href="/" className="text-2xl font-bold text-primary" data-testid="link-footer-logo">
              홈클린리치
            </Link>
            <p className="text-muted-foreground mt-4">
              전문 청소 서비스로 깨끗하고 건강한 공간을 만들어드립니다.
            </p>
            <p className="text-sm text-muted-foreground mt-6">
              © 2024 홈클린리치. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
