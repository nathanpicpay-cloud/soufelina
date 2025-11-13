import React, { useRef } from 'react';

interface PriceRangeProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export const PriceRange: React.FC<PriceRangeProps> = ({ min, max, value, onChange }) => {
  const rangeRef = useRef<HTMLInputElement>(null);
  
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
  }

  const getBackgroundSize = () => {
    if (!rangeRef.current) return { backgroundSize: '0% 100%' };
    const percentage = ((value - min) * 100) / (max - min);
    return { backgroundSize: `${percentage}% 100%` };
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-dark/80">Faixa de preço:</span>
            <span className="font-semibold text-sm">
                Até R$ {value.toFixed(2).replace('.', ',')}
            </span>
        </div>
      <input
        ref={rangeRef}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleRangeChange}
        style={getBackgroundSize()}
        className="w-full h-2 bg-gradient-to-r from-primary to-primary bg-no-repeat rounded-lg appearance-none cursor-pointer bg-gray-200"
      />
       <div className="flex justify-between items-center mt-1 text-xs text-text-dark/60">
            <span>R${min}</span>
            <span>R${max}</span>
        </div>
    </div>
  );
};