import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

const CelebrationModal = ({ isOpen, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowConfetti(false), 10000); // Stop after 5s
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-md"
        >
          <h2 className="text-3xl font-bold text-red-600 mb-4">🎉 Boom! ₹150 Added</h2>
          <p className="text-gray-700 mb-6">You got ₹150 in your wallet. Use it on your first order!</p>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Start Shopping
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default CelebrationModal;
