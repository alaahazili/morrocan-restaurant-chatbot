import { Button } from '@/components/Button';

export default function Contact() {
  return (
    <div className="py-16 bg-moroccan-gold/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-arabic text-center text-moroccan-red mb-12">اتصل بنا</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">معلومات التواصل</h3>
            <div className="space-y-4">
              <p>
                <span className="font-bold">العنوان:</span> 123 شارع المدينة، الدار البيضاء
              </p>
              <p>
                <span className="font-bold">الهاتف:</span> +212 6 12 34 56 78
              </p>
              <p>
                <span className="font-bold">البريد الإلكتروني:</span> contact@alaa-restaurant.com
              </p>
            </div>
            
            <h3 className="text-xl font-bold mt-8 mb-4">تابعنا</h3>
            <div className="flex gap-4">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-moroccan-gold"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-moroccan-gold"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1">الرسالة</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-moroccan-gold"
                ></textarea>
              </div>
              <Button type="submit" className="w-full">
                إرسال الرسالة
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}