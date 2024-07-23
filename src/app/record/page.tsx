import { RecordList } from '@/components/record/RecordList'

const RecordPage = () => {
  return (
    <main>
      <div className="md:mt-20 sm:mb-16 md:mb-0 px-4 py-8">
        <h1 className="mb-5 ml-2 text-2xl font-bold">スコア記録</h1>
        <RecordList />
      </div>
    </main>
  )
}

export default RecordPage
