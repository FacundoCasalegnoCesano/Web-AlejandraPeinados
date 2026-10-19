"use client";

// Interaction reference, reimplemented with native <dialog>: Kokonut UI Lightbox Grid (MIT).
// https://kokonutui.com/docs/cards/lightbox-grid

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type TouchEvent,
} from "react";
import type { GalleryImage } from "@/content/salon";
import styles from "./work-gallery.module.css";

type WorkGalleryProps = { images: GalleryImage[] };

export default function WorkGallery({ images }: WorkGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isOpen = activeIndex !== null;
  const activeImage = activeIndex === null ? null : images[activeIndex] ?? null;
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() =>
      closeButtonRef.current?.focus(),
    );

    return () => {
      window.cancelAnimationFrame(focusFrame);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => openerRef.current?.focus());
    };
  }, [isOpen]);

  if (images.length === 0) {
    return (
      <p className={styles.emptyState} role="status">
        Próximamente vas a poder ver trabajos de Alejandra.
      </p>
    );
  }

  function closeViewer() {
    setActiveIndex(null);
  }

  function showPrevious() {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeViewer();
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX === null || endX === undefined) return;

    const distance = endX - startX;
    if (distance > 56) showPrevious();
    if (distance < -56) showNext();
  }

  return (
    <>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <div className={styles.gridItem} key={image.id}>
            <motion.button
              className={styles.tile}
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
              aria-label={`Ver ${image.title}${image.sample ? ", imagen de muestra" : ""}`}
              aria-haspopup="dialog"
            >
              <motion.span
                className={styles.imageFrame}
                layoutId={`work-${image.id}`}
                transition={transition}
              >
                <Image
                  className={styles.image}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 680px) 46vw, (max-width: 1080px) 30vw, 24vw"
                  unoptimized
                />
                {image.sample && (
                  <span className={styles.sampleBadge}>Imagen de muestra</span>
                )}
                <span className={styles.openHint} aria-hidden="true">
                  Ver imagen <span>↗</span>
                </span>
              </motion.span>
              <span className={styles.caption}>
                <span className={styles.title}>{image.title}</span>
                <span className={styles.category}>{image.category}</span>
              </span>
            </motion.button>
          </div>
        ))}
      </div>

      <dialog
        className={styles.dialog}
        ref={dialogRef}
        aria-label={activeImage ? `Imagen ampliada: ${activeImage.title}` : "Imagen ampliada"}
        onClick={handleBackdropClick}
        onCancel={(event) => {
          event.preventDefault();
          closeViewer();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPrevious();
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            showNext();
          }
        }}
      >
        {activeImage && (
          <div className={styles.viewer}>
            <div
              className={styles.viewerImageFrame}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  className={styles.viewerImageMotion}
                  key={activeImage.id}
                  layoutId={`work-${activeImage.id}`}
                  initial={prefersReducedMotion ? false : { opacity: 0.92, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0.92, scale: 0.99 }}
                  transition={transition}
                >
                  <Image
                    className={styles.viewerImage}
                    src={activeImage.src}
                    alt={activeImage.alt}
                    width={activeImage.width}
                    height={activeImage.height}
                    sizes="(max-width: 720px) 94vw, 67vw"
                    priority
                    unoptimized
                  />
                  {activeImage.sample && (
                    <span className={styles.viewerSample}>Imagen de muestra</span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={styles.viewerDetails}>
              <div className={styles.viewerTopline}>
                <span
                  className={styles.viewerCount}
                  role="status"
                  aria-live="polite"
                  aria-label={`Imagen ${activeIndex! + 1} de ${images.length}: ${activeImage.title}`}
                >
                  {activeIndex! + 1} / {images.length}
                </span>
                <button
                  className={styles.closeButton}
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeViewer}
                  aria-label="Cerrar imagen ampliada"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className={styles.viewerCopy}>
                <p className={styles.viewerEyebrow}>{activeImage.category}</p>
                <h3 className={styles.viewerTitle}>{activeImage.title}</h3>
                {activeImage.sample && (
                  <p className={styles.viewerNote}>
                    Fotografía ilustrativa. No representa un trabajo de
                    Alejandra.
                  </p>
                )}
                {activeImage.credit && (
                  <a
                    className={styles.creditLink}
                    href={activeImage.credit.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Foto: {activeImage.credit.name}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                )}
              </div>
              <div className={styles.viewerControls}>
                <button
                  className={styles.navButton}
                  type="button"
                  onClick={showPrevious}
                  aria-label="Ver imagen anterior"
                  disabled={images.length < 2}
                >
                  <span aria-hidden="true">←</span>
                  <span>Anterior</span>
                </button>
                <button
                  className={styles.navButton}
                  type="button"
                  onClick={showNext}
                  aria-label="Ver imagen siguiente"
                  disabled={images.length < 2}
                >
                  <span>Siguiente</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
