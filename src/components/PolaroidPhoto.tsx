import gsap from "gsap"
import { useEffect, useRef } from "react"
import photo from "../assets/photo.png"

const INTRO_DROP_Y = -52
const INTRO_SCALE_FROM = 1.09
const INTRO_ROTATION_EXTRA_DEG = 5
const DROP_DURATION = 1.05
const SQUASH_DURATION = 0.08
const BOUNCE_DURATION = 0.55

export type PolaroidPhotoProps = {
  year?: number
  /** Extra classes on the white frame (padding/shadow) */
  frameClassName?: string
  /** Max width on the inner image column */
  innerMaxWidthClass?: string
  /** Static tilt in degrees — use 0 when parent applies rotation (e.g. hero GSAP) */
  baseRotateDeg?: number
  imgAlt?: string
  /** When true, skip the built-in drop/squash entrance (e.g. parent drives GSAP) */
  disableEntranceAnimation?: boolean
}

export const PolaroidPhoto = ({
  year = new Date().getFullYear(),
  frameClassName = "",
  innerMaxWidthClass = "max-w-[min(70vw,260px)]",
  baseRotateDeg = -1.25,
  imgAlt = "",
  disableEntranceAnimation = false,
}: PolaroidPhotoProps) => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      if (disableEntranceAnimation) {
        gsap.set(el, {
          rotation: baseRotateDeg,
          transformOrigin: "50% 50%",
          force3D: true,
        })
        return
      }

      if (reduced) {
        gsap.set(el, {
          rotation: baseRotateDeg,
          transformOrigin: "50% 50%",
          force3D: true,
        })
        return
      }

      gsap.set(el, {
        y: INTRO_DROP_Y,
        scale: INTRO_SCALE_FROM,
        rotation: baseRotateDeg + INTRO_ROTATION_EXTRA_DEG,
        transformOrigin: "50% 50%",
        force3D: true,
      })

      const tl = gsap.timeline({ defaults: { force3D: true } })

      tl.to(el, {
        y: 0,
        scale: 1,
        rotation: baseRotateDeg,
        duration: DROP_DURATION,
        ease: "power4.out",
      })

      tl.to(
        el,
        {
          scaleY: 0.93,
          scaleX: 1.025,
          duration: SQUASH_DURATION,
          ease: "power2.in",
        },
        "-=0.06",
      )

      tl.to(el, {
        scaleY: 1,
        scaleX: 1,
        duration: BOUNCE_DURATION,
        ease: "elastic.out(1, 0.45)",
      })
    }, el)

    return () => {
      ctx.revert()
    }
  }, [baseRotateDeg, disableEntranceAnimation])

  return (
    <div ref={rootRef} className="inline-block origin-center will-change-transform">
      <div
        className={`contact-polaroid-frame relative p-2.5 pb-11 shadow-[0_28px_60px_rgba(0,0,0,0.45)] ring-1 ring-neutral-900/15 [transform:translateZ(0)] ${frameClassName}`}
      >
        <div className="relative overflow-hidden bg-[#ffffff]">
          <div className={`relative mx-auto w-[220px] ${innerMaxWidthClass} bg-[#ffffff]`}>
            <img
              src={photo}
              alt={imgAlt}
              width={260}
              height={340}
              draggable={false}
              className="relative z-0 block h-auto w-full select-none object-cover object-top mix-blend-normal"
            />
          </div>
        </div>
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 text-[11px] font-medium text-neutral-500">
          @{year}
        </span>
      </div>
    </div>
  )
}
