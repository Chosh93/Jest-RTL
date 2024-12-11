import React from "react";
import { UPSearchBoard } from "../../common/UPSearchBoard";

export interface UPHomeMainProps {
    isMobile?: boolean;
    categories?: string[];
    totalCnt?: number;
    page?: number;
    onRowClick: ({ index }: any) => void;
    onFilterChange?: (key: string, value: string) => void;
    onSearchFilter: (search: UPHomeMainFilterState) => void;
}

export interface UPHomeMainFilterState {
    categoryCode: string;
    searchTarget: 'ALL' | 'MOBILE' | 'DESKTOP';
    text: string;
}

const UPHomeMain = ({isMobile,
    categories,
    totalCnt,
    page,
    onRowClick,
    onFilterChange,
    onSearchFilter,}: UPHomeMainProps) => {
    const filterGroups = [
        {
          key: 'searchTarget',
          width: '6.3571rem',
          className: '_sel',
          type: 'select',
          selectItems: [
            { value: 'ALL', label: '전체' },
            { value: 'MOBILE', label: '모바일' },
            { value: 'DESKTOP', label: 'PC' },
          ],
          defaultValue: 'ALL',
        },
    ];

    const onSearch = (search: any) => {
    const { categoryCode } = search;
    onSearchFilter({
        ...search,
        categoryCode: categoryCode || 'NOTICE',
        page: 1,
    });
    };

    return (
        <UPSearchBoard
            isMobile={false}
            filterGroups={filterGroups}
            onSearch={onSearch}
            onFilterChange={onFilterChange}
        />
    );
}

export default UPHomeMain;