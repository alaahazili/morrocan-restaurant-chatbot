import { motion } from 'framer-motion';
import { useCart } from '@/store/cartStore';
import { Button } from './Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

const cartVariants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
};

export const Cart = ({ onClose }: { onClose: () => void }) => {
  const { 
    items, 
    addItem, 
    removeItem, 
    clearCart, 
    subtotal 
  } = useCart();

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <motion.div
        variants={cartVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: 'spring', damping: 30 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Order</h2>
            <button 
              onClick={onClose}
              className="p-1"
              aria-label="Close cart"  // Added accessible label
              title="Close cart"       // Added tooltip for additional context
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
              <span className="sr-only">Close cart</span>  // Screen reader only text
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <p className="mb-4">Your cart is empty</p>
                <Button onClick={onClose}>Browse Menu</Button>
              </div>
            ) : (
              <ul className="divide-y">
                {items.map(item => (
                  <li key={item.id} className="py-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-moroccan-gold">
                          {item.price} DH × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => addItem(item)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Subtotal:</span>
                <span className="font-bold">{subtotal()} DH</span>
              </div>
              <div className="space-y-2">
                <Button 
                  onClick={clearCart}
                  variant="outline"
                  className="w-full"
                >
                  Clear Cart
                </Button>
                <Button className="w-full bg-moroccan-gold hover:bg-moroccan-gold/90">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};