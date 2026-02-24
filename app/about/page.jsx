// app/about/page.jsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Phone, MessageCircle, MapPin, ExternalLink, Globe, ChevronRight, Star, Shield, Truck, Clock, Award, Heart, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  const whatsappNumbers = [
    { number: "01000680381", url: "https://wa.me/201000680381" },
    { number: "01015262864", url: "https://wa.me/201015262864" },
    { number: "01066843467", url: "https://wa.me/201066843467" }
  ];

  const websiteUrl = "https://modrenonline.com/portfolio/";
  const mapUrl = "https://maps.app.goo.gl/x4RrY4owWrgsjX2H8";

  const features = [
    { icon: <Award className="w-8 h-8" />, title: "جودة عالمية", desc: "أثاث بمعايير جودة عالمية" },
    { icon: <Shield className="w-8 h-8" />, title: "ضمان 5 سنوات", desc: "ضمان شامل لمدة 5 سنوات ضد عيوب الصناعة" },
    { icon: <Clock className="w-8 h-8" />, title: "تصنيع سريع", desc: "تصنيع خلال 7-15 يوم" },
  ];

  const stats = [
    { value: "5000+", label: "عميل راضي" },
    { value: "15+", label: "سنة خبرة" },
    { value: "98%", label: "رضا عملاء" },
    { value: "24/7", label: "دعم فني" },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/5 to-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb and Back Button */}
          <div className="mb-6 flex items-center justify-between">
            {/* Breadcrumb navigation */}
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                الرئيسية
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground font-semibold">من نحن</span>
            </nav>

            {/* Back button */}
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 text-foreground rounded-lg transition-all duration-300 border border-border"
              aria-label="العودة للصفحة السابقة"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              <span>رجوع</span>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">مودرن أون لاين</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  'من نحن',
                  1000,
                  'ModernOnline.com',
                  1000,
                  'أثاث دمياط الفاخر',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              رحلة تمتد لأكثر من 15 عاماً في صناعة الأثاث الدمياطي بجودة لا تضاهى وتصميمات عصرية تلبي كل الأذواق
            </p>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={floatingAnimation}
            className="absolute top-1/4 left-10 hidden lg:block"
          >
            <div className="w-20 h-20 bg-accent/20 rounded-full"></div>
          </motion.div>
          
          <motion.div
            animate={floatingAnimation}
            transition={{ delay: 0.5 }}
            className="absolute bottom-1/4 right-10 hidden lg:block"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Features Grid */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center hover:shadow-2xl hover:border-primary/50 transition-all duration-300"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 ${
                hoveredCard === index 
                  ? 'bg-primary text-primary-foreground transform rotate-12' 
                  : 'bg-secondary/20 text-primary'
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* About Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  صناع أثاث من دمياط
                </h2>
              </div>
              
              <p className="text-lg leading-relaxed mb-6 text-foreground/90">
                في قلب مدينة <span className="font-bold text-primary">دمياط</span>، عاصمة الأثاث في مصر، نصنع تحفاً من الخشب 
                تجمع بين الأصالة الدمياطية والتصميم العصري. نستخدم فقط أفضل أنواع الخشب الطبيعي 
                والمعالجة الحرارية المتقدمة لضمان دوام أثاثنا لعقود.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['خشب طبيعي', 'تصميم عصري', 'ضمان 5 سنوات', 'صديق للبيئة'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-secondary/20 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <a 
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Globe className="w-5 h-5" />
                <span>تصفح منتجاتنا</span>
                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-secondary/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border/50 backdrop-blur-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <MapPin className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  عنواننا
                </h2>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/20">
                  <p className="text-xl font-bold text-foreground mb-2">📍 دمياط - باب الحرس</p>
                  <p className="text-muted-foreground">مصنعنا في قلب دمياط القديمة عنوان الأثاث في مصر</p>
                </div>

                <div className="relative h-48 rounded-2xl overflow-hidden border border-border">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <div className="absolute bottom-4 right-4 z-20">
                    <a 
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-foreground px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>فتح الخريطة</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-foreground/90">
                  نفتخر بموقعنا في دمياط حيث نستلهم من تراثها العريق في صناعة الأثاث، 
                  ونطوره بتقنيات عصرية لتقديم أفضل ما يمكن لعملائنا الكرام.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 border border-border/50">
            <h2 className="text-3xl font-bold text-center mb-10">أرقامنا تتحدث عنا</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="text-center group"
                >
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-primary to-accent bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-lg text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">تواصل معنا</h2>
            <p className="text-xl text-muted-foreground">نحن هنا لخدمتك على مدار الساعة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Phone Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-card rounded-2xl p-8 border border-border/50 backdrop-blur-sm h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">اتصل بنا</h3>
                </div>
                
                <a 
                  href="tel:+201006427233"
                  className="block mb-6 group/phone"
                >
                  <div className="text-3xl font-bold mb-2 group-hover/phone:text-blue-600 transition-colors">
                    +20 100 642 7233
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>24/7 خدمة العملاء</span>
                  </div>
                </a>
                
                <motion.div
                  animate={pulseAnimation}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
                  onClick={() => window.location.href = 'tel:+201006427233'}
                >
                  <Phone className="w-5 h-5" />
                  <span>اتصال فوري</span>
                </motion.div>
              </div>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-card rounded-2xl p-8 border border-border/50 backdrop-blur-sm h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <MessageCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold">واتساب</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {whatsappNumbers.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group/whatsapp"
                      whileHover={{ x: 10 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <i className="fab fa-whatsapp text-green-600 dark:text-green-400"></i>
                          </div>
                          <span className="font-semibold">{item.number}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover/whatsapp:opacity-100 transition-opacity" />
                      </div>
                    </motion.a>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground text-center">
                  انقر على أي رقم للتواصل عبر واتساب
                </div>
              </div>
            </motion.div>

            {/* Website Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-card rounded-2xl p-8 border border-border/50 backdrop-blur-sm h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">منتجات مودرن أونلاين</h3>
                </div>
                
                <div className="mb-6">
                  <div className="text-2xl font-bold mb-2 text-primary">modrenonline.com</div>
                  <p className="text-muted-foreground">
                    تصفح مجموعتنا الكاملة من الأثاث الدمياطي الفاخر
                  </p>
                </div>
                
                <a 
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full bg-gradient-to-r from-primary to-accent text-white px-6 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <Globe className="w-5 h-5" />
                  <span>زيارة الموقع الآن</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl p-12 border border-border/50">
            <h2 className="text-4xl font-bold mb-6">جرب تجربة التسوق الفريدة</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              اكتشف عالم الأثاث الدمياطي بلمسة عصرية وتصميمات ثلاثية الأبعاد
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <i className="fas fa-cube text-xl"></i>
                <span>تواصل من خلال منصات سوشيال ميديا</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <a 
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-white text-foreground border border-border px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <i className="fas fa-shopping-cart"></i>
                <span>تسوق الآن</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Back to Home Card (Optional but added for consistency) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link 
            href="/"
            className="group inline-flex items-center gap-3 bg-secondary/20 hover:bg-secondary/30 text-foreground border border-border px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>العودة إلى الرئيسية</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <a 
          href="https://wa.me/201000680381"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
            !
          </span>
        </a>
      </motion.div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default About;