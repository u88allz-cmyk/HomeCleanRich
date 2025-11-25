import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, ArrowUp, MessageCircle, Home, Sparkles, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Service1() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { label: "입주청소", href: "/service1" },
    { label: "거주청소", href: "/service2" },
    { label: "상가청소", href: "/service3" },
    { label: "특수청소", href: "/service4" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-background"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link 
              href="/"
              className="text-2xl font-bold text-primary hover-elevate active-elevate-2 px-3 py-2 rounded-md"
              data-testid="link-logo"
            >
              홈클린리치
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    item.href === "/service1" ? "text-primary" : "text-foreground"
                  }`}
                  data-testid={`link-${item.label}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <Link href="/#contact">
                <Button className="gap-2" data-testid="button-consultation">
                  <Phone className="w-4 h-4" />
                  상담 신청
                </Button>
              </Link>
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
                    className="text-left px-4 py-2 hover-elevate active-elevate-2 rounded-md text-base font-medium"
                    data-testid={`link-mobile-${item.label}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/#contact">
                  <Button className="gap-2 mx-4 w-[calc(100%-2rem)]" data-testid="button-mobile-consultation">
                    <Phone className="w-4 h-4" />
                    상담 신청
                  </Button>
                </Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <main className="pt-20">
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(3,199,90,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(3,199,90,0.08),transparent_50%)]"></div>
          
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Home className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">입주청소 전문</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight" data-testid="heading-service1">
                입주청소, <span className="text-primary">왜 필요할까요?</span>
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28" data-testid="section-benefits">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-start gap-6 p-8 rounded-2xl bg-card border border-border hover-elevate"
                data-testid="card-benefit-1"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3">건강한 환경 조성</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    새 집으로 이사하기 전, 숨겨진 먼지와 오염물질을 제거하여 건강한 환경을 조성합니다. 
                    보이지 않는 곳까지 꼼꼼하게 청소하여 가족의 건강을 지켜드립니다.
                  </p>
                </div>
              </motion.div>

              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <span className="text-primary text-2xl font-bold">↓</span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col md:flex-row items-start gap-6 p-8 rounded-2xl bg-card border border-border hover-elevate"
                data-testid="card-benefit-2"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3">전문 장비와 친환경 세제</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    전문 장비와 친환경 세제를 사용해 구석구석 깨끗하게 청소합니다. 
                    일반 가정에서는 하기 어려운 전문적인 청소로 새 집처럼 깨끗한 공간을 만들어드립니다.
                  </p>
                </div>
              </motion.div>

              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <span className="text-primary text-2xl font-bold">↓</span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col md:flex-row items-start gap-6 p-8 rounded-2xl bg-card border border-border hover-elevate"
                data-testid="card-benefit-3"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3">맞춤형 서비스</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    고객 맞춤형 서비스로 공간의 특성에 맞는 청소를 제공합니다. 
                    아파트, 빌라, 오피스텔 등 다양한 공간에 최적화된 청소 서비스를 경험하세요.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card border-t border-border" data-testid="section-cta">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                <span className="text-primary">홈클린리치</span>와 함께 깨끗한 새 출발을 하세요
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contact">
                  <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-cta-consultation">
                    <Phone className="w-5 h-5" />
                    상담 신청하기
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 w-full sm:w-auto"
                  onClick={() => window.open("https://open.kakao.com/o/sTKJQLnh", "_blank")}
                  data-testid="button-cta-kakao"
                >
                  <MessageCircle className="w-5 h-5" />
                  카카오톡 문의
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full w-12 h-12 bg-background shadow-lg"
          onClick={scrollToTop}
          data-testid="button-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>

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
