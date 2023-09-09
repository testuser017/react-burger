// https://codesandbox.io/p/sandbox/immutable-haze-pgrdds
// https://app.pachca.com/chats?thread_id=1682952

import { useState, useCallback } from 'react';

function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState(false);
  const [ isValid, setIsValid ] = useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

export default useFormAndValidation;
