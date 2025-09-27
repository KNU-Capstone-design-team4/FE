import React from "react";

interface DocumentCardProps {
  title?: string;
  date?: string;
  imgSrc?: string;
  onClick?: () => void;
  isAddButton?: boolean;
  small?: boolean;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ title, date, imgSrc, onClick, isAddButton, small }) => {
  // 아주 작은 카드용 크기
  const cardSize = small ? "w-16 h-20" : "w-48 h-60";
  const textSize = small ? "text-[8px]" : "text-sm";
  const dateSize = small ? "text-[6px]" : "text-xs";

  return (
    <div
      className={`flex flex-col items-center justify-center ${cardSize} bg-black text-white rounded-md shadow-md cursor-pointer overflow-hidden`}
      onClick={onClick}
    >
      {isAddButton ? (
        <span className="text-2xl font-bold">+</span>
      ) : (
        <>
          {imgSrc && <img src={imgSrc} alt={title} className="w-3/4 h-2/3 object-contain" />}
          <div className="mt-1 flex flex-col items-center text-center">
            {title && <span className={`${textSize} font-semibold`}>{title}</span>}
            {date && <span className={`${dateSize} text-gray-300`}>{date}</span>}
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentCard;
