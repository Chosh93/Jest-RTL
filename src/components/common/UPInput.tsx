import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, Ref, forwardRef, useEffect, useState } from 'react';

import { Group, NumberInput, PasswordInput, Radio, TextInput } from '@mantine/core';
import React from 'react';
import { UPButtonProps } from './UPButton';

export interface UPInputProps {
  /**
   * default => normal
   * 'nomal': 기본
   * 'button': 추가 버튼
   * 'password': 비밀번호
   * 'verification': 본인인증
   * 'timer' : 타이머
   * 'icon': 아이콘 */
  type?: 'normal' | 'button' | 'password' | 'verification' | 'timer' | 'number' | 'phoneNum' | 'moSearchInput';
  /** type button일 경우 label  */
  buttonLabel?: string;
  /** input value  */
  value?: string | number;
  /** input value change */
  onChange?: (value: string | number) => void;
  /** 버튼 클릭 이벤트 */
  onClick?: () => void;
  /** 본인인증 m:남자, w:여자 */
  radioValue?: 'm' | 'w';
  /** placeholder */
  placeholder?: string;
  /** 모바일 유무 */
  isMobile?: boolean;
  /** 타이머 시작 유무 */
  startTimer?: boolean;
  /** rightSection */
  rightSection?: ReactNode;
  /** leftSection */
  leftSection?: ReactNode;
  /** 읽기전용 */
  readOnly?: boolean;
  buttonAttribute?: UPButtonProps;
  /** 최대 글자수 제한 */
  maxLength?: number;
  /** 최소 글자수 제한 */
  minLength?: number;
  onInputClick?: () => void | undefined;
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  /** 최대 입력 가능한 숫자 */
  maxNumber?: number;
  /** 최소 입력 가능한 숫자 */
  minNumber?: number;
  allowLeadingZeros?: boolean;
  allowNegative?: boolean;
  inputRef?: Ref<HTMLInputElement>;
}

export const UPInput = forwardRef(
  (
    {
      type = 'normal',
      buttonLabel = '',
      value = '',
      onChange,
      onClick,
      radioValue = 'm',
      placeholder,
      isMobile,
      startTimer = false,
      buttonAttribute,
      onInputClick,
      onKeyDown,
      onFocus,
      minNumber,
      maxNumber,
      allowLeadingZeros = true,
      allowNegative = true,
      ...props
    }: UPInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const [inputValue, setInputValue] = useState<string | number>('');


    const onChangeValue = (_value: string | number) => {
      setInputValue(_value);
      return onChange && onChange(_value);
    };

    /** normal 기본 */
    const normalInput = (
      <>
        <TextInput
          value={inputValue}
          onChange={(e) => onChangeValue(e.target.value)}
          placeholder={placeholder}
          onClick={(e) => {
            if (!onInputClick) return false;
            e.currentTarget.blur();
            return onInputClick && onInputClick();
          }}
          onFocus={(e) => {
            if (onFocus) {
              onFocus(e);
              return false;
            }
            if (!onInputClick) return false;
            e.currentTarget.blur();
            return onInputClick && onInputClick();
          }}
          onKeyDown={onKeyDown}
          ref={ref}
          {...props}
        />
      </>
    );

    /** number 기본 */
    const numberInput = (
      <>
        <NumberInput
          value={inputValue}
          hideControls
          {...props}
          ref={ref}
          min={minNumber}
          max={maxNumber}
          onChange={onChangeValue}
          placeholder={placeholder}
          thousandSeparator=","
          allowLeadingZeros={allowLeadingZeros}
          allowNegative={allowNegative}
          onClick={(e) => {
            if (!onInputClick) return false;
            e.currentTarget.blur();
            return onInputClick && onInputClick();
          }}
        />
      </>
    );

    /** Dom 분기 */
    const renderDom = () => {
      switch (type) {
        case 'normal':
          return normalInput;
        case 'number':
          return numberInput;
        default:
          return <></>;
      }
    };

    useEffect(() => {
      setInputValue((prev) => value);
    }, [value]);

    useEffect(() => {
      setInputValue((prev) => value);
    }, []);

    return (
      <div>
        <Group>
          {renderDom()}
        </Group>
      </div>
    );
  },
);
