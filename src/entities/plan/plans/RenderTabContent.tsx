import React from 'react';
import Greeting from '@/entities/plan/plans/Greeting';
import SubCategoryFilter from '@/entities/plan/plans/SubCategoryFilter';
//import PlanFilter from '@/components/plans/PlanFilter';
import RenderCommonContent from '@/entities/plan/plans/RenderCommonContent';
import { PlanDataWithCategory } from '@/shared/types/plans';
import { RegionOption, SubRegionOption } from '@/shared/types/reviewType';
import { SortOption } from '@/shared/types/reviewType';
import { motion, AnimatePresence } from 'motion/react';
import useHeaderHeight from '@/shared/hooks/useHeaderHeight';

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

interface RenderTabContentProps {
  category: string;
  plans: PlanDataWithCategory[];
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  selectedRegion: RegionOption | null;
  setSelectedRegion: React.Dispatch<React.SetStateAction<RegionOption | null>>;
  selectedSubRegion: SubRegionOption | null;
  setSelectedSubRegion: React.Dispatch<
    React.SetStateAction<SubRegionOption | null>
  >;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void; //
  selectedSubCategory: string | null;
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSort: SortOption | null;
  setSelectedSort: React.Dispatch<React.SetStateAction<SortOption | null>>;
}

const RenderTabContent: React.FC<RenderTabContentProps> = ({
  category,
  plans,
  selectedDate,
  setSelectedDate,
  selectedRegion,
  setSelectedRegion,
  selectedSubRegion,
  setSelectedSubRegion,
  selectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedSort,
  setSelectedSort,
}) => {
  const { headerHeight } = useHeaderHeight();

  return (
    <div className="md:w-full lg:w-full">
      {/* Greeting */}
      <Greeting />
      {/* SubCategoryFilter */}
      {category === '달램핏' && (
        <div
          className="sticky z-10 bg-white pb-2 pt-4"
          style={{ top: `${headerHeight}px` }}
        >
          <SubCategoryFilter
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSubCategory || 'all'}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariants}
          transition={{ duration: 0.3 }}
        >
          <RenderCommonContent
            plans={plans}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedSubRegion={selectedSubRegion}
            setSelectedSubRegion={setSelectedSubRegion}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RenderTabContent;
