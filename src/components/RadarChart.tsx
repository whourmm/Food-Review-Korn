import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { ReviewCategory } from '@/interface';

ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  categories: ReviewCategory[];
  imageUrl?: string;
}

export function RadarChart({ categories, imageUrl }: RadarChartProps) {
  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 font-medium">Add categories to see the radar chart</p>
      </div>
    );
  }

  const data = {
    labels: categories.map(c => c.name),
    datasets: [
      {
        label: 'Review Scores',
        data: categories.map(c => c.score),
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124, 58, 237, 0.15)',
        borderWidth: 2.5,
        pointBackgroundColor: '#7c3aed',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.3,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 13,
            weight: 500,
          },
          color: '#374151',
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 13, weight: 600 },
        bodyFont: { size: 12 },
        borderColor: '#e5e7eb',
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
          },
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        },
        pointLabels: {
          font: {
            size: 13,
            weight: 600,
          },
          color: '#1f2937',
          padding: 8,
        },
      },
    },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Radar data={data} options={options} />
      
    </div>
  );
}
