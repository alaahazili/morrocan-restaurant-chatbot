import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero.jpg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Moroccan restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="container mx-auto px-6 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-arabic mb-6">مطعم علاء المغربي</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              تجربة أكلات مغربية أصيلة في أجواء تقليدية
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/menu')} size="lg">
                تصفح القائمة
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/reservation')}>
                حجز طاولة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <section className="py-16 bg-moroccan-gold/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-arabic text-center text-moroccan-red mb-12">أطباقنا المميزة</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Specialty items would go here */}
          </div>
        </div>
      </section>
    </div>
  );
}