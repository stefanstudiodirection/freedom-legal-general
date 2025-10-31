import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LearningResourceCard } from '@/components/LearningResourceCard';
import { BottomNavigation } from '@/components/BottomNavigation';

const mockArticles = [
  {
    id: '1',
    title: 'Why £1 Today Could Mean £1.60 Less Tomorrow',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200'
  },
  {
    id: '2',
    title: '5 Questions to Ask Before Accessing Your Pension Early',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600'
  },
  {
    id: '3',
    title: 'The Secret to Growing Your Retirement Fund',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600'
  },
  {
    id: '4',
    title: 'Should I Use My Pension for the...',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600'
  }
];


const Learn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 hover:opacity-70 transition-opacity"
        aria-label="Go back"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h1 className="text-2xl font-semibold mb-4">Learning Resources</h1>
      
      <div className="grid grid-cols-2 gap-4 pb-4">
        {mockArticles.map((article) => (
          <LearningResourceCard
            key={article.id}
            title={article.title}
            image={article.image}
            onClick={() => navigate(`/learn/${article.id}`)}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Learn;
