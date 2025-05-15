
import React from 'react';
import Image from 'next/image';

interface IconProps {
  iconType: string;
  customIcon?: {
    url: string;
  };
  label?: string;
}

// Map of icon types to their display name
const iconLabels: Record<string, string> = {
  'pir': 'PIR',
  'sd-card': 'SD Card',
  'h265': 'H.265+',
  'audio': 'Audio',
  'wdr': 'WDR',
  'vehicle': 'Vehicle',
  '4k': '4K',
  'night-vision': 'Night Vision',
  'ai': 'AI',
  'waterproof': 'Water Resistant'
};

export default function ProductFeatureIcons({ icons }: { icons: IconProps[] }) {
  if (!icons || icons.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {icons.map((icon, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="h-12 w-12 mb-1">
            {icon.customIcon?.url ? (
              // Use custom icon if available
              <Image 
                src={icon.customIcon.url}
                alt={icon.label || iconLabels[icon.iconType] || icon.iconType}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            ) : (
              // Otherwise use the default icon based on type
              <img 
                src={`/icons/${icon.iconType}.svg`} 
                alt={icon.label || iconLabels[icon.iconType] || icon.iconType} 
                className="h-full w-full"
              />
            )}
          </div>
          <span className="text-xs text-center">
            {icon.label || iconLabels[icon.iconType] || icon.iconType}
          </span>
        </div>
      ))}
    </div>
  );
}