import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SocialLinks } from "@/components/social-links"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-12 md:py-20 bg-secondary/30 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">تواصل معنا</h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              عندك سؤال أو فكرة؟ تواصل معنا عبر أي قناة مشغولة أكثر ليك. احنا هنرد عليك بسرعة.
            </p>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">اختار طريقة التواصل</h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                واتساب وفيسبوك متاحين الآن. باقي القنوات اللي جاي قريباً
              </p>
            </div>
            <SocialLinks />
          </div>
        </section>

        {/* Address Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">معلومات الموقع</h2>
              <div className="bg-card p-8 rounded-lg border border-border space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">اسم المصنع</p>
                  <p className="text-2xl font-bold text-foreground">Modern Online</p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-2">العنوان</p>
                  <p className="text-lg text-foreground leading-relaxed">
                    مصر، محافظة دمياط 
                    <br />
                    مركز دمياط،  شارع المحور 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">الأسئلة الشائعة</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">الأثاث المخصص بياخد وقت قد ايه ؟</h3>
                <p className="text-muted-foreground">
                  معظم القطع المخصصة تحتاج من 10 ايام الي 20 يوم 
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">ما الخامات المستخدمة ؟ </h3>
                <p className="text-muted-foreground">
                  اخشاب زان احمر بلكامل , سفنجات أعلي خامات المستخدمة من 35 كثافة لحد 40 كثافة , اعلي فنش تشطيب دمياطي 
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">هل متاح شحن داخل و خارج مصر ؟ </h3>
                <p className="text-muted-foreground">
                  بتأكيد متاح شحن الي جميع محافظات مصر و جميع البلاد العربية بأمان تام 
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">عندكم ضمان؟</h3>
                <p className="text-muted-foreground">
                  كل القطع بيجي معها ضمان 5 سنوات. احنا واقفين ورا شغلنا والتزمين برضاك.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
