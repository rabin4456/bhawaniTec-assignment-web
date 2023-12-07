import { useEffect, useState } from "react";

const Toast = ({ message, show }: { message: string; show: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
    if (show) {
      setIsVisible(true);
    }
  }, [isVisible, show]);

  if (isVisible) {
    return (
      <div className='toastContainer'>
        <p className='toastIcon'>✓</p>
        <p className='toastText'>{message}</p>
      </div>
    );
  }
};

export default Toast;
