import { PlanDataWithCategory } from '@/components/types/plans';
import { RegionOption, SubRegionOption } from '@/components/types/reviewType';

interface FilterArgs {
  plans: PlanDataWithCategory[];
  selectedDate: string | null;
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  selectedCategory: string;
  selectedSubCategory: string | null;
}

export const filterPlans = ({
  plans,
  selectedDate,
  selectedRegion,
  selectedSubRegion,
  selectedCategory,
  selectedSubCategory,
}: FilterArgs) => {
  const actualCategory =
    selectedCategory === '달램핏' && selectedSubCategory
      ? selectedSubCategory
      : selectedCategory;

  return plans.filter((p) => {
    const planDate = new Date(p.dateTime).toLocaleDateString();
    const dateCondition = !selectedDate || planDate === selectedDate;
    const categoryCondition = p.category === actualCategory;
    const provinceCondition =
      !selectedRegion || selectedRegion.id === 0
        ? true
        : p.province === selectedRegion.name;
    const districtCondition =
      !selectedSubRegion || selectedSubRegion.id === 0
        ? true
        : p.district === selectedSubRegion.name;
    return (
      dateCondition &&
      categoryCondition &&
      provinceCondition &&
      districtCondition
    );
  });
};
