import { useState } from 'react';
import { Button } from '@/components/Button';
import { useCart } from '@/store/cartStore';

export default function Payment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const cart = useCart(state => state.items);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the payment data to your backend
    console.log('Payment submitted:', formData);
    alert('Payment processed successfully!');
  };

  return (
    <div className="min-h-screen py-12 bg-moroccan-gold/5">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-arabic text-center text-moroccan-red mb-8">الدفع</h1>
        
        <div className="max-w-2xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-arabic text-moroccan-blue mb-4">ملخص الطلب</h2>
            <div className="space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.price} DH</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>المجموع</span>
                <span>{total} DH</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-arabic text-moroccan-blue mb-4">معلومات الدفع</h2>
            
            <div className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="أدخل اسمك الكامل"
                  
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-moroccan-gold focus:border-moroccan-gold"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-moroccan-gold focus:border-moroccan-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="أدخل رقم هاتفك"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-moroccan-gold focus:border-moroccan-gold"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="أدخل عنوانك"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-moroccan-gold focus:border-moroccan-gold"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">رقم البطاقة</label>
                  <input
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-moroccan-gold focus:border-moroccan-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">تاريخ الانتهاء</label>
                    <input
                      id="expiryDate"
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-moroccan-gold focus:border-moroccan-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      id="cvv"
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      placeholder="123"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-moroccan-gold focus:border-moroccan-gold"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" className="w-full">
                تأكيد الدفع
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 