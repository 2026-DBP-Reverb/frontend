import { useRef } from 'react';

export default function useDragScroll() {
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handlePointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };
  };

  const handlePointerMove = (event) => {
    if (!dragState.current.isDragging) {
      return;
    }

    const distance = event.clientX - dragState.current.startX;
    event.currentTarget.scrollLeft = dragState.current.scrollLeft - distance;
  };

  const handlePointerEnd = (event) => {
    dragState.current.isDragging = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerEnd,
    onPointerCancel: handlePointerEnd,
  };
}
