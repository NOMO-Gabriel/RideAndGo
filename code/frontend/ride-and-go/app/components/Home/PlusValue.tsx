'use client'

import React from 'react';

const PlusValue: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {['Rapidité', 'Plus vague', 'Icone'].map((feature, idx) => (
          <div key={idx} className="text-center p-8 bg-white shadow-lg rounded-lg">
            <div className="bg-bleu-nuit text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center">
              {/* Remplace avec une icône */}
              <span>{idx + 1}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-bleu-nuit">{feature}</h3>
            <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlusValue;

