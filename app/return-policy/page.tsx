// app/return-policy/page.jsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Package,
  Phone,
  MessageCircle,
  ChevronRight,
  Home,
  CreditCard,
  Truck,
  UserCheck,
  FileText,
  HelpCircle,
  Calendar,
  ThumbsUp,
  BadgeCheck
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

const ReturnPolicy = () => {
  const [activeTab, setActiveTab] = useState('return');
  const [selectedProduct, setSelectedProduct] = useState('all');

  const returnConditions = [
    {
      id: 'acceptable',
      title: 'شروط القبول',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-green-600',
      conditions: [
        'المنتج في حالة جديدة وغير مستعمل',
        'وجود جميع ملحقات المنتج الأصلية',
        'الفاتورة الأصلية موجودة',
        'التغليف الأصلي سليم وغير تالف',
        'لم يمر أكثر من 14 يوم من تاريخ الاستلام'
      ]
    },
    {
      id: 'not-acceptable',
      title: 'شروط الرفض',
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'bg-rose-600',
      conditions: [
        'الأثاث المخصص حسب الطلب',
        'الأثاث الذي تم تركيبه أو تعديله',
        'الأثاث الذي به علامات استعمال',
        'انتهاء فترة الـ 14 يوم',
        'عدم وجود الفاتورة الأصلية'
      ]
    }
  ];

  const returnProcess = [
    {
      step: 1,
      title: 'طلب الاسترجاع',
      description: 'اتصل بنا أو أرسل طلب عبر الواتساب خلال 14 يوم من الاستلام',
      icon: <Phone className="w-6 h-6" />,
      time: 'خلال 24 ساعة'
    },
    {
      step: 2,
      title: 'فحص المنتج',
      description: 'سيقوم فريقنا بفحص المنتج والتأكد من استيفاء شروط الاسترجاع',
      icon: <CheckCircle className="w-6 h-6" />,
      time: '1-2 أيام'
    },
    {
      step: 3,
      title: 'استلام المنتج',
      description: 'نرسل فريق متخصص لاستلام المنتج من عنوانك',
      icon: <Truck className="w-6 h-6" />,
      time: '3-5 أيام'
    },
    {
      step: 4,
      title: 'استرداد المبلغ',
      description: 'نقوم برد المبلغ خلال 5-7 أيام عمل بنفس طريقة الدفع',
      icon: <CreditCard className="w-6 h-6" />,
      time: '5-7 أيام'
    }
  ];

  const warrantyPolicies = [
    {
      title: 'ضمان الجودة',
      duration: '5 سنوات',
      coverage: 'عيوب الصنعة والمواد',
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: 'ضمان التركيب',
      duration: 'سنتان',
      coverage: 'أعطال التركيب والتثبيت',
      icon: <Home className="w-8 h-8" />
    },
    {
      title: 'دعم فني',
      duration: 'مدى الحياة',
      coverage: 'استشارات فنية ودعم',
      icon: <UserCheck className="w-8 h-8" />
    }
  ];

  const exchangeOptions = [
    {
      type: 'تغيير الحجم',
      fee: 'تواصل للمعرفة',
      time: '7-14 يوم',
      conditions: ['ضمن نفس الموديل', 'قبل التركيب', 'حسب التوفر']
    },
    {
      type: 'تغيير اللون',
      fee: 'تواصل للمعرفة',
      time: '14-21 يوم',
      conditions: ['نفس الموديل', 'تتوفر الألوان', 'قبل الشحن']
    },
    {
      type: 'تغيير الموديل',
      fee: 'تواصل للمعرفة',
      time: '21-30 يوم',
      conditions: ['فرق السعر', 'التوفر بالمخزن', 'موافقة الإدارة']
    }
  ];

  const faqItems = [
    {
      q: 'كم مدة سياسة الاسترجاع؟',
      a: '14 يوم من تاريخ استلام المنتج'
    },
    {
      q: 'هل يمكنني استرجاع الأثاث بعد التركيب؟',
      a: 'لا، الأثاث المثبت لا يمكن استرجاعه إلا في حالة وجود عيب مصنعي'
    },
    {
      q: 'كيف يتم رد المبلغ؟',
      a: 'بنفس طريقة الدفع خلال 5-7 أيام عمل'
    },
    {
      q: 'هل تتحملون تكلفة استرجاع المنتج؟',
      a: 'نعم، في حالة وجود عيب مصنعي، وإلا تتحملون تكلفة الشحن'
    },
    {
      q: 'ماذا عن المنتجات المخفضة؟',
      a: 'نفس سياسة الاسترجاع تنطبق على جميع المنتجات'
    }
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

  const tabs = [
    { id: 'return', label: 'سياسة الإرجاع', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'warranty', label: 'الضمان', icon: <Shield className="w-5 h-5" /> },
    { id: 'exchange', label: 'الاستبدال', icon: <Package className="w-5 h-5" /> },
    { id: 'faq', label: 'أسئلة شائعة', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const productTypes = [
    { id: 'all', label: 'جميع المنتجات' },
    { id: 'furniture', label: 'الأثاث' },
    { id: 'accessories', label: 'ملحقات الأثاث' },
    { id: 'custom', label: 'الأثاث المخصص' }
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
          {/* Breadcrumb and Back Button - NEW */}
          <div className="mb-6 flex items-center justify-between">
            {/* Breadcrumb navigation */}
            <nav className="text-sm text-amber-700/70">
              <Link href="/" className="hover:text-amber-900 transition-colors">
                الرئيسية
              </Link>
              <span className="mx-2">/</span>
              <span className="text-amber-900 font-semibold">سياسة الإرجاع والضمان</span>
            </nav>

            {/* Back button */}
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
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">سياسات الاسترجاع والضمان</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-800 via-teal-800 to-rose-900 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  'سياسة الاسترجاع',
                  1000,
                  'Return & Warranty Policy',
                  1000,
                  'ضمان 10 سنوات',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            
            <p className="text-xl text-amber-900/80 max-w-3xl mx-auto">
              نضمن لك راحة البال مع سياسات استرجاع واضحة وضمان ممتد على جميع منتجاتنا
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

        {/* Product Type Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
            <div className="flex flex-wrap gap-2">
              {productTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedProduct(type.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedProduct === type.id
                      ? 'bg-amber-700 text-white'
                      : 'bg-white text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Return Policy */}
        {activeTab === 'return' && (
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center text-amber-900">
                سياسة الإرجاع والاسترداد
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {returnConditions.map((condition) => (
                  <motion.div
                    key={condition.id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 border border-amber-200 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-xl ${condition.color} text-white`}>
                        {condition.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-amber-900">{condition.title}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {condition.conditions.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-amber-100/50 rounded-lg">
                          {condition.id === 'acceptable' ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-1" />
                          )}
                          <span className="text-amber-900/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Return Process Timeline */}
              <motion.div
                variants={fadeInUp}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-8 text-center text-amber-900">
                  خطوات عملية الاسترجاع
                </h3>
                
                <div className="relative">
                  <div className="absolute right-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-700 to-teal-800 hidden md:block"></div>
                  
                  <div className="space-y-8">
                    {returnProcess.map((step, index) => (
                      <motion.div
                        key={step.step}
                        variants={fadeInUp}
                        className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                      >
                        <div className="md:w-1/2"></div>
                        
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
                              <h4 className="text-xl font-bold text-amber-900">{step.title}</h4>
                            </div>
                            <p className="text-amber-900/80 mb-3">{step.description}</p>
                            <div className="flex items-center gap-2 text-sm text-teal-800">
                              <Clock className="w-4 h-4" />
                              <span>المدة المتوقعة: {step.time}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Refund Information */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-3xl p-8 border border-amber-200"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-amber-900">
                  معلومات استرداد الأموال
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="w-8 h-8 text-amber-700" />
                      <h4 className="text-lg font-bold text-amber-900">طريقة الاسترداد</h4>
                    </div>
                    <p className="text-amber-900/80">
                      سيتم رد المبلغ بنفس طريقة الدفع الأصلية خلال 5-7 أيام عمل
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-8 h-8 text-teal-800" />
                      <h4 className="text-lg font-bold text-amber-900">مدة الاسترداد</h4>
                    </div>
                    <p className="text-amber-900/80">
                      تبدأ من تاريخ استلام المنتج وتفحصه في معرضنا
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="w-8 h-8 text-rose-900" />
                      <h4 className="text-lg font-bold text-amber-900">الخصومات</h4>
                    </div>
                    <p className="text-amber-900/80">
                      قد يتم خصم تكاليف الشحن وعمليات الدفع في بعض الحالات
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Warranty */}
        {activeTab === 'warranty' && (
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center text-amber-900">
                سياسة الضمان الشامل
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {warrantyPolicies.map((policy, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 border border-amber-200 shadow-lg"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-gradient-to-r from-amber-700 to-teal-800 rounded-xl text-white mb-4">
                        {policy.icon}
                      </div>
                      <h3 className="text-xl font-bold text-amber-900 mb-2">{policy.title}</h3>
                      <div className="text-4xl font-bold text-amber-700 mb-2">{policy.duration}</div>
                      <p className="text-amber-900/80">{policy.coverage}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Warranty Coverage Details */}
              <motion.div
                variants={fadeInUp}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-amber-900">
                  تفاصيل التغطية
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-8 border border-amber-200">
                    <h4 className="text-xl font-bold mb-4 text-amber-900">ما يشمله الضمان</h4>
                    <div className="space-y-3">
                      {[
                        'عيوب المواد الخام',
                        'أخطاء التصنيع',
                        'مشاكل الهيكل الأساسي',
                        'خلل في التركيب من قبل فريقنا',
                        'تآكل طبيعي غير مبرر'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-amber-900/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-rose-50/50 to-rose-100/30 rounded-2xl p-8 border border-rose-200">
                    <h4 className="text-xl font-bold mb-4 text-amber-900">ما لا يشمله الضمان</h4>
                    <div className="space-y-3">
                      {[
                        'الإهمال وسوء الاستخدام',
                        'الكوارث الطبيعية',
                        'التعديلات من قبل عميل',
                        'التعرض للرطوبة العالية'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                          <span className="text-amber-900/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Warranty Claim Process */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-teal-50/50 to-amber-50 rounded-3xl p-8 border border-amber-200"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-amber-900">
                  خطوات المطالبة بالضمان
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      step: 'التواصل',
                      desc: 'اتصل بنا أو أرسل صور المشكلة عبر الواتساب'
                    },
                    {
                      step: 'التقييم',
                      desc: 'سيقوم الفني بتقييم المشكلة عن بعد أو بالزيارة'
                    },
                    {
                      step: 'الموافقة',
                      desc: 'نرسل لك تقرير التقييم وخطة الإصلاح'
                    },
                    {
                      step: 'التنفيذ',
                      desc: 'نرسل فريق متخصص للإصلاح أو الاستبدال'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-amber-200">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-700 to-teal-800 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900 mb-1">{item.step}</h4>
                        <p className="text-amber-900/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Exchange */}
        {activeTab === 'exchange' && (
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center text-amber-900">
                سياسة الاستبدال
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {exchangeOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 border border-amber-200 shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-amber-900 mb-4">{option.type}</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-3 bg-amber-100/50 rounded-lg">
                        <span className="text-amber-800">الرسوم:</span>
                        <span className={`font-bold text-lg ${option.fee === 'مجاناً' ? 'text-green-600' : 'text-amber-700'}`}>
                          {option.fee}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-amber-100/50 rounded-lg">
                        <span className="text-amber-800">المدة:</span>
                        <span className="font-bold text-lg text-teal-800">{option.time}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-900 mb-2">الشروط:</h4>
                      {option.conditions.map((condition, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-700 flex-shrink-0" />
                          <span className="text-amber-900/80 text-sm">{condition}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full mt-6 py-3 bg-gradient-to-r from-amber-700 to-teal-800 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
                      طلب استبدال
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Exchange Process */}
              <motion.div
                variants={fadeInUp}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-amber-900">
                  كيفية عمل طلب استبدال
                </h3>
                
                <div className="bg-white rounded-2xl p-6 border border-amber-200">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-amber-700">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900 mb-1">التواصل مع خدمة العملاء</h4>
                        <p className="text-amber-900/80">اتصل بنا على 01015262864 أو عبر الواتساب لطلب الاستبدال</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-amber-700">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900 mb-1">تحديد البديل</h4>
                        <p className="text-amber-900/80">اختر المنتج البديل من متجرنا الإلكتروني أو المعرض</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-amber-700">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900 mb-1">تسوية الفروق</h4>
                        <p className="text-amber-900/80">حساب الفرق في السعر ودفعه أو استلامه</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-amber-700">4</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900 mb-1">الشحن والاستلام</h4>
                        <p className="text-amber-900/80">نقوم باستلام القديم وتسليم الجديد مع فريق متخصص</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center text-amber-900">
                أسئلة شائعة عن الاسترجاع والضمان
              </h2>
              
              <div className="space-y-4 mb-12">
                {faqItems.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white rounded-xl p-6 border border-amber-200 hover:border-amber-300 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
                        <HelpCircle className="w-6 h-6 text-amber-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-amber-900 mb-2">{faq.q}</h4>
                        <p className="text-amber-900/80">{faq.a}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Important Notes */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-3xl p-8 border border-amber-200"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-amber-900">
                  ملاحظات هامة
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <Calendar className="w-5 h-5 text-amber-700" />
                      <span className="text-amber-900/80">مدة الإرجاع 14 يوم من تاريخ الاستلام</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <FileText className="w-5 h-5 text-amber-700" />
                      <span className="text-amber-900/80">الفاتورة الأصلية مطلوبة للاسترجاع</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <ThumbsUp className="w-5 h-5 text-amber-700" />
                      <span className="text-amber-900/80">فحص المنتج قبل التركيب مهم</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <BadgeCheck className="w-5 h-5 text-amber-700" />
                      <span className="text-amber-900/80">ضمان 10 سنوات على عيوب الصنعة</span>
                    </div>
                  </div>
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
            <h2 className="text-4xl font-bold mb-6 text-amber-900">هل لديك استفسار عن الاسترجاع أو الضمان؟</h2>
            <p className="text-xl text-amber-900/80 mb-8 max-w-2xl mx-auto">
              فريق خدمة العملاء متاح على مدار الساعة للإجابة على جميع استفساراتك
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+201006427233"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-700 to-amber-800 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>اتصل بنا الآن</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <a 
                href="https://wa.me/201015262864?text=أريد%20استفسار%20عن%20سياسة%20الاسترجاع"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-teal-700 to-teal-800 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تواصل على واتساب</span>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link 
              href="/Delivery Policy"
              className="group bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 border border-amber-200 hover:border-amber-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Truck className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-lg font-bold text-amber-900 group-hover:text-amber-700 transition-colors">معلومات الشحن</h3>
              </div>
              <p className="text-amber-900/80 text-sm">تعرف على سياسات الشحن والتوصيل لجميع المحافظات</p>
            </Link>
            
            <Link 
              href="/about"
              className="group bg-gradient-to-b from-teal-50/50 to-white rounded-2xl p-6 border border-teal-200 hover:border-teal-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <BadgeCheck className="w-6 h-6 text-teal-800" />
                </div>
                <h3 className="text-lg font-bold text-amber-900 group-hover:text-teal-800 transition-colors">من نحن</h3>
              </div>
              <p className="text-amber-900/80 text-sm">تعرف على شركتنا وتاريخنا في صناعة الأثاث الدمياطي</p>
            </Link>
            
            <a 
              href="https://modrenonline.com/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-b from-rose-50/30 to-white rounded-2xl p-6 border border-rose-200 hover:border-rose-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Home className="w-6 h-6 text-rose-900" />
                </div>
                <h3 className="text-lg font-bold text-amber-900 group-hover:text-rose-900 transition-colors">المتجر الإلكتروني</h3>
              </div>
              <p className="text-amber-900/80 text-sm">تصفح مجموعتنا الكاملة من الأثاث الدمياطي الفاخر</p>
            </a>

            {/* NEW: Back to Home card */}
            <Link 
              href="/"
              className="group bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 border border-amber-200 hover:border-amber-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Home className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-lg font-bold text-amber-900 group-hover:text-amber-700 transition-colors">العودة للرئيسية</h3>
              </div>
              <p className="text-amber-900/80 text-sm">تصفح الموقع واطلع على أحدث منتجاتنا وعروضنا</p>
            </Link>
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
          href="https://wa.me/201015262864?text=أريد%20استفسار%20عن%20سياسة%20الاسترجاع"
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

export default ReturnPolicy;