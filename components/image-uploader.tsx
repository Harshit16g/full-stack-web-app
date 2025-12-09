"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { uploadImage } from "@/app/actions/upload"
import { useToast } from "@/hooks/use-toast"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  aspectRatio?: number
}

export function ImageUploader({ value, onChange, aspectRatio = 16 / 9 }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [showCropper, setShowCropper] = useState(false)
  const [uploading, setUploading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const cropBoxRef = useRef(cropBox) // Keep ref synced for handlers
  const draggingRef = useRef<{ startX: number; startY: number; orig: typeof cropBox } | null>(null)
  const { toast } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
        setShowCropper(true)
      }
      reader.readAsDataURL(selected)
    }
  }

  // Keep cropBoxRef synced with cropBox state
  useEffect(() => {
    cropBoxRef.current = cropBox
  }, [cropBox])

  const initializeCropBox = (img: HTMLImageElement) => {
    // Get displayed size
    const rect = img.getBoundingClientRect()
    const dispW = rect.width || img.width || 400
    const dispH = rect.height || img.height || 300

    console.log("Image dimensions:", dispW, dispH, "Aspect ratio:", aspectRatio)

    // Calculate crop dimensions that fit within the image
    let cw: number, ch: number

    if (dispW / dispH > aspectRatio) {
      // Constrain by height
      ch = Math.max(100, dispH * 0.7) // Use 70% of displayed height, min 100px
      cw = ch * aspectRatio
    } else {
      // Constrain by width
      cw = Math.max(100, dispW * 0.7) // Use 70% of displayed width, min 100px
      ch = cw / aspectRatio
    }

    // Center the crop box
    const x = Math.max(0, (dispW - cw) / 2)
    const y = Math.max(0, (dispH - ch) / 2)

    const newBox = {
      x: Math.round(x),
      y: Math.round(y),
      width: Math.round(cw),
      height: Math.round(ch),
    }

    console.log("Crop box:", newBox)

    setCropBox(newBox)
    cropBoxRef.current = newBox
  }

  const handleCropConfirm = async () => {
    if (!canvasRef.current || !imgRef.current || !file) return

    const canvas = canvasRef.current
    const img = imgRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Dynamic dimensions based on aspect ratio
    const targetWidth = aspectRatio === 1 ? 400 : 450
    const targetHeight = aspectRatio === 1 ? 400 : 350

    canvas.width = targetWidth
    canvas.height = targetHeight

    // Calculate the scale between displayed image and natural image
    const rect = img.getBoundingClientRect()
    const dispW = rect.width
    const dispH = rect.height

    const scaleX = img.naturalWidth / dispW
    const scaleY = img.naturalHeight / dispH

    // Draw the cropped portion at full quality
    ctx.drawImage(
      img,
      cropBox.x * scaleX,        // Source X (where to start cropping from)
      cropBox.y * scaleY,        // Source Y
      cropBox.width * scaleX,    // Source Width (how much to crop)
      cropBox.height * scaleY,   // Source Height
      0,                         // Destination X (where to place on canvas)
      0,                         // Destination Y
      targetWidth,               // Destination Width (final size)
      targetHeight               // Destination Height
    )

    setUploading(true)
    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData()
          formData.append("file", blob)

          const url = await uploadImage(formData)
          onChange(url)
          setShowCropper(false)
          setPreview("")
          setFile(null)
          toast({
            title: "Success",
            description: "Image uploaded successfully",
          })
        }
      }, "image/jpeg", 0.95) // Added quality parameter
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploading ? "Uploading..." : "Choose Image"}
        </Button>
      </div>

      {value && (
        <div className="relative h-32 w-full overflow-hidden rounded-lg border">
          <img src={value || "/placeholder.svg"} alt="Uploaded" className="h-full w-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6"
            onClick={() => onChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Dialog open={showCropper} onOpenChange={setShowCropper}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div
              className="relative w-full bg-gray-100 dark:bg-gray-900"
              style={{
                height: "400px",
                overflow: "hidden",
              }}
            >
              <img
                ref={imgRef}
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="object-contain w-full h-full"
                onLoad={() => {
                  if (imgRef.current) {
                    initializeCropBox(imgRef.current)
                  }
                }}
              />
              {/* Crop box overlay */}
              <div
                style={{
                  position: "absolute",
                  left: cropBox.x,
                  top: cropBox.y,
                  width: cropBox.width,
                  height: cropBox.height,
                  border: "3px solid #3b82f6",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  boxSizing: "border-box",
                  cursor: "move",
                  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  const startX = e.clientX
                  const startY = e.clientY
                  const orig = { ...cropBoxRef.current }

                  draggingRef.current = { startX, startY, orig }

                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    if (!draggingRef.current || !imgRef.current) return
                    const { startX, startY, orig } = draggingRef.current
                    const dx = moveEvent.clientX - startX
                    const dy = moveEvent.clientY - startY

                    // Compute new x,y (clamped)
                    const imgW = imgRef.current.width
                    const imgH = imgRef.current.height

                    const newX = Math.max(0, Math.min(orig.x + dx, imgW - orig.width))
                    const newY = Math.max(0, Math.min(orig.y + dy, imgH - orig.height))

                    const updated = { ...orig, x: newX, y: newY }
                    setCropBox(updated)
                    cropBoxRef.current = updated
                  }

                  const handleMouseUp = () => {
                    draggingRef.current = null
                    document.removeEventListener("mousemove", handleMouseMove)
                    document.removeEventListener("mouseup", handleMouseUp)
                  }

                  document.addEventListener("mousemove", handleMouseMove)
                  document.addEventListener("mouseup", handleMouseUp)
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold pointer-events-none">
                  Drag to reposition
                </div>
                {/* Resize handle - bottom-right */}
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    const startX = e.clientX
                    const startY = e.clientY
                    const orig = { ...cropBoxRef.current }

                    const handleMove = (mv: MouseEvent) => {
                      if (!imgRef.current) return
                      // dx relative to image coordinate space
                      const dx = mv.clientX - startX
                      // Resize maintaining aspect ratio
                      const newWidth = Math.max(100, orig.width + dx)
                      const newHeight = Math.round(newWidth / aspectRatio)

                      // Clamp to image boundaries
                      const imgW = imgRef.current.width
                      const imgH = imgRef.current.height
                      const clampedW = Math.min(newWidth, imgW - orig.x)
                      const clampedH = Math.min(newHeight, imgH - orig.y)

                      const updated = { ...orig, width: clampedW, height: clampedH }
                      setCropBox(updated)
                      cropBoxRef.current = updated
                    }

                    const stop = () => {
                      document.removeEventListener("mousemove", handleMove)
                      document.removeEventListener("mouseup", stop)
                    }

                    document.addEventListener("mousemove", handleMove)
                    document.addEventListener("mouseup", stop)
                  }}
                  style={{
                    position: "absolute",
                    right: 4,
                    bottom: 4,
                    width: 12,
                    height: 12,
                    background: "#fff",
                    borderRadius: 2,
                    cursor: "nwse-resize",
                    zIndex: 10,
                  }}
                />
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setShowCropper(false)} disabled={uploading}>
                Cancel
              </Button>
              <Button type="button" onClick={handleCropConfirm} disabled={uploading}>
                {uploading ? "Uploading..." : "Crop & Upload"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
