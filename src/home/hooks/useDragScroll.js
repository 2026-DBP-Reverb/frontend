import { useRef } from 'react';

export default function useDragScroll() {
  const dragState = useRef({
    isPointerDown: false,
    isDragging: false,
    didDrag: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handlePointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) {
      return;
    }

    dragState.current = {
      isPointerDown: true,
      isDragging: false,
      didDrag: false,
      startX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };
  };

  const handlePointerMove = (event) => {
    if (!dragState.current.isPointerDown) {
      return;
    }

    const distance = event.clientX - dragState.current.startX;

    if (!dragState.current.isDragging && Math.abs(distance) < 3) {
      return;
    }

    if (!dragState.current.isDragging) {
      dragState.current.isDragging = true;
      dragState.current.didDrag = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    event.currentTarget.scrollLeft = dragState.current.scrollLeft - distance;
  };

  const handlePointerEnd = (event) => {
    dragState.current.isPointerDown = false;
    dragState.current.isDragging = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClickCapture = (event) => {
    if (!dragState.current.didDrag) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragState.current.didDrag = false;
  };

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerEnd,
    onPointerCancel: handlePointerEnd,
    onClickCapture: handleClickCapture,
  };
}
