import MultiStepForm from './_components/MultiStepForm'

export default function CreateRecipePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Create recipe</h1>
        <p className="text-muted-foreground">Start creating your recipe</p>
      </div>
      <div className="">
        <MultiStepForm action="create" />
      </div>
    </div>
  )
}
