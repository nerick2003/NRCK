import gsap from "gsap"
import { useCallback, useEffect, useRef } from "react"
import { PolaroidPhoto } from "./PolaroidPhoto"

const POLAROID_FINAL_ROTATE_DEG = -1.25

export type IntroOverlayProps = {
  theme: "light" | "dark"
  onComplete: () => void
}

export const IntroOverlay = ({ theme, onComplete }: IntroOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const polaroidWrapRef = useRef<HTMLDivElement>(null)
  const completedRef = useRef(false)

  const safeComplete = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const overlay = overlayRef.current
    const polaroidWrap = polaroidWrapRef.current
    if (!overlay || !polaroidWrap) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      gsap.set(overlay, { opacity: 1 })
      const tween = gsap.to(overlay, {
        opacity: 0,
        duration: 0.32,
        ease: "power2.out",
        onComplete: safeComplete,
      })
      return () => {
        tween.kill()
      }
    }

    const ctx = gsap.context(() => {
      gsap.set(overlay, { opacity: 1 })
      gsap.set(polaroidWrap, {
        y: "-48vh",
        scale: 1.42,
        rotation: 7.5,
        transformOrigin: "50% 50%",
        force3D: true,
      })

      const tl = gsap.timeline({
        defaults: { force3D: true },
        onComplete: safeComplete,
      })

      tl.to(polaroidWrap, {
        y: 0,
        scale: 1,
        rotation: POLAROID_FINAL_ROTATE_DEG,
        duration: 0.95,
        ease: "power4.out",
      })

      tl.to(
        polaroidWrap,
        {
          scaleY: 0.92,
          scaleX: 1.03,
          duration: 0.075,
          ease: "power2.in",
        },
        "-=0.05",
      )

      tl.to(polaroidWrap, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.42,
        ease: "elastic.out(1, 0.48)",
      })

      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.44,
          ease: "power2.inOut",
        },
        "+=0.1",
      )
    }, overlay)

    return () => {
      ctx.revert()
    }
  }, [safeComplete])

  const bgClass =
    theme === "light"
      ? "bg-[#f5f5f2]"
      : "bg-[#050505]"

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[10050] flex items-center justify-center ${bgClass} pointer-events-auto touch-none`}
      aria-hidden="true"
    >
      <div
        ref={polaroidWrapRef}
        className="inline-block origin-center will-change-transform"
      >
        <PolaroidPhoto
          year={new Date().getFullYear()}
          baseRotateDeg={0}
          disableEntranceAnimation
          innerMaxWidthClass="max-w-[min(78vw,280px)]"
          frameClassName="shadow-[0_32px_72px_rgba(0,0,0,0.5)]"
          imgAlt="Portrait"
        />
      </div>
    </div>
  )
}
