// app/shipping-info/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  Clock, 
  Shield, 
  MapPin, 
  CheckCircle, 
  AlertCircle,
  CreditCard,
  Home,
  Globe,
  Phone,
  MessageCircle,
  ChevronRight,
  Star,
  Award,
  TreePine,
  PackageOpen,
  HeartHandshake
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

const DeliveryPolicy = () => {
  const [activeTab, setActiveTab] = useState('delivery');
  const [selectedCity, setSelectedCity] = useState('القاهرة');

  const shippingOptions = [
    {
      id: 'standard',
      title: 'توصيل عادي',
      time: '7-14 يوم عمل',
      cost: 'اتصل للاستعلام',
      icon: <Truck className="w-8 h-8" />,
      color: 'bg-amber-700',
      features: ['توصيل لجميع المحافظات', 'تتبع الشحنة', 'تأمين على الشحنة', 'خدمة عملاء متخصصة']
    },
    {
      id: 'express',
      title: 'توصيل سريع',
      time: '3-7 أيام عمل',
      cost: 'اتصل للاستعلام',
      icon: <Package className="w-8 h-8" />,
      color: 'bg-teal-800',
      features: ['توصيل أسرع', 'أولوية التوصيل', 'تتبع لحظي', 'فريق تركيب متخصص']
    },
    {
      id: 'premium',
      title: 'توصيل فاخر',
      time: '2-4 أيام عمل',
      cost: 'اتصل للاستعلام',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-rose-900',
      features: ['توصيل وتفريغ', 'تركيب مجاني', 'خدمة عملاء متميزة', 'فحص وضمان شامل']
    }
  ];

  const coverageAreas = {
    'الدلتا': ['دمياط', 'الدقهلية', 'الشرقية', 'كفر الشيخ', 'الغربية'],
    'القاهرة الكبرى': ['القاهرة', 'الجيزة', 'القليوبية'],
    'الصعيد': ['أسيوط', 'سوهاج', 'قنا', 'الأقصر', 'أسوان'],
    'السواحل': ['الإسكندرية', 'مطروح', 'البحر الأحمر'],
    'القناة': ['بورسعيد', 'الإسماعيلية', 'السويس']
  };

  const deliveryTimes = [
    { city: 'القاهرة', time: '3-7 أيام', status: 'متاح' },
    { city: 'الجيزة', time: '3-7 أيام', status: 'متاح' },
    { city: 'الإسكندرية', time: '5-10 أيام', status: 'متاح' },
    { city: 'دمياط', time: '1-3 أيام', status: 'متاح' },
    { city: 'أسيوط', time: '7-14 يوم', status: 'متاح' },
    { city: 'أسوان', time: '10-20 يوم', status: 'متاح' },
  ];

  const shippingProcess = [
    {
      step: 1,
      title: 'تأكيد الطلب',
      description: 'بعد استلام طلبك، نتصل بك خلال 24 ساعة للتأكيد وتحديد موعد التوصيل',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 2,
      title: 'تجهيز المنتج',
      description: 'نقوم بتجهيز وتغليف منتجك بعناية فائقة بمواد خاصة للأثاث',
      icon: <PackageOpen className="w-6 h-6" />
    },
    {
      step: 3,
      title: 'الشحن الآمن',
      description: 'نستخدم سيارات مجهزة خصيصاً لنقل الأثاث مع تأمين كامل',
      icon: <Truck className="w-6 h-6" />
    },
    {
      step: 4,
      title: 'التسليم والتركيب',
      description: 'تسليم المنتج وتركيبه في المكان المحدد مع ضمان الجودة',
      icon: <HeartHandshake className="w-6 h-6" />
    }
  ];

  const shippingPolicies = [
    'جميع الشحنات مؤمنة ضد التلف والضياع',
    'فريق متخصص في تفريغ وتركيب الأثاث',
    'إمكانية الإرجاع خلال 14 يوم',
    'تتبع الشحنة عبر الرابط المرسل على الجوال',
    'دعم فني على مدار الساعة للأثاث'
  ];

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

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const tabs = [
    { id: 'delivery', label: 'التوصيل', icon: <Truck className="w-5 h-5" /> },
    { id: 'areas', label: 'مناطق التغطية', icon: <MapPin className="w-5 h-5" /> },
    { id: 'process', label: 'خطوات الشحن', icon: <Clock className="w-5 h-5" /> },
    { id: 'policies', label: 'سياسات الشحن', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-wood-100/10 to-amber-50/20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-700/5 via-transparent to-rose-900/5">
          <div className="absolute top-10 right-10 w-72 h-72 bg-amber-700/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-900/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb and Back Button */}
          <div className="mb-6 flex items-center justify-between">
            <nav className="text-sm text-amber-700/70">
              <Link href="/" className="hover:text-amber-900 transition-colors">
                الرئيسية
              </Link>
              <span className="mx-2">/</span>
              <span className="text-amber-900 font-semibold">سياسة التوصيل</span>
            </nav>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-all duration-300 border border-amber-300"
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
            <div className="inline-flex items-center gap-2 bg-amber-700/10 text-amber-800 dark:text-amber-600 px-4 py-2 rounded-full mb-4">
              <TreePine className="w-4 h-4" />
              <span className="text-sm font-semibold">شحن وتوصيل الأثاث الدمياطي</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-800 via-teal-800 to-rose-900 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  'سياسة التوصيل',
                  1000,
                  'Delivery Policy',
                  1000,
                  'توصيل لجميع المحافظات',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            
            <p className="text-xl text-amber-900/80 max-w-3xl mx-auto">
              نضمن لك توصيل آمن ومحترف لأثاثك الدمياطي الفاخر مع فريق متخصص في التركيب
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-700 to-teal-800 text-white shadow-lg'
                    : 'bg-amber-50 border border-amber-200 hover:bg-amber-100/50'
                }`}
              >
                {tab.icon}
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* باقي المحتوى كما هو - لم يتغير */}
        {/* Delivery Options */}
        {activeTab === 'delivery' && (
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center text-amber-900">خيارات التوصيل المتاحة</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shippingOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-700/10 to-teal-800/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-b from-amber-50 to-white rounded-2xl p-8 border border-amber-200 shadow-lg backdrop-blur-sm">
                      <div className={`inline-flex p-3 rounded-xl ${option.color} text-white mb-6`}>
                        {option.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2 text-amber-900">{option.title}</h3>
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between p-3 bg-amber-100/50 rounded-lg border border-amber-200">
                          <span className="text-amber-800">مدة التوصيل:</span>
                          <span className="font-bold text-lg text-amber-900">{option.time}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-amber-100/50 rounded-lg border border-amber-200">
                          <span className="text-amber-800">التكلفة:</span>
                          <span className="font-bold text-lg text-teal-800">{option.cost}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {option.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-teal-700 flex-shrink-0" />
                            <span className="text-amber-900/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full mt-6 py-3 bg-gradient-to-r from-amber-700 to-teal-800 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
                        استفسر عن السعر
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Delivery Time Calculator */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-3xl p-8 border border-amber-200"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-amber-900">حاسبة وقت التوصيل</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-semibold mb-3 text-amber-800">اختر المحافظة:</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-4 rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                  >
                    {Object.entries(coverageAreas).map(([region, cities]) => (
                      <optgroup key={region} label={region} className="text-amber-900">
                        {cities.map((city) => (
                          <option key={city} value={city} className="text-amber-900">{city}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-800">المدينة المختارة:</span>
                      <span className="font-bold text-lg text-amber-900">{selectedCity}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-800">مدة التوصيل المتوقعة:</span>
                      <span className="font-bold text-lg text-teal-800">3-7 أيام عمل</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-800">نوع الخدمة:</span>
                      <span className="font-bold text-lg text-rose-900">توصيل أثاث فاخر</span>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-amber-700 to-teal-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    اتصل لمعرفة السعر الدقيق
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Coverage Areas */}
        {activeTab === 'areas' && (
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center text-amber-900">مناطق التغطية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(coverageAreas).map(([region, cities], index) => (
                  <motion.div
                    key={region}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 border border-amber-200 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <MapPin className="w-6 h-6 text-amber-700" />
                      </div>
                      <h3 className="text-xl font-bold text-amber-900">{region}</h3>
                    </div>
                    
                    <div className="space-y-2">
                      {cities.map((city, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 hover:bg-amber-100/50 rounded-lg transition-colors">
                          <CheckCircle className="w-4 h-4 text-teal-700 flex-shrink-0" />
                          <span className="text-amber-900/80">{city}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-amber-200">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-800">مدة التوصيل:</span>
                        <span className="font-semibold text-amber-900">3-10 أيام</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Delivery Times Table */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-3xl p-8 border border-amber-200"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-amber-900">أوقات التوصيل</h3>
              <div className="overflow-x-auto rounded-xl border border-amber-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-amber-100/50">
                      <th className="p-4 text-right font-semibold text-amber-900">المحافظة</th>
                      <th className="p-4 text-right font-semibold text-amber-900">مدة التوصيل</th>
                      <th className="p-4 text-right font-semibold text-amber-900">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryTimes.map((item, index) => (
                      <tr key={index} className="border-b border-amber-200 hover:bg-amber-100/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-amber-700" />
                            <span className="font-semibold text-amber-900">{item.city}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-amber-600" />
                            <span className="text-amber-900/80">{item.time}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                            <CheckCircle className="w-4 h-4" />
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Shipping Process */}
        {activeTab === 'process' && (
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-12 text-center text-amber-900">خطوات عملية الشحن والتركيب</h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute right-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-700 to-teal-800 hidden md:block"></div>
                
                <div className="space-y-8">
                  {shippingProcess.map((step, index) => (
                    <motion.div
                      key={step.step}
                      variants={fadeInUp}
                      className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                      <div className="md:w-1/2"></div>
                      
                      {/* Step Circle */}
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-700 to-teal-800 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {step.step}
                        </div>
                      </div>
                      
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} mt-4 md:mt-0`}>
                        <div className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 border border-amber-200 shadow-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                              {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-amber-900">{step.title}</h3>
                          </div>
                          <p className="text-amber-900/80">{step.description}</p>
                          <div className="mt-4 flex items-center gap-2 text-sm text-teal-800">
                            <Clock className="w-4 h-4" />
                            <span>مدة هذه الخطوة: 1-3 أيام عمل</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Packaging Info */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-8 border border-amber-200">
                <h3 className="text-2xl font-bold mb-6 text-amber-900">تغليف آمن للأثاث</h3>
                <div className="space-y-4">
                  {[
                    'طبقات متعددة من الفلين المضغوط الخاص',
                    'قماش قطن لحماية الأسطح',
                    'أشرطة تقوية خاصة للأثاث',
                    'ملصقات "هش" و"هذا الجانب لأعلى"',
                    'تغليف مقاوم للماء والرطوبة'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-700 flex-shrink-0" />
                      <span className="text-amber-900/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50/50 to-amber-50 rounded-2xl p-8 border border-amber-200">
                <h3 className="text-2xl font-bold mb-6 text-amber-900">تتبع الشحنة</h3>
                <div className="space-y-4">
                  <p className="text-amber-900/80">
                    نرسل لك رابط تتبع خاص على الواتساب يمكنك من متابعة شحنتك خطوة بخطوة
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200">
                      <span className="text-amber-800">رقم التتبع:</span>
                      <code className="font-mono text-teal-800">FURN-{Math.floor(Math.random() * 10000)}</code>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200">
                      <span className="text-amber-800">حالة الشحنة:</span>
                      <span className="font-semibold text-teal-800">في الطريق</span>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-amber-700 to-teal-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                      اضغط لتتبع شحنتك
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Shipping Policies */}
        {activeTab === 'policies' && (
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center text-amber-900">سياسات الشحن والضمان</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-8 border border-amber-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-8 h-8 text-amber-700" />
                    <h3 className="text-2xl font-bold text-amber-900">ضمان الشحن</h3>
                  </div>
                  <ul className="space-y-4">
                    {shippingPolicies.map((policy, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-700 flex-shrink-0 mt-1" />
                        <span className="text-amber-900/80">{policy}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-teal-50/50 to-teal-100/30 rounded-2xl p-8 border border-teal-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-8 h-8 text-teal-800" />
                    <h3 className="text-2xl font-bold text-amber-900">معلومات مهمة</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border border-amber-200">
                      <div className="font-semibold mb-2 text-amber-900">التأخير في التوصيل:</div>
                      <p className="text-sm text-amber-900/80">
                        في حال تأخر الشحنة عن الموعد المتفق عليه، يمكنك التواصل مع خدمة العملاء للمطالبة بتعويض.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-amber-200">
                      <div className="font-semibold mb-2 text-amber-900">تلف المنتج:</div>
                      <p className="text-sm text-amber-900/80">
                        في حال وصول المنتج تالفاً، يرجى عدم الاستلام وتصوير المنتج وإرسال الصور لخدمة العملاء.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-amber-200">
                      <div className="font-semibold mb-2 text-amber-900">الرفض عند الاستلام:</div>
                      <p className="text-sm text-amber-900/80">
                        يحق لك رفض الاستلام في حال وجود أي عيب في المنتج أو عدم مطابقته للمواصفات المتفق عليها.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* FAQ Section */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-3xl p-8 border border-amber-200"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-amber-900">أسئلة شائعة عن شحن الأثاث</h3>
                <div className="space-y-4">
                  {[
                    {
                      q: 'كيف يمكنني تتبع شحنة الأثاث؟',
                      a: 'نرسل لك رابط تتبع على الواتساب بمجرد شحن المنتج، يمكنك استخدامه لمتابعة حالة الشحنة.'
                    },
                    {
                      q: 'هل هناك فريق تركيب متخصص؟',
                      a: 'نعم، لدينا فرق متخصصة في تركيب جميع أنواع الأثاث الدمياطي.'
                    },
                    {
                      q: 'ماذا عن ضمان الأثاث بعد التركيب؟',
                      a: 'جميع قطع الأثاث مضمونة ضد عيوب الصنعة مع ضمان خدمة ما بعد البيع.'
                    },
                    {
                      q: 'كم تستغرق عملية شحن الأثاث الكبير؟',
                      a: 'تتراوح مدة الشحن بين 3-14 يوم عمل حسب المنطقة ونوع الأثاث وخدمة التوصيل المختارة.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-amber-200">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <span className="font-bold text-amber-700">Q</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold mb-2 text-amber-900">{faq.q}</h4>
                          <p className="text-amber-900/80">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-amber-700/10 via-teal-800/10 to-rose-900/10 rounded-3xl p-12 border border-amber-200">
            <h2 className="text-4xl font-bold mb-6 text-amber-900">هل لديك استفسار عن شحن الأثاث؟</h2>
            <p className="text-xl text-amber-900/80 mb-8 max-w-2xl mx-auto">
              فريق خدمة العملاء المتخصص في شحن الأثاث متاح على مدار الساعة للإجابة على جميع استفساراتك
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+201006427233"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-700 to-amber-800 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>اتصل بنا للاستفسار عن السعر</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <a 
                href="https://wa.me/201015262864"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-teal-700 to-teal-800 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تواصل على واتساب للتفاصيل</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/about"
              className="group bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 border border-amber-200 hover:border-amber-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Star className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-lg font-bold text-amber-900 group-hover:text-amber-700 transition-colors">من نحن</h3>
              </div>
              <p className="text-amber-900/80 text-sm">تعرف على شركتنا وتاريخنا في صناعة الأثاث الدمياطي الفاخر</p>
            </Link>
            
            <Link 
              href="/return-policy"
              className="group bg-gradient-to-b from-teal-50/50 to-white rounded-2xl p-6 border border-teal-200 hover:border-teal-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Shield className="w-6 h-6 text-teal-800" />
                </div>
                <h3 className="text-lg font-bold text-amber-900 group-hover:text-teal-800 transition-colors">سياسة الاسترجاع</h3>
              </div>
              <p className="text-amber-900/80 text-sm">اطلع على سياسات الإرجاع والاستبدال والضمان للأثاث</p>
            </Link>
            
            <a 
              href="https://modrenonline.com/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-b from-rose-50/30 to-white rounded-2xl p-6 border border-rose-200 hover:border-rose-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Globe className="w-6 h-6 text-rose-900" />
                </div>
                <h3 className="text-lg font-bold text-amber-900 group-hover:text-rose-900 transition-colors">المتجر الإلكتروني</h3>
              </div>
              <p className="text-amber-900/80 text-sm">تصفح مجموعتنا الكاملة من الأثاث الدمياطي الفاخر</p>
            </a>
          </div>
        </motion.div>
      </div>

      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <a 
          href="https://wa.me/201015262864?text=أريد%20استفسار%20عن%20سعر%20شحن%20الأثاث"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-amber-600 rounded-full text-xs flex items-center justify-center animate-pulse">
            !
          </span>
        </a>
      </motion.div>
    </div>
  );
};

export default DeliveryPolicy;