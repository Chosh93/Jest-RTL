import { Fragment } from 'react';

import { Group, Indicator } from '@mantine/core';
import { useSetState } from '@mantine/hooks';

import { UPSelect, UPSelectProps } from './UPSelect';
import React from 'react';
import { UPInput } from './UPInput';
import { UPButton } from './UPButton';

export interface ISearchBoardFilterGroup {
  key: string;
  type: string | 'date' | 'select' | 'tab' | 'chip';
  width?: string;
  className?: string;
  label?: string;
  collapse?: boolean;
  selectItems?: UPSelectProps['data'];
  defaultValue?: any;
  options?: any;
}
export interface UPSearchBoardProps {
  isMobile?: boolean;
  // 필터조건
  filterGroups?: ISearchBoardFilterGroup[];
  // input 검색영역 표기 여부
  hideInput?: boolean;
  // submitButton 표기 여부, 상세검색에 표기될경우 해당 값을 true 로 설정해야한다.
  hideButton?: boolean;
  // 필터 change 이벤트
  onFilterChange?: (key: string, value: any) => void;
  /** 필터 change 이벤트가 발생 했을떄 search 동작을 할건지 유무 */
  isFilterChangeSearch?: boolean;
  defaultSearchValue?: any;
  // 검색 버튼 이벤트
  onSearch: (value: any) => void;
}

export const UPSearchBoard = ({
  isMobile,
  hideInput,
  hideButton,
  filterGroups = [],
  onSearch,
  defaultSearchValue,
  onFilterChange,
  isFilterChangeSearch,
}: UPSearchBoardProps) => {
  const [state, setState] = useSetState<{
    [key: string]: any;
  }>(defaultSearchValue ? { text: defaultSearchValue } : {});

  const onFilterPropsChange = (key: string, value: string) => {
    // if (isMobile && key === 'categoryCode') onFilterChange({ ...state, [key]: value });
    if (isFilterChangeSearch) onSearch({ ...state, [key]: value });
    if (onFilterChange) {
      onFilterChange(key, value);
    }
    setState({ [key]: value });
  };

  const selectComponent = (filter: ISearchBoardFilterGroup) => (
    <UPSelect
      data={filter.selectItems!}
      label={filter.label}
      width={filter.width}
      value={state[filter.key]}
      onChange={(value) => onFilterPropsChange(filter.key, value)}
      isMobile={isMobile}
      defaultValue={filter.defaultValue ? filter.defaultValue : filter.selectItems && filter.selectItems[0]?.value}
    />
  );

  const onKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      onSearch(state);
    }
  };

  const inputComponent = (
    <div>
      <UPInput
        type="normal"
        placeholder="검색어를 입력해 주세요."
        value={state.text}
        isMobile={isMobile}
        onChange={(value) => onFilterPropsChange('text', `${value}`)}
        onKeyDown={onKeyDown}
      />
    </div>
  );

  const submitButtonComponent = !isMobile && (
    <UPButton
      label="검색"
      bgcolor="darkgray"
      size={!isMobile ? 'medium' : 'medium_mo'}
      onClick={() => onSearch(state)}
    />
  );


  return (
    <div>
      <Group gap={5}>
        {filterGroups.map((filter, index) => (
          <Fragment key={`searchFilterGroup${filter.key}${index}`}>
            {filter.type === 'select' && selectComponent(filter)}
            </Fragment>
        ))}
        {!hideInput && inputComponent}
        {!hideButton && submitButtonComponent}
      </Group>
    </div>
  );
};
