'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import React from 'react'

export default function StepperIndicator({
  activeStep,
  steps,
}: {
  activeStep: number
  steps: string[]
}) {
  const totalSteps = steps.length
  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <div className="relative pb-2">
            <div
              className={cn(
                'h-10 w-10 rounded-full flex items-center justify-center border-[2px]',
                index < activeStep && 'bg-primary text-white',
                index === activeStep && 'border-primary text-primary'
              )}
            >
              {index >= activeStep ? index + 1 : <Check className="h-5 w-5" />}
            </div>
            <p className="text-xs text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
              {steps[index]}
            </p>
          </div>
          {index !== totalSteps - 1 && (
            <Separator
              orientation="horizontal"
              className={cn(
                'w-[100px] h-[2px]',
                index <= activeStep - 1 && 'bg-primary'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
