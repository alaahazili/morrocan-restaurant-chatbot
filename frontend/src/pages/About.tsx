import aboutImage from '@/assets/about.jpg';

export default function About() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <img 
              src={aboutImage} 
              alt="Restaurant interior"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-arabic text-moroccan-red mb-6">عن مطعمنا</h2>
            <p className="text-lg mb-4">
              مطعم علاء يجلب لكم الأصالة المغربية في كل لقمة. منذ عام 2010، نقدم أطباقاً تقليدية
              تحضر بكل حب باستخدام وصفات عائلية تعود إلى أجيال.
            </p>
            <p className="text-lg mb-4">
              نستخدم فقط أفضل المكونات الطازجة والمستوردة مباشرة من المغرب لنضمن لكم تجربة
              طعام لا تنسى.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-moroccan-gold/10 p-4 rounded-lg">
                <h3 className="font-bold text-moroccan-red">ساعات العمل</h3>
                <p>اليومية: 11 صباحاً - 11 مساءً</p>
                <p>الجمعة: 1 ظهراً - 11 مساءً</p>
              </div>
              <div className="bg-moroccan-gold/10 p-4 rounded-lg">
                <h3 className="font-bold text-moroccan-red">الموقع</h3>
                <p>123 شارع المدينة، الدار البيضاء</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}