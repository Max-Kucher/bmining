import { useCallback, useEffect, useState } from 'react';
import { usePathname } from '@/hooks/use-pathname';

export const useMobileNav = () => {
  // const pathname = usePathname();
  const pathname = '';
  const [open, setOpen] = useState(false);


  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    handleOpen,
    handleClose,
    open
  };
};
