import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { ReactComponent as IConForwardGray } from '@/assets/icon_forward_gray.svg';
import type { IVoteAllContent } from '@/types/voteType';
import Statistics from '@components/common/Statistics';

type TPostList = {
  lists: IVoteAllContent[];
  fetchFn: (page: number) => void;
  currentPage: number;
};
const PostList = ({ lists, fetchFn, currentPage }: TPostList) => {
  // 무한스크롤
  const [ref, inView] = useInView();

  // 무한스크롤
  useEffect(() => {
    if (inView) {
      fetchFn(currentPage + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  console.log(lists);

  return (
    <ol className="flex h-[calc(100%-48px)] flex-col">
      {lists && lists.length !== 0 ? (
        <>
          {lists?.map((list) => (
            <li key={list.id}>
              <Link
                to={`/vote/${list.id}`}
                className={`relative flex h-[108px] items-center justify-between px-4 py-4 ${
                  list.status === 'IN_PROGRESS' ? null : 'bg-bg text-GS3'
                }`}
              >
                <div className="grid w-[294px] gap-2">
                  {/* 상태뱃지 */}
                  <span className="scoremedium12 w-fit rounded-[37px] border-[1px] border-GS6 px-[9px] py-1 text-GS4">
                    {list.status === 'IN_PROGRESS' ? '해결중' : '해결완료'}
                  </span>
                  {/* 투표제목 */}
                  <p className="notosansbold16 overflow-hidden text-ellipsis whitespace-nowrap">
                    {list.title}
                  </p>
                  <Statistics
                    viewCount={list.viewCount}
                    commentCount={list.commentCount}
                    bookmarkCount={list.bookmarkCount}
                  />
                </div>
                <IConForwardGray />
              </Link>
            </li>
          ))}
          <div ref={ref}></div>
        </>
      ) : (
        <></>
      )}
    </ol>
  );
};

export default PostList;