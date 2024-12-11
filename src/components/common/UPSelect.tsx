import { useEffect, useState } from 'react';

import { Select } from '@mantine/core';
import React from 'react';


export interface UPSelectProps {
  classProps?: string;
  layout?: 'square' | 'round';
  outlined?: boolean;
  size?: 'small' | 'medium' | 'large' | null;
  width?: string;
  height?: string;
  label?: string;
  onChange?: (value: string) => void;
  isMobile?: boolean;
  data: UPSelectItemProps[];
  placeholder?: string;
  value?: string;
  searchValue?: string;
  defaultValue?: string;
  variant?: 'default' | 'filled' | 'unstyled';
  style?: React.CSSProperties;
  icon?: React.ReactElement;
  allowDeselect?: boolean;
  readOnly?: boolean;
}

export interface UPSelectItemProps {
  label: string;
  value: string;
}


export const UPSelect = ({
  classProps,
  layout = 'square',
  outlined,
  size,
  width,
  height,
  label,
  isMobile = false,
  data,
  onChange,
  placeholder,
  defaultValue = '',
  variant = 'default',
  icon = undefined,
  allowDeselect = false,
  ...props
}: UPSelectProps) => {
  const styleObj = {} as any;
  if (width) {
    styleObj.width = `${width}`;
    size = null;
  }
  if (height) {
    styleObj.height = `${height}`;
    size = null;
  }

  const [selectValue, setSelectValue] = useState<string | undefined | null>(defaultValue);

  useEffect(() => {
    setTimeout(() => setSelectValue(defaultValue ?? ''), 100);
  }, [defaultValue]);

  const selectedValue = (value: string | null) => {
    setSelectValue(value);
    if (onChange) {
      onChange(value as string);
    }
  };

  return (
    <div>
      <Select
        // searchable
        data={data}
        placeholder={placeholder}
        withCheckIcon={false}
        defaultValue={selectValue}
        value={selectValue}
        variant={variant}
        // * 중복값 허용
        allowDeselect={allowDeselect}
        style={styleObj}
        onChange={selectedValue}
        {...props}
        rightSection={icon}
      />
    </div>
  );
};
