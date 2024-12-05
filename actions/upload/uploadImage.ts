'use server'
import { put } from '@vercel/blob'
import { nanoid } from 'nanoid'

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File

  if (!file) {
    throw new Error('No file uploaded')
  }

  try {
    const blob = await put(`recipes/${nanoid()}-${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
    })

    return { url: blob.url }
  } catch (error) {
    console.error('Error uploading image: ', error)
    throw new Error('Failed to upload image')
  }
}
