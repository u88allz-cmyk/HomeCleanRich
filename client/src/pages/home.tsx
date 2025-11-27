import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Phone, Mail, MapPin, CheckCircle2, Sparkles, Users, Clock, ArrowRight, Menu, X } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "before-after", "reviews", "process", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        scrollToSection={scrollToSection} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
      />
      <HeroSection scrollToSection={scrollToSection} />
      <StatisticsSection />
      <AdvantagesSection />
      <ServicesSection />
      <BeforeAfterSection />
      <ReviewsSection />
      <ProcessSection />
      <BookingStatusSection />
      <ContactSection />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

function Header({ scrollToSection, mobileMenuOpen, setMobileMenuOpen, activeSection }: any) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "입주청소", href: "/service1" },
    { label: "거주청소", href: "/service2" },
    { label: "상가청소", href: "/service3" },
    { label: "특수청소", href: "/service4" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-bold text-primary hover-elevate active-elevate-2 px-3 py-2 rounded-md"
            data-testid="link-logo"
          >
            홈클린리치
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base font-medium transition-colors hover:text-primary text-foreground"
                data-testid={`link-${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection("contact")}
              className="gap-2"
              data-testid="button-consultation"
            >
              <Phone className="w-4 h-4" />
              상담 신청
            </Button>
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
              <Button 
                onClick={() => scrollToSection("contact")}
                className="gap-2 mx-4"
                data-testid="button-mobile-consultation"
              >
                <Phone className="w-4 h-4" />
                상담 신청
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}

function HeroSection({ scrollToSection }: any) {
  return (
    <section 
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.05),transparent_50%)]"></div>
      
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
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">전문 청소 서비스</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="heading-hero">
            입주청소의 새로운 기준,
            <br />
            <span className="text-primary">홈클린리치</span>!
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed" data-testid="text-hero-subtitle">
            전문 장비와 숙련된 인력으로<br className="md:hidden" /> 깨끗하고 안전한 공간을 만들어드립니다
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="gap-2 text-base px-8 h-12"
              data-testid="button-hero-consultation"
            >
              <Phone className="w-5 h-5" />
              무료 상담 신청
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("services")}
              className="gap-2 text-base px-8 h-12"
              data-testid="button-hero-services"
            >
              서비스 둘러보기
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StatisticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-card" data-testid="section-statistics">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StatCard 
            number={1500}
            suffix="+"
            label="청소 완료 건수"
            isInView={isInView}
            delay={0}
          />
          <StatCard 
            number={99}
            suffix="%"
            label="고객 만족도"
            isInView={isInView}
            delay={0.2}
          />
          <StatCard 
            number={50}
            suffix="건"
            label="하루 문의건수"
            isInView={isInView}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, suffix, label, isInView, delay }: any) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = number;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, number]);

  const testId = label.replace(/\s+/g, '-').toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="text-center"
      data-testid={`stat-${testId}`}
    >
      <div className="text-5xl md:text-6xl font-bold text-primary mb-2" data-testid={`stat-value-${testId}`}>
        {count}{suffix}
      </div>
      <div className="text-base text-muted-foreground font-medium" data-testid={`stat-label-${testId}`}>
        {label}
      </div>
    </motion.div>
  );
}

function AdvantagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const advantages = [
    {
      icon: Sparkles,
      title: "전문 청소",
      subtitle: "꼼꼼한 청소 CHECK",
      description: "전문 장비와 노하우로\n구석구석 깨끗하게"
    },
    {
      icon: Users,
      title: "맞춤형 서비스",
      subtitle: "고객 맞춤 CHECK",
      description: "고객의 요구사항에 맞춘\n맞춤형 청소 서비스"
    },
    {
      icon: CheckCircle2,
      title: "신뢰할 수 있는 청소",
      subtitle: "신뢰도 CHECK",
      description: "믿을 수 있는 전문가의\n안전하고 깨끗한 청소"
    }
  ];

  return (
    <section ref={ref} className="py-20 md:py-28" data-testid="section-advantages">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-advantages">
            홈클린리치만의 <span className="text-primary">특별함</span>
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-advantages-subtitle">
            고객 만족을 위한 3가지 약속
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-advantage-${advantage.title}`}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <advantage.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2" data-testid={`text-advantage-title-${advantage.title}`}>{advantage.title}</h3>
                  <p className="text-sm text-primary font-medium mb-4" data-testid={`text-advantage-subtitle-${advantage.title}`}>{advantage.subtitle}</p>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed" data-testid={`text-advantage-description-${advantage.title}`}>
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "입주청소",
      subtitle: "입주청소 · 이사청소",
      description: "새 집으로 이사 전 꼼꼼한 입주청소부터 이사 후 정리까지, 완벽한 생활공간을 위한 청소 서비스를 제공합니다.",
      color: "from-primary/20 to-primary/5",
      link: "/service1"
    },
    {
      title: "거주청소",
      subtitle: "거주청소 · 정기청소",
      description: "일상 생활 속 쌓인 먼지와 오염물을 전문적인 기술과 장비로 깨끗하게 제거하여 쾌적한 환경을 유지합니다.",
      color: "from-blue-500/20 to-blue-500/5",
      link: "/service2"
    },
    {
      title: "상가청소",
      subtitle: "상가청소 · 사무실청소",
      description: "매장, 사무실, 상업공간의 청결을 유지하여 고객 만족도와 직원 업무 효율성을 높이는 맞춤형 청소 서비스를 제공합니다.",
      color: "from-purple-500/20 to-purple-500/5",
      link: "/service3"
    },
    {
      title: "특수청소",
      subtitle: "특수청소 · 화재복구",
      description: "화재, 수해 등 특수 상황 발생 시 전문적인 장비와 기술로 신속하게 복구하여 안전한 환경을 회복할 수 있도록 도와드립니다.",
      color: "from-orange-500/20 to-orange-500/5",
      link: "/service4"
    }
  ];

  return (
    <section id="services" ref={ref} className="py-20 md:py-28 bg-card" data-testid="section-services">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-services">
            <span className="text-primary">홈클린리치</span> 서비스
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-services-subtitle">
            다양한 상황에 맞는 전문 청소 서비스
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300 overflow-hidden" data-testid={`card-service-${service.title}`}>
                <div className={`h-32 bg-gradient-to-br ${service.color}`}></div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1" data-testid={`text-service-title-${service.title}`}>{service.title}</h3>
                  <p className="text-sm text-primary font-medium mb-4" data-testid={`text-service-subtitle-${service.title}`}>{service.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed" data-testid={`text-service-description-${service.title}`}>
                    {service.description}
                  </p>
                  <Link href={service.link}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between group"
                      data-testid={`button-service-detail-${service.title}`}
                    >
                      자세히 보기
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const images = Array(6).fill(null).map((_, i) => ({
    id: i,
    title: `작업 사례 ${i + 1}`
  }));

  return (
    <section id="before-after" ref={ref} className="py-20 md:py-28" data-testid="section-before-after">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-before-after">
            Before & After <span className="text-primary">홈클린리치</span> 작업 사례
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-before-after-subtitle">
            완벽한 청소로 달라진 공간을 확인하세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-beforeafter-${image.id}`}>
                <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-card flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-primary/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Before & After</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-center" data-testid={`text-beforeafter-title-${image.id}`}>{image.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reviews = [
    {
      name: "김**님",
      service: "입주청소",
      rating: 5,
      comment: "이사 전 입주청소를 맡겼는데 정말 꼼꼼하게 해주셨어요. 새집처럼 깨끗해져서 너무 만족합니다!"
    },
    {
      name: "이**님",
      service: "거주청소",
      rating: 5,
      comment: "정기 청소 서비스 이용 중인데 항상 친절하고 깨끗하게 청소해주셔서 감사합니다. 추천드려요!"
    },
    {
      name: "박**님",
      service: "상가청소",
      rating: 5,
      comment: "사무실 청소를 맡겼는데 직원들 모두 만족해합니다. 전문적이고 신속한 서비스 감사합니다."
    },
    {
      name: "정**님",
      service: "특수청소",
      rating: 5,
      comment: "화재 후 복구 청소를 해주셨는데 정말 힘든 시기에 큰 도움이 되었습니다. 진심으로 감사드립니다."
    }
  ];

  return (
    <section id="reviews" ref={ref} className="py-20 md:py-28 bg-card" data-testid="section-reviews">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-reviews">
            Review <span className="text-primary">홈클린리치</span>의 솔직리뷰
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-reviews-subtitle">
            고객님들의 생생한 후기
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-review-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3" data-testid={`rating-${index}`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-primary text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed" data-testid={`text-review-comment-${index}`}>
                    {review.comment}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm font-medium" data-testid={`text-review-name-${index}`}>{review.name}</span>
                    <Badge variant="secondary" className="text-xs" data-testid={`badge-review-service-${index}`}>
                      {review.service}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { number: 1, title: "문의접수", description: "홈페이지 또는 전화로 청소 문의" },
    { number: 2, title: "온라인 상담", description: "전문가에게 청소 범위 전달 및 견적 상담" },
    { number: 3, title: "견적제안", description: "공간 크기와 상태에 따른 맞춤형 견적 제시" },
    { number: 4, title: "계약체결", description: "청소 범위, 일정, 비용 등 최종 계약 진행" },
    { number: 5, title: "일정확정", description: "고객 편의에 맞춘 청소 일정 최종 확정" },
    { number: 6, title: "전문팀 방문", description: "홈클린리치 숙련된 청소 전문가 팀 현장 방문" },
    { number: 7, title: "청소작업", description: "홈클린리치 체계적인 매뉴얼에 따른 전문 청소 진행" },
    { number: 8, title: "작업완료", description: "홈클린리치 최종 품질 검수 후 깨끗한 공간 인계" }
  ];

  return (
    <section id="process" ref={ref} className="py-20 md:py-28" data-testid="section-process">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-process">
            <span className="text-primary">홈클린리치</span> 이용 절차
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-process-subtitle">
            문의부터 완료까지 8단계 프로세스
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300 relative overflow-hidden" data-testid={`card-step-${step.number}`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
                <CardContent className="p-6 relative">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4" data-testid={`text-step-number-${step.number}`}>
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold mb-2" data-testid={`text-step-title-${step.number}`}>{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-step-description-${step.number}`}>
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingStatusSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const surnames = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권", "황", "안", "송", "류", "홍", "전", "고", "문", "양", "손", "배", "백", "허", "유", "남", "심", "노", "하", "곽", "성", "차", "주", "우", "구", "민", "진", "나", "지", "엄", "변"];
  const services = ["입주청소", "거주청소", "상가청소", "특수청소"];
  const locations = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];
  
  const getRandomBooking = () => {
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const service = services[Math.floor(Math.random() * services.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    return {
      name: `${surname}**님`,
      service,
      location,
      key: Math.random(),
      time: "방금 전"
    };
  };

  const [bookings, setBookings] = useState(() => 
    Array.from({ length: 5 }, () => getRandomBooking())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBookings(prev => {
        const newBooking = getRandomBooking();
        return [newBooking, ...prev.slice(0, 4)];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="py-16 bg-primary/5" data-testid="section-booking-status">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">실시간 업데이트 중</span>
          </div>
          <h3 className="text-2xl font-bold mb-2" data-testid="text-booking-title">서비스 접수현황</h3>
          <p className="text-muted-foreground" data-testid="text-booking-subtitle">실시간 예약 접수 현황</p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3 overflow-hidden">
          <AnimatePresence initial={false}>
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.key}
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{ 
                  opacity: index === 0 ? 1 : 1 - (index * 0.15),
                  y: 0, 
                  scale: 1 
                }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25,
                  duration: 0.4
                }}
                className={`bg-background rounded-lg p-4 flex items-center justify-between shadow-sm border border-border/50 ${index === 0 ? 'ring-2 ring-primary/20' : ''}`}
                data-testid={`card-booking-${index}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium block" data-testid={`text-booking-name-${index}`}>
                      {booking.name} {booking.service} 예약
                    </span>
                    <span className="text-xs text-muted-foreground">{booking.location} · {booking.time}</span>
                  </div>
                </div>
                <Badge className="ml-2 shrink-0" data-testid={`badge-booking-status-${index}`}>접수완료</Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      services: [],
      message: ""
    }
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "상담 신청 완료",
        description: "빠른 시일 내에 연락드리겠습니다. 감사합니다!",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "오류 발생",
        description: error.message || "상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = async (data: InsertContact) => {
    submitMutation.mutate(data);
  };

  const serviceOptions = [
    "입주청소",
    "거주청소",
    "상가청소",
    "특수청소"
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-card" data-testid="section-contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-contact">
            <span className="text-primary">홈클린리치</span> 상담 신청
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-contact-subtitle">
            문의사항을 남겨주시면 빠르게 연락드리겠습니다
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름 *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="이름을 입력해주세요" 
                          {...field} 
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처 *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="010-0000-0000" 
                          {...field} 
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <FormLabel>시공 선택 *</FormLabel>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {serviceOptions.map((service) => (
                          <FormField
                            key={service}
                            control={form.control}
                            name="services"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(service)}
                                    onCheckedChange={(checked) => {
                                      const newValue = checked
                                        ? [...(field.value || []), service]
                                        : field.value?.filter((v) => v !== service) || [];
                                      field.onChange(newValue);
                                    }}
                                    data-testid={`checkbox-${service}`}
                                  />
                                </FormControl>
                                <Label className="font-normal cursor-pointer">
                                  {service}
                                </Label>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>내용 *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="문의 내용을 입력해주세요"
                          rows={6}
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={submitMutation.isPending}
                  data-testid="button-submit"
                >
                  {submitMutation.isPending ? "전송 중..." : "상담 신청하기"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer({ scrollToSection }: any) {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">홈클린리치</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              깨끗하고 안전한 공간을<br />
              만들어드립니다
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  입주청소
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  거주청소
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  상가청소
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  특수청소
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">회사정보</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>대표자: [대표자명]</li>
              <li>사업자번호: [사업자번호]</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">문의</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>[대표전화]</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>[이메일]</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>[주소]</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Copyright © 2025 홈클린리치. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
