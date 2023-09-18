// https://github.com/Yandex-Practicum/react-developer-burger-ui-components/blob/main/src/ui/password-input.tsx

import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

interface IPasswordInputMod extends Omit<React.HTMLProps<HTMLInputElement>, 'size' | 'type' | 'ref'> {
  value: string;
  placeholder?: string;
  size?: 'default' | 'small';
  icon?: 'HideIcon' | 'ShowIcon' | 'EditIcon';
  extraClass?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  error?: boolean;
};

export const PasswordInputMod: React.FC<IPasswordInputMod> = PasswordInput;
