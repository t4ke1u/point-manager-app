import { RecordList } from '@/components/record/RecordList'

const RecordPage = () => {
  return (
    <main>
      <div className="md:mt-20 px-4 py-8">
        <h1 className="mb-5 ml-2 text-2xl font-bold">スコア記録</h1>
        <RecordList />
        <div className="h-24" />
      </div>
    </main>
  )
}

export default RecordPage
