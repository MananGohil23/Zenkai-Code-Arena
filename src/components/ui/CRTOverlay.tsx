/**
 * Decorative CRT layer: scanlines, vignette and a very subtle flicker.
 * Fixed above all content but `pointer-events: none`, and its flicker is
 * disabled under `prefers-reduced-motion`.
 */
export function CRTOverlay() {
  return (
    <div className="crt-overlay crt-flicker" aria-hidden="true">
      <div className="crt-scanlines" />
      <div className="crt-vignette" />
    </div>
  );
}
