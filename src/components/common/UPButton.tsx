import { CSSProperties } from 'react';

import { Button } from '@mantine/core';
import React from 'react';


export interface UPButtonProps {
  layout?: 'square' | 'text' | 'round' | 'roundMax'; // 기본값 square
  outlined?: boolean; // 외각선 여부 기본값 false
  bgcolor?: '' | 'gray' | 'lightgray' | 'darkgray' | null; // 기본값 yellow
  theme?: 'submit' | 'cancel' | 'default'; // 기본 버튼 구성
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xsmall_mo' | 'small_mo' | 'medium_mo' | 'large_mo' | null;
  bg?: string; // 배경 컬러 기본값 #ffffff
  width?: string; // 기본 사이즈를 사용하고 예외일 경우 width, height 를 사용한다.
  height?: string; // 기본 사이즈를 사용하고 예외일 경우 width, height 를 사용한다.
  fontSize?: string;
  fontColor?: string;
  buttonType?: 'submit' | 'button' | 'reset' | undefined;
  icon?: string;
  label: string;
  labelClass?: string;
  disabled?: boolean;
  onClick?: (value?: any) => void;
  style?: CSSProperties;
}

export const UPButton = ({
  layout,
  outlined,
  bg,
  bgcolor,
  size = 'medium',
  theme,
  width,
  height,
  fontSize,
  fontColor,
  icon,
  label,
  buttonType,
  onClick,
  disabled,
  style,
  labelClass,
  ...props
}: UPButtonProps) => {
  const styleObj = { ...style } as any;
  if (bg) {
    styleObj.backgroundColor = bg;
  }
  if (width) {
    styleObj.width = `${width}`;
    size = null;
  }
  if (height) {
    styleObj.height = `${height}`;
    size = null;
  }
  if (fontSize) {
    // TODO 별도로 사이즈를 지정해둘건지 여부에 따라 변경
    styleObj.fontSize = `${fontSize}rem`;
  }
  if (fontColor) {
    styleObj.color = fontColor;
  }
  return (
    <>
      <Button
        type={buttonType || 'button'}
        style={styleObj}
        onClick={() => (onClick ? onClick() : () => {})}
        disabled={disabled}
        {...props}
      >
        {icon && <i className={`${icon}`} />}
        <span>{label}</span>
      </Button>
    </>
  );
};
