import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as IConBackBlack } from '@/assets/icon_back_black.svg';
import { ReactComponent as IConBookmarkGray } from '@/assets/icon_bookmark_gray.svg';
import { ReactComponent as IConCloseBlack } from '@/assets/icon_close_black.svg';
import { ROUTER } from '@/constants/latyout';

const HeaderBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const findTitle = ROUTER.find((page) => pathname.includes(page.href));
  const isQuestionPage = findTitle?.href === 'question';
  const isVotePage = findTitle?.href === 'vote';

  const handleBackBtn = () => {
    if (
      isQuestionPage &&
      !window.confirm('글쓰기를 그만두시겠어요?\n작성중인 내용이 삭제됩니다.')
    ) {
      return;
    }
    if (isQuestionPage) {
      navigate('/home');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="relative flex h-full items-center justify-between px-4">
      <button onClick={handleBackBtn}>
        {isQuestionPage ? <IConCloseBlack /> : <IConBackBlack />}
      </button>
      <h1 className="scorebold18 absolute left-1/2 translate-x-[-50%]">
        {findTitle?.title}
      </h1>
      {isVotePage ? (
        <button>
          <IConBookmarkGray />
        </button>
      ) : null}
    </div>
  );
};

export default HeaderBack;
