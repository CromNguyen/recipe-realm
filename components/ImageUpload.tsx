'use client'

import { uploadImage } from '@/actions/upload/uploadImage'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import { Loader2Icon, UploadIcon, X } from 'lucide-react'

interface Props {
  value?: string
  className?: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, className, onChange }: Props) {
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true)
        const file = acceptedFiles[0]
        const formData = new FormData()
        formData.append('file', file)
        const result = await uploadImage(formData)
        onChange(result.url)
      } catch (error) {
        console.error('Upload failed:', error)
      } finally {
        setIsUploading(false)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  if (value) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image src={value} alt="Recipe image" fill className="object-cover" />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => onChange('')}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-2">
        <UploadIcon className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {isUploading ? (
            <Loader2Icon className="w-5 h-5 animate-spin" />
          ) : (
            'Drop an image here or click to upload'
          )}
        </p>
      </div>
    </div>
  )
}
