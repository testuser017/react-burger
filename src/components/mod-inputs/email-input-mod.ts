// https://github.com/Yandex-Practicum/react-developer-burger-ui-components/blob/main/src/ui/email-input.tsx

import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

interface IEmailInputMod extends Omit<React.HTMLProps<HTMLInputElement>, 'size' | 'type' | 'ref'> {
  value: string;
  size?: 'default' | 'small';
  placeholder?: string;
  isIcon?: boolean;
  extraClass?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  error?: boolean;
};

export const EmailInputMod: React.FC<IEmailInputMod> = EmailInput;
