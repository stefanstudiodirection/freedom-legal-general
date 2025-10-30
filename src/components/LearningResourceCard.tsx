import React from 'react';

interface LearningResourceCardProps {
  title: string;
  image: string;
  onClick?: () => void;
}

export const LearningResourceCard: React.FC<LearningResourceCardProps> = ({
  title,
  image,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col min-w-[160px] w-[160px] hover:opacity-90 transition-opacity"
    >
      <img
        src={image}
        alt={title}
        className="aspect-video w-full object-cover rounded-lg"
      />
      <h3 className="text-white text-lg leading-snug pt-3 text-left">
        {title}
      </h3>
    </button>
  );
};
