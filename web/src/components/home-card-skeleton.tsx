import { Skeleton } from '@/components/ui/skeleton'

const HomeCardSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-44 rounded-[10px] border border-[#282828]" />
      <Skeleton className="mt-4 h-5 w-28 rounded-[4px]" />
    </div>
  )
}

export default HomeCardSkeleton
