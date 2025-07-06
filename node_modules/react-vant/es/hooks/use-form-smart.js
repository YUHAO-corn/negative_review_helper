import { useCallback, useEffect, useRef, useState } from 'react';
import { isObject } from '../utils';
function isEmpty(val) {
  if (isObject(val)) {
    return JSON.stringify(val) === '{}';
  }
  return true;
}
export default function useFormSmart(option = {}) {
  const {
    value,
    sync
  } = option;
  const ref = useRef(null);
  const [once, setOnce] = useState(false);
  const set = useCallback(values => {
    var _a;
    (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.setFieldsValue(values);
  }, []);
  const get = useCallback(name => {
    var _a;
    return (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.getFieldValue(name);
  }, []);
  const submit = useCallback(() => {
    var _a;
    (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.submit();
  }, []);
  const clear = useCallback(() => {
    var _a;
    (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.resetFields();
  }, []);
  const getAll = useCallback(() => {
    var _a;
    return (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.getFieldsValue();
  }, []);
  useEffect(() => {
    if (!isEmpty(value)) {
      if (sync) {
        set(value);
      } else if (!once) {
        set(value);
        setOnce(true);
      }
    }
  }, [value]);
  const methods = {
    set,
    get,
    submit,
    clear,
    getAll
  };
  return [ref, methods];
}