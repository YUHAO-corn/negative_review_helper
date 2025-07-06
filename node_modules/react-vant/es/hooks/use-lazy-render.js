import { useState, useEffect } from 'react';
function useLazyRender(show) {
  const [inited, setInited] = useState(false);
  useEffect(() => {
    if (show) {
      setInited(show);
    }
  }, [show]);
  return render => () => inited ? render() : null;
}
export default useLazyRender;