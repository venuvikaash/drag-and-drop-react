import { Maximize2 } from 'lucide-react';

export default function SmoothCurveChart() {
  // Sample data for the overview
  const metrics = [
    { label: 'Sent', value: 673, color: '#6B9080' },
    { label: 'Delivered', value: 486, color: '#5F8575' },
    { label: 'Read', value: 183, color: '#54796A' },
    { label: 'Clicks', value: 72, color: '#416D60' },
    { label: 'Purchases', value: 45, color: '#2E6052' }
  ];

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow !h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Revenue Overview</h2>
        <button className="text-gray-500">
          <Maximize2 size={16} />
        </button>
      </div>

      <div className="flex w-full">
        {metrics.map((metric, index) => (
          <div key={index} className="flex-1 text-center border-r last:border-r-0 px-1">
            <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
            <div className="font-bold text-xl">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 h-24 relative">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {metrics.map((metric, index, array) => {
            if (index === array.length - 1) return null;
            
            const maxValue = Math.max(...metrics.map(m => m.value));
            const width = 100 / metrics.length;
            const startX = width * index;
            const endX = width * (index + 1);
            const startY = 100 - (metrics[index].value / maxValue * 100);
            const endY = 100 - (metrics[index + 1].value / maxValue * 100);
            const controlX = startX + (width * 0.5);
            
            return (
              <path 
                key={index}
                d={`M${startX},100 L${startX},${startY} C${controlX},${startY} ${controlX},${endY} ${endX},${endY} L${endX},100 Z`}
                fill={metric.color}
              />
            );
          })}
          
          {/* Last section */}
          {metrics.length > 0 && (
            <path
              d={`M${100 - 100/metrics.length},100 L${100 - 100/metrics.length},${100 - metrics[metrics.length-1].value / Math.max(...metrics.map(m => m.value)) * 100} L100,${100 - metrics[metrics.length-1].value / Math.max(...metrics.map(m => m.value)) * 100} L100,100 Z`}
              fill={metrics[metrics.length-1].color}
            />
          )}
        </svg>
      </div>
    </div>
  );
}

